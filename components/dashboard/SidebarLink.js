"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SidebarLink({ item, isActive, isCollapsed }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
        "hover:bg-gray-100 active:bg-gray-200",
        isActive
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "text-gray-600",
        isCollapsed && "justify-center"
      )}
    >
      <item.icon className="h-5 w-5 flex-shrink-0" />
      {!isCollapsed && (
        <span className="truncate">{item.title}</span>
      )}
    </Link>
  );
}