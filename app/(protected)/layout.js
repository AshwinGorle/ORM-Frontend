"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

export default function ProtectedLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    if (!cookies.authToken) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
} 