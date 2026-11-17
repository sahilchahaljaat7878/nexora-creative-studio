/**
 * Studio records storage.
 *
 * Orders and enquiries are stored in a single JSON file so the studio can
 * track incoming work without any external database service.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(here, "data");
const RECORDS_FILE = path.join(DATA_DIR, "records.json");

let cache = null;
let writeQueue = Promise.resolve();

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(RECORDS_FILE);
  } catch {
    await fs.writeFile(RECORDS_FILE, "[]\n", "utf8");
  }
}

/** Read every record (newest last). */
export async function readRecords() {
  if (cache) return cache;
  await ensureStore();
  try {
    const raw = await fs.readFile(RECORDS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    cache = Array.isArray(parsed) ? parsed : [];
  } catch {
    cache = [];
  }
  return cache;
}

/** Persist the current cache atomically (write temp file, then rename). */
async function persist() {
  const temp = `${RECORDS_FILE}.${process.pid}.tmp`;
  await fs.writeFile(temp, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
  await fs.rename(temp, RECORDS_FILE);
}

/** Queue a write so concurrent requests never interleave. */
function queueWrite(task) {
  writeQueue = writeQueue.then(task, task);
  return writeQueue;
}

/** Append a new record. */
export async function addRecord(record) {
  await readRecords();
  cache.push(record);
  await queueWrite(persist);
  return record;
}

/** Update one record by id. Returns the updated record or null. */
export async function updateRecord(id, patch) {
  await readRecords();
  const index = cache.findIndex((item) => item.id === id);
  if (index === -1) return null;
  cache[index] = { ...cache[index], ...patch, updatedAt: new Date().toISOString() };
  await queueWrite(persist);
  return cache[index];
}

/** Delete one record by id. Returns true when something was removed. */
export async function deleteRecord(id) {
  await readRecords();
  const before = cache.length;
  cache = cache.filter((item) => item.id !== id);
  if (cache.length === before) return false;
  await queueWrite(persist);
  return true;
}
