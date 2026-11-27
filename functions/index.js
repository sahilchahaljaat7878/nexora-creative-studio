/**
 * Haryana Creative — Firebase Cloud Function (API).
 *
 * Serves the studio API that the website and the admin panel use:
 *   POST   /records            public  – store an order or enquiry
 *   POST   /admin/login        public  – admin login
 *   POST   /admin/logout       admin   – end the session
 *   GET    /admin/session      admin   – current session
 *   GET    /admin/records      admin   – all stored records
 *   PATCH  /admin/records/:id  admin   – update status / payment / notes
 *   DELETE /admin/records/:id  admin   – remove a record
 *
 * Records live in Firestore, sessions in Firestore as well, so they survive
 * cold starts of the function.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { onRequest } from "firebase-functions/v2/https";
import express from "express";

initializeApp();
const db = getFirestore();

const here = path.dirname(fileURLToPath(import.meta.url));
const SESSION_COOKIE = "haryana_admin";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const KEY_LENGTH = 64;

/* ------------------------------ helpers ------------------------------ */

const clean = (value, max = 500) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};

function hashPassword(password, salt) {
  const derived = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return { salt, hash: derived };
}

function verifyPassword(password, salt, expectedHash) {
  const derived = crypto.scryptSync(password, salt, KEY_LENGTH);
  const expected = Buffer.from(expectedHash, "hex");
  if (expected.length !== derived.length) return false;
  return crypto.timingSafeEqual(derived, expected);
}

/**
 * Admin credentials. They are seeded into Firestore on first run from the
 * bundled data/auth.json so the very first login works; afterwards the
 * Firestore copy wins, which means the password can be changed without a
 * redeploy.
 */
async function readCredentials() {
  const ref = db.collection("config").doc("admin");
  const snapshot = await ref.get();
  if (snapshot.exists) return snapshot.data();
  try {
    const bundled = JSON.parse(fs.readFileSync(path.join(here, "data", "auth.json"), "utf8"));
    await ref.set({ ...bundled, updatedAt: new Date().toISOString() });
    return bundled;
  } catch {
    return null;
  }
}

/* ----------------------------- rate limit ---------------------------- */

const buckets = new Map();
function rateLimit(name, limit, windowMs) {
  return (req, res, next) => {
    const key = `${name}:${req.ip}`;
    const now = Date.now();
    const bucket = buckets.get(key) ?? { count: 0, reset: now + windowMs };
    if (now > bucket.reset) {
      bucket.count = 0;
      bucket.reset = now + windowMs;
    }
    bucket.count += 1;
    buckets.set(key, bucket);
    if (bucket.count > limit) {
      res.status(429).json({ ok: false, error: "Too many requests. Please try again shortly." });
      return;
    }
    next();
  };
}
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) if (now > bucket.reset) buckets.delete(key);
}, 60_000).unref();

/* ------------------------------ cookies ------------------------------ */

function readCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

async function createSession(username) {
  const token = crypto.randomBytes(32).toString("hex");
  await db.collection("sessions").doc(token).set({
    username,
    expiresAt: Date.now() + SESSION_TTL_MS,
  });
  return token;
}

async function getSession(token) {
  if (!token) return null;
  const snapshot = await db.collection("sessions").doc(token).get();
  if (!snapshot.exists) return null;
  const session = snapshot.data();
  if (!session?.expiresAt || session.expiresAt < Date.now()) {
    await db.collection("sessions").doc(token).delete();
    return null;
  }
  return session;
}

/* -------------------------------- app --------------------------------- */

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "64kb" }));

async function requireAdmin(req, res, next) {
  const session = await getSession(readCookie(req, SESSION_COOKIE));
  if (!session) {
    res.status(401).json({ ok: false, error: "Not signed in." });
    return;
  }
  req.admin = session;
  next();
}

