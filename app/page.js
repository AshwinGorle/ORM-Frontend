"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.authToken) {J
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="text-center">
          <Building2 className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            Hotel Management System
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage your hotel operations efficiently
          </p>
        </div>
        
        <div className="flex flex-col space-y-4">
          <Link href="/login">
            <Button className="w-full" size="lg">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" className="w-full" size="lg">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}