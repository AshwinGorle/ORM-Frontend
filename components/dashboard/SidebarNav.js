"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SidebarNav({ items, pathname }) {
  return (
    <div className="flex-1 overflow-y-auto py-4">
      <nav className="flex flex-col gap-1 px-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
              "hover:bg-gray-100 active:bg-gray-200",
              pathname === item.href
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "text-gray-600"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}