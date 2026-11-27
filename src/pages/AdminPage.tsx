import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  IndianRupee,
  LayoutDashboard,
  Loader2,
  LogOut,
  RefreshCw,
  Search,
  Trash2,
  TriangleAlert,
} from "lucide-react";

import {
  adminDeleteRecord,
  adminLogin,
  adminLogout,
  adminRecords,
  adminSession,
  adminUpdateRecord,
  type PaymentState,
  type RecordStatus,
  type StudioRecord,
} from "@/lib/api";
import { formatINR } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { useSeo } from "@/hooks/useSeo";

const STATUS_LABELS: Record<RecordStatus, string> = {
  new: "New",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const PAYMENT_LABELS: Record<PaymentState, string> = {
  unpaid: "Payment pending",
  partial: "Part paid",
  paid: "Paid",
};

const STATUS_STYLES: Record<RecordStatus, string> = {
  new: "border-violet-300/30 bg-violet-500/10 text-violet-200",
  in_progress: "border-amber-300/30 bg-amber-400/10 text-amber-200",
  completed: "border-emerald-300/30 bg-emerald-500/10 text-emerald-200",
  cancelled: "border-white/15 bg-white/5 text-white/60",
};

const PAYMENT_STYLES: Record<PaymentState, string> = {
  unpaid: "border-rose-300/30 bg-rose-500/10 text-rose-200",
  partial: "border-amber-300/30 bg-amber-400/10 text-amber-200",
  paid: "border-emerald-300/30 bg-emerald-500/10 text-emerald-200",
};

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  useSeo({
    title: "Studio Admin — Haryana Creative",
    description: "Private studio dashboard for orders, enquiries and payments.",
    path: "/admin",
    noindex: true,
  });

  const [checking, setChecking] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [apiOffline, setApiOffline] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);

  const [records, setRecords] = useState<StudioRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [filter, setFilter] = useState<"all" | "order" | "enquiry">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | RecordStatus>("all");
  const [paymentFilter, setPaymentFilter] = useState<"all" | PaymentState>("all");
  const [search, setSearch] = useState("");

  /* ------------------------------ session ------------------------------ */

  useEffect(() => {
    let active = true;
    adminSession().then((result) => {
      if (!active) return;
      if (result.ok && result.data) {
        setSignedIn(true);
        setUsername(result.data.username);
      } else if (result.error && /\(404\)|Network error/i.test(result.error)) {
        setApiOffline(true);
      }
      setChecking(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const loadRecords = useCallback(async () => {
    setLoading(true);
    const result = await adminRecords();
    if (result.ok && result.data) {
      setRecords(result.data.records);
      setLoadError("");
    } else {
      setLoadError(result.error || "Could not load records.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!signedIn) return;
    loadRecords();
    const timer = window.setInterval(loadRecords, 30_000);
    return () => window.clearInterval(timer);
  }, [signedIn, loadRecords]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginBusy(true);
    setLoginError("");
    const result = await adminLogin(username.trim(), password);
    setLoginBusy(false);
    if (result.ok && result.data) {
      setSignedIn(true);
      setUsername(result.data.username);
      setPassword("");
    } else {
      const offline = Boolean(result.error && /\(404\)|Network error/i.test(result.error));
      if (offline) setApiOffline(true);
      setLoginError(
        offline
          ? "The studio API is not connected on this deployment yet."
          : result.error || "Sign in failed."
      );
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    setSignedIn(false);
    setRecords([]);
  };

  /* ------------------------------- stats ------------------------------- */

  const stats = useMemo(() => {
    const orders = records.filter((item) => item.type === "order");
    const enquiries = records.filter((item) => item.type === "enquiry");
    const paid = orders.reduce((sum, item) => sum + (item.amountPaid || 0), 0);
    const orderValue = orders
      .filter((item) => item.status !== "cancelled")
      .reduce((sum, item) => sum + (item.price || 0), 0);
    const pendingPayment = orders.filter(
      (item) => item.payment !== "paid" && item.status !== "cancelled"
    );
    const pendingAmount = pendingPayment.reduce(
      (sum, item) => sum + Math.max(0, (item.price || 0) - (item.amountPaid || 0)),
      0
    );
    return {
      total: orders.length,
      newCount: orders.filter((item) => item.status === "new").length,
      inProgress: orders.filter((item) => item.status === "in_progress").length,
      completed: orders.filter((item) => item.status === "completed").length,
      enquiries: enquiries.length,
      paid,
      orderValue,
      pendingCount: pendingPayment.length,
      pendingAmount,
    };
  }, [records]);

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return records
      .filter((item) => (filter === "all" ? true : item.type === filter))
      .filter((item) => (statusFilter === "all" ? true : item.status === statusFilter))
      .filter((item) => (paymentFilter === "all" ? true : item.payment === paymentFilter))
      .filter((item) =>
        term
          ? [item.name, item.whatsapp, item.email, item.service, item.package, item.description]
              .filter(Boolean)
              .some((field) => String(field).toLowerCase().includes(term))
          : true
      )
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [records, filter, statusFilter, paymentFilter, search]);

  /* ------------------------------ actions ------------------------------ */

  const updateRecord = async (
    id: string,
    patch: Partial<Pick<StudioRecord, "status" | "payment" | "amountPaid" | "notes">>
  ) => {
    const result = await adminUpdateRecord(id, patch);
    if (result.ok && result.data) {
      setRecords((current) =>
        current.map((item) => (item.id === id ? result.data!.record : item))
      );
    } else {
      setLoadError(result.error || "Update failed.");
    }
  };

  /** Debounced save so typing does not fire a request per keystroke. */
  const saveTimers = useRef<Record<string, number>>({});
  const scheduleUpdate = (
    id: string,
    patch: Partial<Pick<StudioRecord, "amountPaid" | "notes">>
  ) => {
    window.clearTimeout(saveTimers.current[id]);
    saveTimers.current[id] = window.setTimeout(() => {
      updateRecord(id, patch);
    }, 600);
  };

  useEffect(
    () => () => {
      for (const timer of Object.values(saveTimers.current)) window.clearTimeout(timer);
    },
    []
  );

  const removeRecord = async (id: string) => {
    if (!window.confirm("Delete this record permanently?")) return;
    const result = await adminDeleteRecord(id);
    if (result.ok) {
      setRecords((current) => current.filter((item) => item.id !== id));
    } else {
      setLoadError(result.error || "Delete failed.");
    }
  };

  /* -------------------------------- login ------------------------------- */

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <Loader2 className="h-7 w-7 animate-spin text-violet-300" aria-hidden="true" />
        <span className="sr-only">Checking session</span>
      </div>
    );
  }

  if (!signedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink px-5 py-16">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="mb-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to site
          </Link>

          <div className="rounded-[26px] border border-white/10 bg-ink-800/70 p-7 shadow-card">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <LayoutDashboard className="h-6 w-6 text-violet-300" aria-hidden="true" />
            </span>
            <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight text-white">
              Studio Admin
            </h1>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
              Sign in to see incoming orders, payment status and studio records.
            </p>

            {apiOffline && (
              <p
                role="status"
                className="mt-5 flex items-start gap-2 rounded-xl border border-amber-300/20 bg-amber-400/[0.06] px-3.5 py-3 text-[11.5px] leading-relaxed text-amber-100/80"
              >
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                The studio API is not connected on this deployment yet. Deploy the API
                (Firebase Cloud Function or the Node server) to sign in and see records.
              </p>
            )}

            <form onSubmit={handleLogin} className="mt-6 space-y-4" noValidate>
              <div>
                <label className="field-label" htmlFor="admin-username">
                  Username
                </label>
                <input
                  id="admin-username"
                  className="field-input"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
              <div>
                <label className="field-label" htmlFor="admin-password">
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  className="field-input"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              {loginError && (
                <p
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-rose-300/20 bg-rose-500/[0.07] px-3.5 py-3 text-[11.5px] leading-relaxed text-rose-200"
                >
                  <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                disabled={loginBusy}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-gradient text-[13px] font-bold text-white shadow-glow transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {loginBusy ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                )}
                Sign in
              </button>
            </form>
          </div>

          <p className="mt-4 text-center text-[11px] text-white/40">
            Studio owners only. Sessions expire after 8 hours.
          </p>
        </div>
      </div>
    );
  }

  /* ----------------------------- dashboard ----------------------------- */

  const cards = [
    { label: "Total orders", value: String(stats.total), icon: LayoutDashboard, tone: "text-violet-300" },
    { label: "New orders", value: String(stats.newCount), icon: Clock, tone: "text-amber-200" },
    { label: "In progress", value: String(stats.inProgress), icon: RefreshCw, tone: "text-sky-200" },
    { label: "Completed", value: String(stats.completed), icon: CheckCircle2, tone: "text-emerald-300" },
    { label: "Enquiries", value: String(stats.enquiries), icon: Search, tone: "text-white/70" },
    {
      label: "Payment received",
      value: formatINR(stats.paid),
      icon: IndianRupee,
      tone: "text-emerald-300",
    },
    {
      label: "Payment pending",
      value: `${stats.pendingCount} · ${formatINR(stats.pendingAmount)}`,
      icon: TriangleAlert,
      tone: "text-rose-200",
    },
  ];

  return (
    <div className="min-h-screen bg-ink px-4 pb-16 pt-6 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-violet-300/80">
              Haryana Creative
            </p>
            <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Studio Admin
            </h1>
            <p className="mt-1 text-[12px] text-muted">
              Signed in as <span className="text-white/80">{username}</span>
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-[12.5px] font-semibold text-white/80 transition-colors hover:bg-white/[0.08]"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Site
            </Link>
            <button
              type="button"
              onClick={loadRecords}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:bg-white/[0.08]"
              aria-label="Refresh records"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-[12.5px] font-semibold text-white/80 transition-colors hover:bg-white/[0.08]"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              Log out
            </button>
          </div>
        </header>

        <section className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-[22px] border border-white/10 bg-ink-800/70 p-5 shadow-card"
            >
              <card.icon className={cn("h-4 w-4", card.tone)} aria-hidden="true" />
              <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
                {card.label}
              </p>
              <p className="mt-1 font-display text-xl font-semibold text-white">{card.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-7 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: "all", label: "All" },
                { id: "order", label: "Orders" },
                { id: "enquiry", label: "Enquiries" },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors",
                  filter === item.id
                    ? "border-brand-violet/60 bg-brand-violet/15 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/60 hover:text-white"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as "all" | RecordStatus)}
            aria-label="Filter by status"
            className="field-input w-auto min-w-[150px] py-2 text-[12px]"
          >
            <option value="all">All statuses</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={paymentFilter}
            onChange={(event) => setPaymentFilter(event.target.value as "all" | PaymentState)}
            aria-label="Filter by payment"
            className="field-input w-auto min-w-[170px] py-2 text-[12px]"
          >
            <option value="all">All payments</option>
            {Object.entries(PAYMENT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <div className="relative min-w-[200px] flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
              aria-hidden="true"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, service, phone…"
              aria-label="Search records"
              className="field-input py-2 pl-10 text-[12px]"
            />
          </div>
        </section>

        {loadError && (
          <p
            role="alert"
            className="mt-5 rounded-xl border border-rose-300/20 bg-rose-500/[0.07] px-4 py-3 text-[12px] text-rose-200"
          >
            {loadError}
          </p>
        )}

        <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-white/45">
          {visible.length} record{visible.length === 1 ? "" : "s"}
        </p>

        <div className="mt-3 space-y-3">
          {visible.length === 0 && (
            <div className="rounded-[22px] border border-dashed border-white/12 bg-white/[0.02] px-6 py-12 text-center">
              <p className="text-[13px] font-semibold text-white/75">No records yet</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
                Orders and enquiries submitted from the website will appear here instantly.
              </p>
            </div>
          )}

          {visible.map((record) => (
            <article
              key={record.id}
              className="rounded-[22px] border border-white/10 bg-ink-800/70 p-5 shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-[200px]">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-lg font-semibold text-white">{record.name}</h2>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em]",
                        STATUS_STYLES[record.status]
                      )}
                    >
                      {STATUS_LABELS[record.status]}
                    </span>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em]",
                        PAYMENT_STYLES[record.payment]
                      )}
                    >
                      {PAYMENT_LABELS[record.payment]}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/55">
                      {record.type === "order" ? "Order" : "Enquiry"}
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-[10.5px] text-white/50">
                    {record.whatsapp}
                    {record.email ? ` · ${record.email}` : ""}
                    {record.country ? ` · ${record.country}` : ""}
                  </p>
                  <p className="mt-1 font-mono text-[10.5px] text-white/40">
                    {formatDate(record.createdAt)} · {record.id}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
                    Package price
                  </p>
                  <p className="font-display text-xl font-semibold text-white">
                    {record.price ? formatINR(record.price) : "—"}
                  </p>
                  {record.price ? (
                    <p className="mt-1 font-mono text-[10px] text-white/45">
                      Paid: {formatINR(record.amountPaid || 0)}
                    </p>
                  ) : null}
                </div>
              </div>

              {record.service || record.package ? (
                <p className="mt-4 text-[12.5px] text-white/80">
                  {record.service}
                  {record.package ? ` — ${record.package}` : ""}
                </p>
              ) : null}

              {record.description ? (
                <p className="mt-2 max-h-24 overflow-y-auto whitespace-pre-wrap text-[12px] leading-relaxed text-muted">
                  {record.description}
                </p>
              ) : null}

              <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-white/50">
                {record.deliveryDate ? <span>Delivery: {record.deliveryDate}</span> : null}
                {record.hasReferenceImage ? <span>Reference image shared</span> : null}
                {record.hasReferenceVideo ? <span>Reference video shared</span> : null}
                {record.instructions ? (
                  <span className="min-w-[200px] flex-1">Note: {record.instructions}</span>
                ) : null}
              </div>

              <div className="mt-4 grid gap-3 border-t border-white/[0.08] pt-4 sm:grid-cols-[auto_auto_auto_1fr_auto] sm:items-end">
                <label className="block">
                  <span className="field-label">Status</span>
                  <select
                    value={record.status}
                    onChange={(event) =>
                      updateRecord(record.id, { status: event.target.value as RecordStatus })
                    }
                    className="field-input w-auto min-w-[150px] py-2 text-[12px]"
                  >
                    {Object.entries(STATUS_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="field-label">Payment</span>
                  <select
                    value={record.payment}
                    onChange={(event) =>
                      updateRecord(record.id, { payment: event.target.value as PaymentState })
                    }
                    className="field-input w-auto min-w-[150px] py-2 text-[12px]"
                  >
                    {Object.entries(PAYMENT_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="field-label">Amount paid (₹)</span>
                  <input
                    type="number"
                    min={0}
                    defaultValue={record.amountPaid ?? 0}
                    onChange={(event) =>
                      scheduleUpdate(record.id, { amountPaid: Number(event.target.value) || 0 })
                    }
                    onBlur={(event) =>
                      updateRecord(record.id, { amountPaid: Number(event.target.value) || 0 })
                    }
                    className="field-input w-auto min-w-[120px] py-2 text-[12px]"
                  />
                </label>

                <label className="block">
                  <span className="field-label">Internal note</span>
                  <input
                    defaultValue={record.notes ?? ""}
                    onChange={(event) => scheduleUpdate(record.id, { notes: event.target.value })}
                    onBlur={(event) => updateRecord(record.id, { notes: event.target.value })}
                    placeholder="e.g. Quoted ₹799, client confirmed"
                    className="field-input py-2 text-[12px]"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => removeRecord(record.id)}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-rose-300/20 bg-rose-500/[0.07] px-4 text-[12px] font-semibold text-rose-200 transition-colors hover:bg-rose-500/15"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
