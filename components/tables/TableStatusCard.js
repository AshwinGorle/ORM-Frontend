"use client";

import { Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function TableStatusCard({ table }) {
  const statusStyles = {
    free: "text-green-500",
    occupied: "text-red-500",
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xl font-bold">Table {table.number}</CardTitle>
        <div className="flex items-center gap-2">
          <Circle
            className={cn("h-3 w-3 fill-current", statusStyles[table.status])}
          />
          <span className={cn("text-sm capitalize", statusStyles[table.status])}>
            {table.status}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Capacity</span>
            <span className="font-medium">4 People</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}