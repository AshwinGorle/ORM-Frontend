import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { authActions } from "@/redux/slices/authSlice";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { signup } from "@/redux/actions/auth";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { status, error, data } = useSelector((state) => state.auth.authDetails);
  const { toast } = useToast(); // Access ShadCN's toast
  const  [showOtpVerification, setShowOtpVerification] = useState(false);
  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      console.log("inside-hook-success")
      setLoading(false);
      localStorage.setItem("user", data);
      localStorage.setItem("isAuthenticated", true);
       toast({
        title: "Success",
        description: "Account created successfully---.",
        variant: "success", // Optional, dxepending on toast styling
      });
      dispatch(authActions.clearAuthDetailsStatus());
      setShowOtpVerification(true);
    } else if (status === "failed") {
      setLoading(false);
      toast({
        title: "Error",
        description: error || "Failed to Signup.",
        variant: "destructive", // Optional, for error styling
      });
      dispatch(authActions.clearAuthDetailsError());
      dispatch(authActions.clearAuthDetailsStatus());
    }
  }, [status, error, dispatch, router, toast, data, showOtpVerification]);

  const handleSignup = (signupData) => {
    console.log('hook-signup-req : ', signupData)
    dispatch(signup(signupData));
  };
  return { loading, handleSignup, showOtpVerification};
};
