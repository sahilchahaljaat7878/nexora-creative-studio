/**
 * Admin authentication.
 *
 * The password is never stored in plain text: it is kept as a scrypt hash with
 * a per-user salt in server/data/auth.json. Sessions are random tokens held in
 * memory and sent through an httpOnly cookie.
 */
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const AUTH_FILE = path.join(here, "data", "auth.json");

export const SESSION_COOKIE = "haryana_admin";
export const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

const KEY_LENGTH = 64;
const SALT_BYTES = 16;

/** sessions: token -> { username, expiresAt } */
const sessions = new Map();

/** Create a scrypt hash for a password. */
export function hashPassword(password, salt = crypto.randomBytes(SALT_BYTES).toString("hex")) {
  const derived = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return { salt, hash: derived };
}

/** Constant-time password check. */
export function verifyPassword(password, salt, expectedHash) {
  const derived = crypto.scryptSync(password, salt, KEY_LENGTH);
  const expected = Buffer.from(expectedHash, "hex");
  if (expected.length !== derived.length) return false;
  return crypto.timingSafeEqual(derived, expected);
}

/** Read the stored admin credentials. */
export async function readCredentials() {
  try {
    const raw = await fs.readFile(AUTH_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Write new admin credentials (used by `npm run admin:password`). */
export async function writeCredentials(username, password) {
  await fs.mkdir(path.dirname(AUTH_FILE), { recursive: true });
  const { salt, hash } = hashPassword(password);
  const payload = { username, salt, hash, updatedAt: new Date().toISOString() };
  await fs.writeFile(AUTH_FILE, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return payload;
}

/** Start a session and return its token. */
export function createSession(username) {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, { username, expiresAt: Date.now() + SESSION_TTL_MS });
  return token;
}

/** Return the session for a token, if it is still valid. */
export function getSession(token) {
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    sessions.delete(token);
    return null;
  }
  session.expiresAt = Date.now() + SESSION_TTL_MS;
  return session;
}

/** End a session. */
export function destroySession(token) {
  if (token) sessions.delete(token);
}

/** Remove expired sessions (called on an interval). */
export function pruneSessions() {
  const now = Date.now();
  for (const [token, session] of sessions) {
    if (session.expiresAt < now) sessions.delete(token);
  }
}
