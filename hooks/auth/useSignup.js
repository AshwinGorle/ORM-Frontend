import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { authActions } from "@/redux/slices/authSlice";
import { useToast } from "@/hooks/use-toast";
import { signup } from "@/redux/actions/auth";
import { parseCookies, setCookie } from 'nookies';

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { status, error, data } = useSelector((state) => state.auth.authDetails);
  const { toast } = useToast();
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      const cookies = parseCookies();
      if (cookies.token && data) {
        setCookie(null, 'user', JSON.stringify(data), {
          maxAge: 10 * 24 * 60 * 60, // 10 days
          path: '/',
        });
      }
      toast({
        title: "Success",
        description: "Account created successfully.",
        variant: "success",
      });
      dispatch(authActions.clearAuthDetailsStatus());
      setShowOtpVerification(true);
    } else if (status === "failed") {
      setLoading(false);
      toast({
        title: "Error",
        description: error || "Failed to Signup.",
        variant: "destructive",
      });
      dispatch(authActions.clearAuthDetailsError());
      dispatch(authActions.clearAuthDetailsStatus());
    }
  }, [status, error, dispatch, router, toast, data]);

  const handleSignup = (signupData) => {
    dispatch(signup(signupData));
  };

  return { loading, handleSignup, showOtpVerification };
};
