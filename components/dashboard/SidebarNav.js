"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useGetUser } from "@/hooks/auth";
import { useEffect, useState } from "react";
import {
  Building2,
  Menu,
  X,
  Settings,
  BarChart3,
  LogOut,
  ChartBarBig,
  UserRoundCog,
  CookingPot,
  Receipt,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SidebarNav({ pathname }) {
  const router = useRouter();
  const { loading: userLoading, user } = useGetUser();
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    if (user) {
      if (user.role === "superadmin") {
        console.log("supper admin checked ------");
        setMenuItems([
          {
            title: "Admin Dashboard",
            icon: ChartBarBig,
            href: "/admin-dashboard",
          },
        ]);
      } else {
        setMenuItems([
          {
            title: "Live Orders",
            icon: CookingPot,
            href: `/order-page/${user?.hotelId}`,
          },
          {
            title: "Dashboard",
            icon: BarChart3,
            href: "/dashboard",
          },
          {
            title: "Bills",
            icon: Receipt,
            href: "/dashboard/bills",
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
        ]);
      }
    }
  }, [userLoading, user]);
  return (
    <div className="flex-1 overflow-y-auto py-4">
      <nav className="flex flex-col gap-1 px-2">
        {menuItems.map((item) => (
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
