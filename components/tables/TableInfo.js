"use client";

export default function TableInfo({ table }) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Capacity</span>
        <span className="font-medium">{table.capacity} People</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Location</span>
        <span className="font-medium capitalize">{table.position}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Status</span>
        <span className="font-medium capitalize">{table.status}</span>
      </div>
    </div>
  );
}