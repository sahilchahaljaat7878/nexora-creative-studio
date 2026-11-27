/**
 * Haryana Creative — application server.
 *
 * Serves the built website (dist/) and a small JSON API:
 *   POST   /api/records            public  – store an order or enquiry
 *   POST   /api/admin/login        public  – admin login
 *   POST   /api/admin/logout       admin   – end the session
 *   GET    /api/admin/session      admin   – current session
 *   GET    /api/admin/records      admin   – all stored records
 *   PATCH  /api/admin/records/:id  admin   – update status / payment / notes
 *   DELETE /api/admin/records/:id  admin   – remove a record
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

import {
  createSession,
  destroySession,
  getSession,
  pruneSessions,
  readCredentials,
  SESSION_COOKIE,
  verifyPassword,
} from "./auth.mjs";
import { addRecord, deleteRecord, readRecords, updateRecord } from "./store.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(here, "..");
const distDir = path.join(projectRoot, "dist");

const PORT = Number(process.env.PORT) || 8787;
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(express.json({ limit: "64kb" }));

/* ----------------------------- helpers ----------------------------- */

const clean = (value, max = 500) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};

/** Simple in-memory rate limiter (per IP, per bucket). */
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

function readCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

/** Guard for every /api/admin route. */
function requireAdmin(req, res, next) {
  const session = getSession(readCookie(req, SESSION_COOKIE));
  if (!session) {
    res.status(401).json({ ok: false, error: "Not signed in." });
    return;
  }
  req.admin = session;
  next();
}

/* --------------------------- public API ---------------------------- */

app.post("/api/records", rateLimit("records", 30, 10 * 60 * 1000), async (req, res) => {
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

  await addRecord(record);
  res.status(201).json({ ok: true, id: record.id });
});

/* ---------------------------- admin API ---------------------------- */

app.post("/api/admin/login", rateLimit("login", 10, 10 * 60 * 1000), async (req, res) => {
  const username = clean(req.body?.username, 80);
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  const credentials = await readCredentials();

  if (!credentials || !credentials.username || !credentials.hash) {
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

  const token = createSession(credentials.username);
  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: IS_PRODUCTION,
    path: "/",
    maxAge: 8 * 60 * 60 * 1000,
  });
  res.json({ ok: true, username: credentials.username });
});

app.post("/api/admin/logout", (req, res) => {
  destroySession(readCookie(req, SESSION_COOKIE));
  res.clearCookie(SESSION_COOKIE, { path: "/" });
  res.json({ ok: true });
});

app.get("/api/admin/session", requireAdmin, (req, res) => {
  res.json({ ok: true, username: req.admin.username });
});

app.get("/api/admin/records", requireAdmin, async (_req, res) => {
  const records = await readRecords();
  res.json({ ok: true, records });
});

app.patch("/api/admin/records/:id", requireAdmin, async (req, res) => {
  const patch = {};
  const body = req.body ?? {};

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

  const updated = await updateRecord(req.params.id, patch);
  if (!updated) {
    res.status(404).json({ ok: false, error: "Record not found." });
    return;
  }
  res.json({ ok: true, record: updated });
});

app.delete("/api/admin/records/:id", requireAdmin, async (req, res) => {
  const removed = await deleteRecord(req.params.id);
  if (!removed) {
    res.status(404).json({ ok: false, error: "Record not found." });
    return;
  }
  res.json({ ok: true });
});

/* ------------------------- static site build ----------------------- */

if (fs.existsSync(distDir)) {
  app.use(
    express.static(distDir, {
      index: false,
      setHeaders(res, filePath) {
        if (/\.(css|js|png|jpg|jpeg|svg|webp|woff2?)$/.test(filePath)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    })
  );
  // SPA fallback (React Router handles /admin and every other route).
  app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(distDir, "index.html"));
  });
} else {
  app.get("/", (_req, res) => {
    res.status(200).send("Build not found. Run `npm run build`, or use the Vite dev server.");
  });
}

app.use((error, _req, res, _next) => {
  console.error("[api]", error);
  res.status(500).json({ ok: false, error: "Server error." });
});

pruneSessions();
setInterval(pruneSessions, 30 * 60 * 1000).unref();

app.listen(PORT, () => {
  console.log(`Haryana server running on http://localhost:${PORT}`);
});
