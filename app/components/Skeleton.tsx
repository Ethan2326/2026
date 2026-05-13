export function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#E8E8E4] rounded-xl animate-pulse ${className}`} />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8 flex justify-between">
        <div className="flex flex-col gap-2">
          <SkeletonBlock className="h-7 w-32" />
          <SkeletonBlock className="h-4 w-48" />
        </div>
        <SkeletonBlock className="h-7 w-16 rounded-full" />
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-[#FFFFFF] rounded-2xl border border-[#E8E8E4] p-5 flex flex-col gap-3">
              <div className="flex justify-between">
                <SkeletonBlock className="h-5 w-32" />
                <SkeletonBlock className="h-10 w-10 rounded-full" />
              </div>
              <SkeletonBlock className="h-4 w-56" />
              <SkeletonBlock className="h-6 w-48" />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <SkeletonBlock className="h-44 w-full rounded-2xl" />
          {[1, 2, 3].map((i) => (
            <SkeletonBlock key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <SkeletonBlock className="h-7 w-40" />
        <SkeletonBlock className="h-4 w-56" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonBlock key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <SkeletonBlock className="h-64 rounded-2xl" />
        <SkeletonBlock className="h-64 rounded-2xl" />
      </div>
    </div>
  );
}
