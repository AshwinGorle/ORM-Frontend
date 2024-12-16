'use client';

import { useAuth } from '@/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { parseCookies } from 'nookies';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const hasAuthCookie = cookies.authToken;
    
    if (!isAuthenticated && !hasAuthCookie) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return children;
} 