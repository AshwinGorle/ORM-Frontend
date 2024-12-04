import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { authActions } from "@/redux/slices/authSlice";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { verifyEmail } from "@/redux/actions/auth";

export const useVerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { status, error, data } = useSelector((state) => state.auth.verifyOTP);
  const { toast } = useToast(); // Access ShadCN's toast

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      toast({
        title: "Success",
        description: "Email verified successfully! Redirecting...",
        variant: "success", // Optional, depending on toast styling
      });
      dispatch(authActions.clearVerifyOTPStatus());
      router.push("/login"); // Navigate to the dashboard or appropriate route
    } else if (status === "failed") {
      setLoading(false);
      toast({
        title: "Error",
        description: error || "Failed to verify email. Please try again.",
        variant: "destructive", // Optional, for error styling
      });
      dispatch(authActions.clearVerifyOTPError());
      dispatch(authActions.clearVerifyOTPStatus());
    }
  }, [status, error, dispatch, router, toast, data]);

  const handleVerify = (email, otp) => {
    console.log("hook-verify-req: ", { email, otp });
    dispatch(verifyEmail({ email, otp }));
  };

  return { loading, handleVerify };
};

