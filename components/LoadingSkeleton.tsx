"use client";

export function ReportCardSkeleton() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 animate-pulse">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="h-8 w-32 rounded-full bg-slate-800" />
        <div className="h-6 w-40 rounded-full bg-slate-800" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-slate-800" />
        <div className="h-4 w-5/6 rounded bg-slate-800" />
      </div>

      <div className="mt-7 space-y-2 border-t border-white/10 pt-6">
        <div className="h-4 w-1/2 rounded bg-slate-800" />
        <div className="h-4 w-2/3 rounded bg-slate-800" />
      </div>
    </div>
  );
}

export function ReportCardSkeletonGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ReportCardSkeleton />
      <ReportCardSkeleton />
      <ReportCardSkeleton />
      <ReportCardSkeleton />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 animate-pulse">
      <div className="h-4 w-24 rounded bg-slate-800" />
      <div className="mt-6 h-12 w-20 rounded bg-slate-800" />
      <div className="mt-4 h-4 w-32 rounded bg-slate-800" />
    </div>
  );
}
