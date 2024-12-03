"use client";

import { Building2, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmailConfirmationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <Building2 className="mx-auto h-12 w-12 text-primary" />
        <div className="mt-6">
          <div className="rounded-full bg-primary/10 p-3 inline-flex">
            <Mail className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Check your email
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          We sent you a verification link. Please check your email and click the link to verify your account.
        </p>
        <div className="mt-6">
          <Link href="/login">
            <Button variant="outline" className="mx-auto">
              Return to login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}