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
    <main className="min-h-screen overflow-x-hidden bg-white text-gray-900">
      <ToastContainer />

      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,99,235,0.02)_1px,transparent_1px),linear-gradient(rgba(37,99,235,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 sm:p-12 shadow-lg">
            <div className="space-y-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
                🛡️ Live Fraud Reporting Network
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Fraud Alert Network
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-600">
                Report scam phone numbers, fake websites, phishing emails, investment frauds and online criminals with a secure community-powered platform.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("report-form")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Report a Scam
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("latest-reports")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-900 transition-all duration-200 hover:border-blue-600 hover:text-blue-600"
                >
                  View Latest Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {loadingReports ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <div className="group rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                    Total Scam Reports
                  </p>
                  <span className="text-3xl">📊</span>
                </div>
                <p className="text-4xl sm:text-5xl font-bold text-blue-600">
                  {stats.totalReports.toLocaleString()}
                </p>
                <p className="mt-3 text-sm text-gray-600">
                  Real-time reports from our community.
                </p>
              </div>

              <div className="group rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                    Scam Phone Numbers
                  </p>
                  <span className="text-3xl">📞</span>
                </div>
                <p className="text-4xl sm:text-5xl font-bold text-indigo-600">
                  {stats.totalScamNumbers.toLocaleString()}
                </p>
                <p className="mt-3 text-sm text-gray-600">
                  Unique scam numbers flagged.
                </p>
              </div>

              <div className="group rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                    Protected Users
                  </p>
                  <span className="text-3xl">🛡️</span>
                </div>
                <p className="text-4xl sm:text-5xl font-bold text-emerald-600">
                  {stats.protectedUsers.toLocaleString()}
                </p>
                <p className="mt-3 text-sm text-gray-600">
                  Users protected by our intelligence.
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      <section
        id="report-form"
        className="mx-auto max-w-6xl px-6 py-12 sm:py-16"
      >
        <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-12 shadow-lg">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              ✍️ Secure Report Submission
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">
              Report a Scam
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Submit details about suspicious activity securely. Every report is stored and used to protect our community.
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-gray-900">
                  Reporter Name <span className="text-red-600">*</span>
                </span>
                <input
                  value={form.reporterName}
                  onChange={(event) =>
                    updateField("reporterName", event.target.value)
                  }
                  placeholder="Your full name"
                  maxLength={100}
                  className={`mt-2 w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition ${
                    errors.reporterName
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                  }`}
                />
                {errors.reporterName && (
                  <span className="mt-1 block text-sm text-red-600">
                    {errors.reporterName}
                  </span>
                )}
                <span className="mt-1 block text-xs text-gray-500">
                  {form.reporterName.length}/100 characters
                </span>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-gray-900">
                  Phone Number <span className="text-red-600">*</span>
                </span>
                <input
                  value={form.phoneNumber}
                  onChange={(event) =>
                    updateField("phoneNumber", event.target.value)
                  }
                  placeholder="+1 555 123 4567"
                  maxLength={20}
                  className={`mt-2 w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition ${
                    errors.phoneNumber
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                  }`}
                />
                {errors.phoneNumber && (
                  <span className="mt-1 block text-sm text-red-600">
                    {errors.phoneNumber}
                  </span>
                )}
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-gray-900">
                  Email Address <span className="text-red-600">*</span>
                </span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  placeholder="reporter@example.com"
                  maxLength={100}
                  className={`mt-2 w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                  }`}
                />
                {errors.email && (
                  <span className="mt-1 block text-sm text-red-600">
                    {errors.email}
                  </span>
                )}
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-gray-900">
                  Website URL <span className="text-red-600">*</span>
                </span>
                <input
                  value={form.website}
                  onChange={(event) =>
                    updateField("website", event.target.value)
                  }
                  placeholder="https://example.com"
                  maxLength={500}
                  className={`mt-2 w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition ${
                    errors.website
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                  }`}
                />
                {errors.website && (
                  <span className="mt-1 block text-sm text-red-600">
                    {errors.website}
                  </span>
                )}
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-gray-900">
                  Scam Type <span className="text-red-600">*</span>
                </span>
                <select
                  value={form.scamType}
                  onChange={(event) =>
                    updateField("scamType", event.target.value)
                  }
                  className={`mt-2 w-full rounded-lg border px-4 py-3 text-gray-900 outline-none transition ${
                    errors.scamType
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-white hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
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
                  <span className="mt-1 block text-sm text-red-600">
                    {errors.scamType}
                  </span>
                )}
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-gray-900">
                Description <span className="text-red-600">*</span>
              </span>
              <textarea
                rows={6}
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Describe the scam, what happened and any suspicious details."
                maxLength={2000}
                className={`mt-2 w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition resize-none ${
                  errors.description
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-white hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                }`}
              />
              {errors.description && (
                <span className="mt-1 block text-sm text-red-600">
                  {errors.description}
                </span>
              )}
              <span className="mt-1 block text-xs text-gray-500">
                {form.description.length}/2000 characters (minimum 10)
              </span>
            </label>

            <div className="rounded-lg border border-blue-300 bg-blue-50 p-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) =>
                    updateField("consent", event.target.checked)
                  }
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I have read and agree to the{" "}
                  <Link href="/privacy" className="font-semibold text-blue-600 hover:text-blue-700">
                    Privacy Policy
                  </Link>
                  ,{" "}
                  <Link href="/terms" className="font-semibold text-blue-600 hover:text-blue-700">
                    Terms of Service
                  </Link>
                  , and{" "}
                  <Link href="/disclaimer" className="font-semibold text-blue-600 hover:text-blue-700">
                    Disclaimer
                  </Link>
                  . I understand my report will be public and that I am responsible for its accuracy.
                </span>
              </label>
              {errors.consent && (
                <p className="mt-2 text-sm text-red-600">{errors.consent}</p>
              )}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-6">
              <div className="text-sm text-gray-600">
                All fields marked with <span className="text-red-600 font-semibold">*</span> are required.
              </div>

              <button
                type="button"
                disabled={!isFormValid || submitting}
                onClick={handleSubmit}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
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
        className="mx-auto max-w-7xl px-6 py-12 sm:py-16"
      >
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              📋 Latest Scam Reports
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
              Community Fraud Intelligence
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:text-blue-600"
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
                placeholder="Search by phone, email, website..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-sm text-gray-900 placeholder-gray-400 outline-none transition hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 sm:w-auto"
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 grid place-items-center text-gray-400">
                🔍
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {loadingReports ? (
            <ReportCardSkeletonGrid />
          ) : filteredReports.length === 0 ? (
            <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
              <p className="text-lg font-semibold text-gray-900">
                No matching reports found.
              </p>
              <p className="mt-2 text-gray-600">
                Try a different search term or select another scam category.
              </p>
            </div>
          ) : (
            filteredReports.map((report) => {
              const categoryColors: Record<string, { badge: string; text: string; icon: string }> = {
                "WhatsApp Scam": { badge: "bg-blue-100 text-blue-800", text: "text-blue-600", icon: "💬" },
                "Investment Fraud": { badge: "bg-purple-100 text-purple-800", text: "text-purple-600", icon: "💰" },
                "Fake Website": { badge: "bg-cyan-100 text-cyan-800", text: "text-cyan-600", icon: "🌐" },
                "Phishing": { badge: "bg-orange-100 text-orange-800", text: "text-orange-600", icon: "🎣" },
                "Crypto Scam": { badge: "bg-yellow-100 text-yellow-800", text: "text-yellow-600", icon: "🪙" },
                "Job Scam": { badge: "bg-indigo-100 text-indigo-800", text: "text-indigo-600", icon: "💼" },
                "Banking Fraud": { badge: "bg-emerald-100 text-emerald-800", text: "text-emerald-600", icon: "🏦" },
              };
              
              const categoryColor = categoryColors[report.scam_type || ""] || { badge: "bg-gray-100 text-gray-800", text: "text-gray-600", icon: "⚠️" };

              return (
                <article
                  key={report.id}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <span className={`inline-flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-semibold ${categoryColor.badge}`}>
                      {categoryColor.icon} {report.scam_type || "Unknown"}
                    </span>
                    <span className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-1 text-xs text-gray-600 font-medium">
                      {new Date(report.created_at).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="mb-4 leading-relaxed text-gray-700">
                    {report.description || "No description provided"}
                  </p>

                  <div className="space-y-3 border-t border-gray-200 pt-4">
                    {report.phone_number && (
                      <div className="flex items-start gap-3">
                        <span className="text-lg text-blue-600">📞</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-gray-500 uppercase">Phone Number</p>
                          <p className="mt-1 break-all font-mono text-sm text-gray-900">{report.phone_number}</p>
                        </div>
                      </div>
                    )}
                    
                    {report.email && (
                      <div className="flex items-start gap-3">
                        <span className="text-lg text-purple-600">✉️</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-gray-500 uppercase">Email Address</p>
                          <p className="mt-1 break-all text-sm text-gray-900">{report.email}</p>
                        </div>
                      </div>
                    )}
                    
                    {report.website && (
                      <div className="flex items-start gap-3">
                        <span className="text-lg text-cyan-600">🌐</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-gray-500 uppercase">Website</p>
                          <a
                            href={report.website}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="mt-1 break-all text-sm font-semibold text-blue-600 hover:text-blue-700"
                          >
                            {report.website}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {report.reporter_name && (
                      <div className="flex items-start gap-3">
                        <span className="text-lg">👤</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-gray-500 uppercase">Reporter</p>
                          <p className="mt-1 text-sm text-gray-900">{report.reporter_name}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🔒 Security</h3>
            <p className="text-gray-600 text-sm">
              All submissions are validated and protected with industry-standard security measures.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🛡️ Privacy</h3>
            <p className="text-gray-600 text-sm">
              Your data is encrypted and stored securely. See our privacy policy for more details.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-lg font-bold text-gray-900 mb-3">✅ Trust</h3>
            <p className="text-gray-600 text-sm">
              Community-driven and transparent. Read our FAQ and community guidelines.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Learn More</h2>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
            <Link href="/faq" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
              ❓ FAQ
            </Link>
            <Link href="/privacy" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
              🔐 Privacy Policy
            </Link>
            <Link href="/terms" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
              ⚖️ Terms of Service
            </Link>
            <Link href="/disclaimer" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
              ⚠️ Disclaimer
            </Link>
            <Link href="/community-guidelines" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
              👥 Community Guidelines
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-gray-50 px-6 py-8 text-center text-gray-600">
        © 2026 Fraud Alert Network • Community Powered Scam Protection
      </footer>
    </main>
  );
}