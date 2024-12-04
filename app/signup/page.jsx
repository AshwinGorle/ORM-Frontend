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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  role: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState(null);
  const [email, setEmail] = useState(null);
  const { loading, handleSignup, showOtpVerification} = useSignup();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "",
    },
  });


  const handleSignupLocal = async (values) => {
    handleSignup(values )
    setFormData(values);
    setEmail(values.email);
  };

  const handleOtpVerifyLocal = async (otp) => {
    try {
      console.log("Verifying OTP:", otp);
      
      // toast({
      //   title: "Account created successfully!",
      //   description: formData.userType === "admin" 
      //     ? "Please check your email for confirmation."
      //     : "You can now login with your credentials.",
      // });

      if (formData.userType === "admin") {
        router.push("/email-confirmation");
      } else {
        router.push("/login");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid verification code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleResendOtpLocal = async () => {
    try {
      console.log("Resending OTP to:", formData.email);
      toast({
        title: "Code resent!",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend code. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (showOtpVerification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <OtpVerification
          email={formData.email}
          onVerify={handleOtpVerifyLocal}
          resendOtp={handleResendOtpLocal}
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
            <form onSubmit={form.handleSubmit(handleSignupLocal)} className="space-y-4">
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
                      <Input type="email" placeholder="john@example.com" {...field} />
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
                      <Input type="password" placeholder="••••••••" {...field} />
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
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
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
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Sign up"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}