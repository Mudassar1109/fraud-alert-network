"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { validateReportForm, checkForDuplicates, type ValidationErrors } from "../lib/validation";
import { sanitizeInput, checkRateLimit, recordSubmission, getRateLimitResetTime } from "../lib/security";
import { showToast, ToastContainer } from "../components/Toast";
import { ReportCardSkeletonGrid, StatCardSkeleton } from "../components/LoadingSkeleton";
import Link from "next/link";

type ScamReport = {
  id: number;
  reporter_name: string | null;
  phone_number: string | null;
  email: string | null;
  website: string | null;
  scam_type: string | null;
  description: string | null;
  created_at: string;
};

const categories = [
  "All",
  "WhatsApp Scam",
  "Investment Fraud",
  "Fake Website",
  "Phishing",
  "Crypto Scam",
  "Job Scam",
  "Banking Fraud",
  "Other",
] as const;

const initialFormState = {
  reporterName: "",
  phoneNumber: "",
  email: "",
  website: "",
  scamType: "",
  description: "",
  consent: false,
};

export default function HomePage() {
  const [form, setForm] = useState(initialFormState);
  const [reports, setReports] = useState<ScamReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("All");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [rateLimitResetTime, setRateLimitResetTime] = useState(0);

  const stats = useMemo(() => {
    const uniqueNumbers = new Set(
      reports
        .map((report) => (report.phone_number || "").trim())
        .filter(Boolean)
    );
    const protectedUsers = new Set(
      reports
        .map((report) => (report.email || "").trim().toLowerCase())
        .filter(Boolean)
    );

    return {
      totalReports: reports.length,
      totalScamNumbers: uniqueNumbers.size,
      protectedUsers: protectedUsers.size,
    };
  }, [reports]);

  const filteredReports = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    return reports
      .filter((report) => {
        if (activeCategory !== "All") {
          return (
            (report.scam_type || "").toLowerCase() ===
            activeCategory.toLowerCase()
          );
        }
        return true;
      })
      .filter((report) => {
        if (!query) return true;
        return (
          (report.scam_type || "").toLowerCase().includes(query) ||
          (report.phone_number || "").toLowerCase().includes(query) ||
          (report.website || "").toLowerCase().includes(query) ||
          (report.description || "").toLowerCase().includes(query)
        );
      });
  }, [reports, searchText, activeCategory]);

  const isFormValid = useMemo(() => {
    return (
      (form.reporterName || "").trim().length > 0 &&
      (form.phoneNumber || "").trim().length > 0 &&
      (form.email || "").trim().length > 0 &&
      (form.website || "").trim().length > 0 &&
      (form.scamType || "").trim().length > 0 &&
      (form.description || "").trim().length > 10 &&
      form.consent
    );
  }, [form]);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    setLoadingReports(true);
    try {
      const { data, error } = await supabase
        .from("scam_reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        showToast("Unable to load reports. Please try again later.", "error");
      } else {
        setReports(data || []);
      }
    } catch (err) {
      showToast("An error occurred while fetching reports.", "error");
    }
    setLoadingReports(false);
  }

  function updateField(field: keyof typeof initialFormState, value: any) {
    const newValue = field === "consent" ? value : sanitizeInput(value);
    
    setForm((current) => ({
      ...current,
      [field]: newValue,
    }));

    if (errors[field as keyof ValidationErrors]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field as keyof ValidationErrors];
        return next;
      });
    }
  }

  async function handleSubmit() {
    // Check rate limit
    if (!checkRateLimit()) {
      const resetTime = getRateLimitResetTime();
      showToast(
        `Too many submissions. Please try again in ${resetTime} seconds.`,
        "warning"
      );
      setRateLimitResetTime(resetTime);
      return;
    }

    // Validate form
    const validationErrors = validateReportForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast("Please fix the highlighted form errors.", "error");
      return;
    }

    // Check for duplicates
    if (checkForDuplicates({
      phoneNumber: form.phoneNumber,
      website: form.website,
    }, reports)) {
      showToast(
        "A similar report already exists. Please check before resubmitting.",
        "warning"
      );
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("scam_reports")
        .insert([
          {
            reporter_name: (form.reporterName || "").trim(),
            phone_number: (form.phoneNumber || "").trim(),
            email: (form.email || "").trim(),
            website: (form.website || "").trim(),
            scam_type: (form.scamType || "").trim(),
            description: (form.description || "").trim(),
          },
        ]);

      if (error) {
        showToast("Failed to submit report. Please try again.", "error");
      } else {
        showToast("Report submitted successfully! Thank you for helping protect others.", "success");
        setForm(initialFormState);
        recordSubmission();
        await fetchReports();
      }
    } catch (err) {
      showToast("An error occurred while submitting your report.", "error");
    }
    setSubmitting(false);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <ToastContainer />

      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.18),_transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(239,68,68,0.16),_transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-red-500/10 backdrop-blur-2xl">
            <div className="space-y-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-red-300">
                🛡️ Live fraud reporting network
              </span>
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Fraud Alert Network
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                Report scam phone numbers, fake websites, phishing emails,
                investment frauds and online criminals with a secure
                community-powered platform.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <button
                  onClick={() =>
                    document
                      .getElementById("report-form")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 via-red-500 to-rose-500 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-red-500/30 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-red-500/50"
                >
                  Report a Scam
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("latest-reports")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-base font-semibold text-white transition hover:border-red-400/50 hover:text-red-300"
                >
                  View Latest Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {loadingReports ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <div className="group rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-red-500/10 transition duration-300 hover:-translate-y-1 hover:border-red-500/40">
                <p className="text-sm uppercase tracking-[0.35em] text-red-300">
                  📊 Total Scam Reports
                </p>
                <p className="mt-6 text-5xl font-semibold text-white">
                  {stats.totalReports.toLocaleString()}
                </p>
                <p className="mt-4 text-slate-400">
                  Real-time report volume pulled directly from Supabase.
                </p>
              </div>

              <div className="group rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-red-500/10 transition duration-300 hover:-translate-y-1 hover:border-red-500/40">
                <p className="text-sm uppercase tracking-[0.35em] text-red-300">
                  📞 Total Scam Numbers
                </p>
                <p className="mt-6 text-5xl font-semibold text-white">
                  {stats.totalScamNumbers.toLocaleString()}
                </p>
                <p className="mt-4 text-slate-400">
                  Unique scam phone numbers flagged by the community.
                </p>
              </div>

              <div className="group rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-red-500/10 transition duration-300 hover:-translate-y-1 hover:border-red-500/40">
                <p className="text-sm uppercase tracking-[0.35em] text-red-300">
                  🛡️ Protected Users
                </p>
                <p className="mt-6 text-5xl font-semibold text-white">
                  {stats.protectedUsers.toLocaleString()}
                </p>
                <p className="mt-4 text-slate-400">
                  Number of unique users protected by shared scam intelligence.
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      <section
        id="report-form"
        className="mx-auto max-w-6xl px-6 pb-20"
      >
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-red-500/10 backdrop-blur-2xl">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-red-300">
              ✍️ Secure report submission
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-white">
              Report a Scam
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Submit details safely, and every report is stored in Supabase
              for community transparency and fast incident response.
            </p>
          </div>

          <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-black/40 p-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="grid gap-2 text-sm text-slate-300">
                Reporter Name *
                <input
                  value={form.reporterName}
                  onChange={(event) =>
                    updateField("reporterName", event.target.value)
                  }
                  placeholder="Your full name"
                  maxLength={100}
                  className={`w-full rounded-3xl border px-5 py-4 text-white outline-none transition ${
                    errors.reporterName
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/10 bg-slate-950/70"
                  }`}
                />
                {errors.reporterName && (
                  <span className="text-sm text-red-400">
                    {errors.reporterName}
                  </span>
                )}
                <span className="text-xs text-slate-500">
                  {form.reporterName.length}/100 characters
                </span>
              </label>

              <label className="grid gap-2 text-sm text-slate-300">
                Phone Number *
                <input
                  value={form.phoneNumber}
                  onChange={(event) =>
                    updateField("phoneNumber", event.target.value)
                  }
                  placeholder="+1 555 123 4567"
                  maxLength={20}
                  className={`w-full rounded-3xl border px-5 py-4 text-white outline-none transition ${
                    errors.phoneNumber
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/10 bg-slate-950/70"
                  }`}
                />
                {errors.phoneNumber && (
                  <span className="text-sm text-red-400">
                    {errors.phoneNumber}
                  </span>
                )}
              </label>

              <label className="grid gap-2 text-sm text-slate-300">
                Email Address *
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  placeholder="reporter@example.com"
                  maxLength={100}
                  className={`w-full rounded-3xl border px-5 py-4 text-white outline-none transition ${
                    errors.email
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/10 bg-slate-950/70"
                  }`}
                />
                {errors.email && (
                  <span className="text-sm text-red-400">
                    {errors.email}
                  </span>
                )}
              </label>

              <label className="grid gap-2 text-sm text-slate-300">
                Website URL *
                <input
                  value={form.website}
                  onChange={(event) =>
                    updateField("website", event.target.value)
                  }
                  placeholder="https://example.com"
                  maxLength={500}
                  className={`w-full rounded-3xl border px-5 py-4 text-white outline-none transition ${
                    errors.website
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/10 bg-slate-950/70"
                  }`}
                />
                {errors.website && (
                  <span className="text-sm text-red-400">
                    {errors.website}
                  </span>
                )}
              </label>

              <label className="grid gap-2 text-sm text-slate-300">
                Scam Type *
                <select
                  value={form.scamType}
                  onChange={(event) =>
                    updateField("scamType", event.target.value)
                  }
                  className={`w-full rounded-3xl border px-5 py-4 text-white outline-none transition ${
                    errors.scamType
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/10 bg-slate-950/70"
                  }`}
                >
                  <option value="">Choose a category</option>
                  {categories
                    .filter((category) => category !== "All")
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
                {errors.scamType && (
                  <span className="text-sm text-red-400">
                    {errors.scamType}
                  </span>
                )}
              </label>
            </div>

            <label className="grid gap-2 text-sm text-slate-300">
              Description *
              <textarea
                rows={6}
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Describe the scam, what happened and any suspicious details."
                maxLength={2000}
                className={`w-full rounded-[1.75rem] border px-5 py-4 text-white outline-none transition resize-none ${
                  errors.description
                    ? "border-red-500 bg-red-500/10"
                    : "border-white/10 bg-slate-950/70"
                }`}
              />
              {errors.description && (
                <span className="text-sm text-red-400">
                  {errors.description}
                </span>
              )}
              <span className="text-xs text-slate-500">
                {form.description.length}/2000 characters (minimum 10)
              </span>
            </label>

            <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) =>
                    updateField("consent", event.target.checked)
                  }
                  className="mt-1 rounded border-white/20 bg-slate-950 text-red-500"
                />
                <span className="text-sm text-blue-100">
                  I have read and agree to the{" "}
                  <Link href="/privacy" className="text-red-300 hover:text-red-100 underline">
                    Privacy Policy
                  </Link>
                  ,{" "}
                  <Link href="/terms" className="text-red-300 hover:text-red-100 underline">
                    Terms of Service
                  </Link>
                  , and{" "}
                  <Link href="/disclaimer" className="text-red-300 hover:text-red-100 underline">
                    Disclaimer
                  </Link>
                  . I understand my report will be public and that I am responsible for its accuracy.
                </span>
              </label>
              {errors.consent && (
                <p className="mt-2 text-sm text-red-400">{errors.consent}</p>
              )}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-400">
                All fields marked with * are required.
              </div>

              <button
                type="button"
                disabled={!isFormValid || submitting}
                onClick={handleSubmit}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 via-red-500 to-rose-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-500/30 transition duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-3">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Submitting...
                  </span>
                ) : (
                  "Submit Report"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="latest-reports"
        className="mx-auto max-w-7xl px-6 pb-16"
      >
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-red-300">
              📋 Latest Scam Reports
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-white">
              Community fraud intelligence
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    activeCategory === category
                      ? "border-red-500 bg-red-500/15 text-red-200"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-red-400/60 hover:bg-red-500/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative">
              <input
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search by phone, email, website, type..."
                className="w-full rounded-full border border-white/10 bg-slate-950/80 px-5 py-3 pr-12 text-sm text-white outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-400/20 sm:w-[28rem]"
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 grid place-items-center text-red-300">
                🔍
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {loadingReports ? (
            <ReportCardSkeletonGrid />
          ) : filteredReports.length === 0 ? (
            <div className="col-span-full rounded-[2rem] border border-dashed border-white/10 bg-slate-900/70 p-12 text-center">
              <p className="text-xl font-semibold text-white">
                No matching reports found.
              </p>
              <p className="mt-4 text-slate-400">
                Try a different search term or select another scam category.
              </p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <article
                key={report.id}
                className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-xl shadow-red-500/10 transition duration-300 hover:-translate-y-1 hover:border-red-500/40"
              >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-red-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-red-300">
                    {report.scam_type || "Unknown"}
                  </span>
                  <span className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-xs tracking-[0.2em] text-slate-400">
                    {new Date(report.created_at).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <p className="text-lg leading-8 text-slate-300 mb-6">
                  {report.description || "No description provided"}
                </p>

                <div className="space-y-3 border-t border-white/10 pt-6">
                  {report.phone_number && (
                    <div className="flex items-start gap-3 text-sm">
                      <span className="text-red-300">📞</span>
                      <div>
                        <p className="text-xs text-slate-500">Phone Number</p>
                        <p className="text-slate-300 font-mono">{report.phone_number}</p>
                      </div>
                    </div>
                  )}
                  
                  {report.email && (
                    <div className="flex items-start gap-3 text-sm">
                      <span className="text-red-300">✉️</span>
                      <div>
                        <p className="text-xs text-slate-500">Email Address</p>
                        <p className="text-slate-300 break-all">{report.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {report.website && (
                    <div className="flex items-start gap-3 text-sm">
                      <span className="text-red-300">🌐</span>
                      <div>
                        <p className="text-xs text-slate-500">Website</p>
                        <a
                          href={report.website}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-red-300 hover:text-red-100 break-all"
                        >
                          {report.website}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {report.reporter_name && (
                    <div className="flex items-start gap-3 text-sm">
                      <span className="text-red-300">👤</span>
                      <div>
                        <p className="text-xs text-slate-500">Reporter</p>
                        <p className="text-slate-300">{report.reporter_name}</p>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
            <h3 className="text-xl font-semibold text-white mb-4">🔒 Security</h3>
            <p className="text-slate-400">
              All submissions are validated and protected with industry-standard security measures.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
            <h3 className="text-xl font-semibold text-white mb-4">🛡️ Privacy</h3>
            <p className="text-slate-400">
              Your data is encrypted and stored securely. See our privacy policy for more details.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
            <h3 className="text-xl font-semibold text-white mb-4">✅ Trust</h3>
            <p className="text-slate-400">
              Community-driven and transparent. Read our FAQ and community guidelines.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 border-t border-white/10 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Learn More</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/faq" className="inline-flex items-center gap-2 text-red-300 hover:text-red-100">
              ❓ FAQ
            </Link>
            <Link href="/community-guidelines" className="inline-flex items-center gap-2 text-red-300 hover:text-red-100">
              📋 Community Guidelines
            </Link>
            <Link href="/privacy" className="inline-flex items-center gap-2 text-red-300 hover:text-red-100">
              🔒 Privacy Policy
            </Link>
            <Link href="/terms" className="inline-flex items-center gap-2 text-red-300 hover:text-red-100">
              ⚖️ Terms of Service
            </Link>
            <Link href="/disclaimer" className="inline-flex items-center gap-2 text-red-300 hover:text-red-100">
              ⚠️ Disclaimer
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950/90 px-6 py-10 text-center text-slate-500">
        © 2026 Fraud Alert Network • Community Powered Scam Protection
      </footer>
    </main>
  );
}