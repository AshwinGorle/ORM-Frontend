import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { authActions } from "@/redux/slices/authSlice";
import { useToast } from "@/hooks/use-toast";
import { signup } from "@/redux/actions/auth";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();
  
  const { status, error, data } = useSelector((state) => state.auth.signup);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      setShowOtpVerification(true);
      toast({
        title: "Success",
        description: "Account created successfully. Please verify your email.",
        variant: "success",
      });
      dispatch(authActions.clearSignupStatus());
    } else if (status === "failed") {
      setLoading(false);
      toast({
        title: "Error",
        description: error || "Failed to Signup.",
        variant: "destructive",
      });
      dispatch(authActions.clearSignupError());
      dispatch(authActions.clearSignupStatus());
    }
  }, [status, error, dispatch, router, toast, data]);

  const handleSignup = (signupData) => {
    setUserEmail(signupData.email);
    dispatch(signup(signupData));
  };

  return { loading, handleSignup, showOtpVerification, userEmail };
};
