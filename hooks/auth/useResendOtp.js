import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/redux/slices/authSlice";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { resendOtp } from "@/redux/actions/auth";

export const useResendOtp = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, error, data } = useSelector((state) => state.auth.verifyOTP);
  const { toast } = useToast(); // Access ShadCN's toast

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      toast({
        title: "OTP Sent",  
        description: "A new OTP has been sent to your email.",
        variant: "success", // Optional, depending on toast styling
      });
      dispatch(authActions.clearVerifyOTPStatus());
    } else if (status === "failed") {
      setLoading(false);
      toast({
        title: "Error",
        description: error || "Failed to resend OTP. Please try again.",
        variant: "destructive", // Optional, for error styling
      });
      dispatch(authActions.clearVerifyOTPError());
      dispatch(authActions.clearVerifyOTPStatus());
    }
  }, [status, error, dispatch, toast, data]);

  const handleResendOtp = (email) => {
    console.log("hook-resend-otp-req: ", email);
    dispatch(resendOtp(email));
  };

  return { loading, handleResendOtp };
};
