"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { StatCardSkeleton } from "./StatCardSkeleton";
import { ChartSkeleton } from "./ChartSkeleton";
import { TableSkeleton } from "./TableSkeleton";

export function DashboardSkeleton() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-9 w-[150px]" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      <ChartSkeleton />
      <TableSkeleton />
    </div>
  );
}