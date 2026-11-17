/**
 * Small typed client for the studio API (orders + admin endpoints).
 * Every call resolves to a result object so the UI never throws on network errors.
 */

export type RecordStatus = "new" | "in_progress" | "completed" | "cancelled";
export type PaymentState = "unpaid" | "partial" | "paid";

export interface StudioRecord {
  id: string;
  type: "order" | "enquiry";
  createdAt: string;
  updatedAt?: string;
  name: string;
  whatsapp: string;
  email?: string;
  country?: string;
  service?: string;
  package?: string;
  price?: number | null;
  description?: string;
  deliveryDate?: string;
  instructions?: string;
  hasReferenceImage?: boolean;
  hasReferenceVideo?: boolean;
  locale?: "en" | "hi";
  status: RecordStatus;
  payment: PaymentState;
  amountPaid?: number;
  notes?: string;
}

export interface ApiResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

async function request<T>(url: string, options: RequestInit = {}): Promise<ApiResult<T>> {
  try {
    const response = await fetch(url, {
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload?.ok === false) {
      return { ok: false, error: payload?.error || `Request failed (${response.status}).` };
    }
    return { ok: true, data: payload as T };
  } catch {
    return { ok: false, error: "Network error. Please check your connection." };
  }
}

/* ------------------------------ public ------------------------------ */

export interface NewRecordPayload {
  type: "order" | "enquiry";
  name: string;
  whatsapp: string;
  email?: string;
  country?: string;
  service?: string;
  package?: string;
  price?: number | null;
  description?: string;
  deliveryDate?: string;
  instructions?: string;
  hasReferenceImage?: boolean;
  hasReferenceVideo?: boolean;
  locale?: "en" | "hi";
}

export function saveRecord(payload: NewRecordPayload): Promise<ApiResult<{ id: string }>> {
  return request<{ id: string }>("/api/records", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/* ------------------------------ admin ------------------------------- */

export function adminLogin(username: string, password: string): Promise<ApiResult<{ username: string }>> {
  return request<{ username: string }>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function adminLogout(): Promise<ApiResult<unknown>> {
  return request("/api/admin/logout", { method: "POST" });
}

export function adminSession(): Promise<ApiResult<{ username: string }>> {
  return request<{ username: string }>("/api/admin/session");
}

export function adminRecords(): Promise<ApiResult<{ records: StudioRecord[] }>> {
  return request<{ records: StudioRecord[] }>("/api/admin/records");
}

export function adminUpdateRecord(
  id: string,
  patch: Partial<Pick<StudioRecord, "status" | "payment" | "amountPaid" | "notes">>
): Promise<ApiResult<{ record: StudioRecord }>> {
  return request<{ record: StudioRecord }>(`/api/admin/records/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export function adminDeleteRecord(id: string): Promise<ApiResult<unknown>> {
  return request(`/api/admin/records/${id}`, { method: "DELETE" });
}
