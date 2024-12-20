"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 ml-0 md:ml-72 min-h-screen">
          <div className="max-w-7xl mx-auto p-4 pt-20 md:pt-4">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}