app.post("/records", rateLimit("records", 30, 10 * 60 * 1000), async (req, res) => {
  const body = req.body ?? {};
  const type = body.type === "enquiry" ? "enquiry" : "order";

  const name = clean(body.name, 120);
  const whatsapp = clean(body.whatsapp, 40);
  const description = clean(body.description, 4000);

  if (!name || !whatsapp) {
    res.status(400).json({ ok: false, error: "Name and WhatsApp number are required." });
    return;
  }

  const record = {
    id: `${type === "order" ? "ord" : "enq"}_${crypto.randomBytes(5).toString("hex")}`,
    type,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name,
    whatsapp,
    email: clean(body.email, 160),
    country: clean(body.country, 80),
    service: clean(body.service, 120),
    package: clean(body.package, 120),
    price: toNumber(body.price),
    description,
    deliveryDate: clean(body.deliveryDate, 40),
    instructions: clean(body.instructions, 2000),
    hasReferenceImage: Boolean(body.hasReferenceImage),
    hasReferenceVideo: Boolean(body.hasReferenceVideo),
    locale: body.locale === "hi" ? "hi" : "en",
    status: "new",
    payment: "unpaid",
    amountPaid: 0,
    notes: "",
  };

  await db.collection("records").doc(record.id).set(record);
  res.status(201).json({ ok: true, id: record.id });
});

app.post("/admin/login", rateLimit("login", 10, 10 * 60 * 1000), async (req, res) => {
  const username = clean(req.body?.username, 80);
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  const credentials = await readCredentials();

  if (!credentials?.username || !credentials?.hash) {
    res.status(503).json({
      ok: false,
      error: "Admin access is not set up yet. Run: npm run admin:password",
    });
    return;
  }

  const userMatches = username === credentials.username;
  const passwordMatches = verifyPassword(password, credentials.salt, credentials.hash);

  if (!userMatches || !passwordMatches) {
    res.status(401).json({ ok: false, error: "Wrong username or password." });
    return;
  }

  const token = await createSession(credentials.username);
  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: SESSION_TTL_MS,
  });
  res.json({ ok: true, username: credentials.username });
});

app.post("/admin/logout", async (req, res) => {
  const token = readCookie(req, SESSION_COOKIE);
  if (token) await db.collection("sessions").doc(token).delete();
  res.clearCookie(SESSION_COOKIE, { path: "/" });
  res.json({ ok: true });
});

app.get("/admin/session", requireAdmin, (req, res) => {
  res.json({ ok: true, username: req.admin.username });
});

app.get("/admin/records", requireAdmin, async (_req, res) => {
  const snapshot = await db.collection("records").get();
  const records = snapshot.docs.map((doc) => doc.data());
  res.json({ ok: true, records });
});

app.patch("/admin/records/:id", requireAdmin, async (req, res) => {
  const body = req.body ?? {};
  const patch = {};

  if (typeof body.status === "string") {
    const allowed = ["new", "in_progress", "completed", "cancelled"];
    if (!allowed.includes(body.status)) {
      res.status(400).json({ ok: false, error: "Unknown status." });
      return;
    }
    patch.status = body.status;
  }

  if (typeof body.payment === "string") {
    const allowed = ["unpaid", "partial", "paid"];
    if (!allowed.includes(body.payment)) {
      res.status(400).json({ ok: false, error: "Unknown payment state." });
      return;
    }
    patch.payment = body.payment;
  }

  if (body.amountPaid !== undefined) patch.amountPaid = toNumber(body.amountPaid) ?? 0;
  if (body.notes !== undefined) patch.notes = clean(body.notes, 2000);
  patch.updatedAt = new Date().toISOString();

  const ref = db.collection("records").doc(req.params.id);
  const snapshot = await ref.get();
  if (!snapshot.exists) {
    res.status(404).json({ ok: false, error: "Record not found." });
    return;
  }
  await ref.set(patch, { merge: true });
  res.json({ ok: true, record: { ...snapshot.data(), ...patch } });
});

app.delete("/admin/records/:id", requireAdmin, async (req, res) => {
  const ref = db.collection("records").doc(req.params.id);
  const snapshot = await ref.get();
  if (!snapshot.exists) {
    res.status(404).json({ ok: false, error: "Record not found." });
    return;
  }
  await ref.delete();
  res.json({ ok: true });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "haryana-api" });
});

app.use((error, _req, res, _next) => {
  console.error("[api]", error);
  res.status(500).json({ ok: false, error: "Server error." });
});

export const api = onRequest(
  {
    region: "asia-south1",
    cors: true,
    maxInstances: 10,
    memory: "256MiB",
    timeoutSeconds: 30,
  },
  app
);
