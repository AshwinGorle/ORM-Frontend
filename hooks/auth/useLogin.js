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
  const { status, error, isAuthenticated } = useSelector((state) => state.auth.authDetails);
  const { toast } = useToast();

  const handleLogin = async (loginData) => {
    try {
      const success = await dispatch(login(loginData));
      if (success) {
        toast({
          title: "Success",
          description: "Login successful",
          variant: "success",
        });
        router.push('/dashboard');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "failed") {
      setLoading(false);
      toast({
        title: "Error",
        description: error || "Failed to login",
        variant: "destructive",
      });
      dispatch(authActions.clearAuthDetailsStatus());
    }
  }, [status, error, dispatch, toast]);

  return { loading, handleLogin };
};
