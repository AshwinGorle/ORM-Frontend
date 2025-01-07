'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function ResetPasswordPage() {
  const { token } = useParams(); // Dynamic token from the URL
  const router = useRouter();

  const route = process.env.NEXT_PUBLIC_SERVER_URL
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/auth`
    : '/api/auth'; // Fallback for testing

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${route}/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Password reset successful! Redirecting...');
        setTimeout(() => router.push('/login'), 3000); // Redirect after 3 seconds
      } else {
        setError(data.message || 'Failed to reset password.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            {error && (
              <Alert className="text-red-600 bg-red-100 border border-red-500">
                {error}
              </Alert>
            )}
            {success && (
              <Alert className="text-green-600 bg-green-100 border border-green-500">
                {success}
              </Alert>
            )}
            <Button
              type="submit"
              className={cn('w-full', loading && 'opacity-50')}
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
