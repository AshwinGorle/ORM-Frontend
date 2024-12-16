"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export default function OtpVerification({ email, onVerify, onResendOtp, emailVerifyLoading, resendOtpLoading }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      onVerify(email, otpString);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <Building2 className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <p className="text-sm text-muted-foreground">
            We sent a verification code to {email}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>
            <Button
              onClick={handleVerify}
              className="w-full"
              disabled={emailVerifyLoading}
            >
              {emailVerifyLoading ? "Verifying..." : "Verify Email"}
            </Button>
            <Button
              variant="ghost"
              onClick={onResendOtp}
              disabled={resendOtpLoading}
              className="w-full text-sm text-muted-foreground"
            >
              {resendOtpLoading ? "Sending..." : "Didn't receive the code? Resend"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}