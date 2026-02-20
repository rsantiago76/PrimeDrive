import React from 'react';

export function SkeletonCard() {
  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-white/5" />
        <div className="w-16 h-6 rounded-full bg-white/5" />
      </div>
      <div className="space-y-2">
        <div className="w-24 h-8 rounded bg-white/5" />
        <div className="w-32 h-4 rounded bg-white/5" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] overflow-hidden">
      {/* Header */}
      <div className="grid gap-4 p-4 border-b border-white/10" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {[...Array(columns)].map((_, i) => (
          <div key={i} className="h-4 rounded bg-white/5 animate-pulse" />
        ))}
      </div>
      {/* Rows */}
      {[...Array(rows)].map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-4 p-4 border-b border-white/10"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {[...Array(columns)].map((_, colIndex) => (
            <div key={colIndex} className="h-4 rounded bg-white/5 animate-pulse" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonPage() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="space-y-3">
        <div className="w-48 h-8 rounded bg-white/5" />
        <div className="w-64 h-4 rounded bg-white/5" />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Content */}
      <SkeletonTable />
    </div>
  );
}
