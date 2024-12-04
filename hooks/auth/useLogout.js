import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { authActions } from "@/redux/slices/authSlice";
import { logout } from "@/redux/actions/authAction";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { status, error } = useSelector((state) => state.auth.logout);
  const { toast } = useToast(); // Access ShadCN's toast

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      router.push("/login");
      toast({
        title: "Success",
        description: "Logged out successfully.",
        variant: "success", // Optional, depending on toast styling
      });
      dispatch(authActions.clearLogoutStatus());
    } else if (status === "failed") {
      setLoading(false);
      toast({
        title: "Error",
        description: error || "Failed to logout.",
        variant: "destructive", // Optional, for error styling
      });
      dispatch(authActions.clearLogoutStatus());
      dispatch(authActions.clearLogoutError());
    }
  }, [status, error, dispatch, router, toast]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return { loading, handleLogout };
};
