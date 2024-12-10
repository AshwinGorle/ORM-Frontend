"use client";

import { useState } from "react";
import { Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TableStatusCard from "@/components/tables/TableStatusCard";

export default function ManageTablesPage() {
  const [tables] = useState([
    { id: 1, number: 1, status: "free" },
    { id: 2, number: 2, status: "occupied" },
    { id: 3, number: 3, status: "free" },
    { id: 4, number: 4, status: "occupied" },
    { id: 5, number: 5, status: "free" },
    { id: 6, number: 6, status: "free" },
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Table Management</h1>
        <p className="text-muted-foreground">Manage restaurant tables and their status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((table) => (
          <TableStatusCard key={table.id} table={table} />
        ))}
      </div>
    </div>
  );
}