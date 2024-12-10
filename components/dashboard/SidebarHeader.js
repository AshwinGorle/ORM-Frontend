"use client";

import { Building2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SidebarHeader({ isCollapsed, onToggle, onMobileClose }) {
  return (
    <div className="flex items-center justify-between h-16 px-4 border-b flex-shrink-0">
      <div className="flex items-center gap-3 overflow-hidden">
        <Building2 className="h-8 w-8 text-primary flex-shrink-0" />
        {!isCollapsed && (
          <span className="font-semibold text-xl truncate">Admin</span>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:flex"
        onClick={onToggle}
      >
        <Menu className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMobileClose}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}