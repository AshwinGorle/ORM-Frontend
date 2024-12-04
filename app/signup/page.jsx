"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OtpVerification from "@/components/auth/OtpVerification";
import { useSignup } from "@/hooks/auth/useSignup";
import { useResendOtp, useVerifyEmail } from "@/hooks/auth";

const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.string(),
    devKey: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState(null);
  const [email, setEmail] = useState(null);

  const { loading, handleSignup, showOtpVerification } = useSignup();
  const { loading: emailVerifyLoading, handleVerify } = useVerifyEmail();
  const { loading : resendOtpLoading, handleResendOtp } = useResendOtp();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "",
      devKey: "",
    },
  });
  const [showDevKeyInput, setShowDevKeyInput] = useState(false);

  const handleSignupLocal = async (values) => {
    handleSignup(values);
    setFormData(values);
    setEmail(values.email);
    setEmail(values.email);
  };

  const handleOtpVerifyLocal = async (otp) => {
    console.log("Verifying OTP:", otp);
    handleVerify(email, otp);
  };

  const handleResendOtpLocal = async () => {
    handleResendOtp(email);
  };

  if (showOtpVerification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <OtpVerification
          email={formData.email}
          onVerify={handleOtpVerifyLocal}
          onResendOtp={handleResendOtpLocal}
          emailVerifyLoading={emailVerifyLoading}
          resendOtpLoading={resendOtpLoading}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 ">
      <Card className="w-full max-w-md ">
        <CardHeader className="space-y-1 text-center">
          <Building2 className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-3xl">Create your account</CardTitle>
          <p className="text-sm text-muted-foreground">
            Or{" "}
            <Link href="/login" className="text-primary hover:underline">
              sign in to your account
            </Link>
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignupLocal)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="role"
                render={({ field }) => { 
                  console.log("fields : ", field);
                  if(field.value == "superadmin") setShowDevKeyInput(true);
                  else setShowDevKeyInput(false);
                  return(
                  <FormItem>
                    <FormLabel>User Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="superadmin">Super Admin</SelectItem>
                        <SelectItem value="hotelowner">Hotel Owner</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}}
              /> */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Type</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value); // Update the form state
                        setShowDevKeyInput(value === "superadmin"); // Update local state
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="superadmin">Super Admin</SelectItem>
                        <SelectItem value="hotelowner">Hotel Owner</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {showDevKeyInput && (
                <FormField
                  control={form.control}
                  name="devKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dev Key</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter key provided by developers"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Sign up"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
