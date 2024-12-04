import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { authActions } from "@/redux/slices/authSlice";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { login } from "@/redux/actions/auth";
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { status, error, data } = useSelector((state) => state.auth.authDetails);
  const { toast } = useToast(); // Access ShadCN's toast

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      localStorage.setItem("user", data);
      localStorage.setItem("isAuthenticated", true);
      router.push("/");
      toast({
        title: "Success",
        description: "Login successfully.",
        variant: "success", // Optional, depending on toast styling
      });
      dispatch(authActions.clearAuthDetailsStatus());
    } else if (status === "failed") {
      setLoading(false);
      toast({
        title: "Error",
        description: error || "Failed to Login.",
        variant: "destructive", // Optional, for error styling
      });
      dispatch(authActions.clearAuthDetailsError());
      dispatch(authActions.clearAuthDetailsStatus());
    }
  }, [status, error, dispatch, router, toast, data]);

  const handleLogin = (loginData) => {
    console.log('hook-login-req : ', loginData)
    dispatch(login(loginData));
  };
  return { loading, handleLogin };
};
