"use client";

export function ReportCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 animate-pulse">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="h-6 w-32 rounded-lg bg-gray-200" />
        <div className="h-6 w-40 rounded-lg bg-gray-200" />
      </div>

      <div className="space-y-2 mb-4">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
      </div>

      <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
        <div className="h-4 w-1/2 rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export function ReportCardSkeletonGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ReportCardSkeleton />
      <ReportCardSkeleton />
      <ReportCardSkeleton />
      <ReportCardSkeleton />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 animate-pulse">
      <div className="h-4 w-24 rounded bg-gray-200" />
      <div className="mt-6 h-12 w-20 rounded bg-gray-200" />
      <div className="mt-4 h-4 w-32 rounded bg-gray-200" />
    </div>
  );
}
