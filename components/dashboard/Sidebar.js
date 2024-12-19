"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Building2,
  Menu,
  X,
  Settings,
  BarChart3,  
  LogOut,
  ChartBarBig,
  UserCircle,
  UserRoundCog
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SidebarNav from "./SidebarNav";
import { useGetUser, useLogout } from "@/hooks/auth";

// yaha par menu items aayenge bhaii , side bar ke items yaha add krdena
const menuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    href: "/dashboard",
  },
  {
    title: "Admin Dashboard",
    icon: ChartBarBig ,
    href: "/admin-dashboard",
  },
  {
    title: "Configuration",
    icon: Settings,
    href: "/dashboard/configuration",
  },
  {
    title: "Profile",
    icon: UserRoundCog,
    href: "/dashboard/profile",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { loading, handleLogout } = useLogout();
  const {loading : userLoading, user} = useGetUser();
  const menuItems = [
    {
      title: "Live Orders",
      icon: BarChart3,
      href: `/order-page/${user?.hotelId}`,
    },
    {
      title: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
    },
    {
      title: "Admin Dashboard",
      icon: ChartBarBig ,
      href: "/admin-dashboard",
    },
    {
      title: "Configuration",
      icon: Settings,
      href: "/dashboard/configuration",
    },
    {
      title: "Profile",
      icon: UserRoundCog,
      href: "/dashboard/profile",
    },
  ];

  const sidebarContent = (
    <>
      <div className="flex items-center h-16 px-4 border-b">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-primary" />
          <span className="font-semibold text-xl">Admin Panel</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto md:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <SidebarNav items={menuItems} pathname={pathname} />

      <div className="mt-auto border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={handleLogout}
          disabled={loading}
        >
          <LogOut className="h-5 w-5" />
          <span>{loading ? "Logging out..." : "Logout"}</span>
        </Button>
      </div>
    </>
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r shadow-lg md:hidden",
          "transform transition-transform duration-300 ease-in-out flex flex-col",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col fixed top-0 left-0 h-full w-72 bg-white border-r shadow-sm">
        {sidebarContent}
      </div>
    </>
  );
}