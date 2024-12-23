"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-[120px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-[80px] mb-1" />
        <Skeleton className="h-4 w-[100px]" />
      </CardContent>
    </Card>
  );
}