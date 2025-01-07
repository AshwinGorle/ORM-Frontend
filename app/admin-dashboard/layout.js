"use client";

import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      {/* side bar ke right side wala section */}
      <main className="flex-1 ml-0 md:ml-72 min-h-screen">
        <div className="max-w-7xl mx-auto  md:pt-4">
          {children}
        </div>
      </main>
    </div>
  );
}