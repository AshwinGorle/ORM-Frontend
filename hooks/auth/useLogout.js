import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { authActions } from "@/redux/slices/authSlice";
import { logout } from "@/redux/actions/auth";
import { useToast } from "@/hooks/use-toast";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { status: logoutStatus, error: logoutError } = useSelector((state) => state.auth.logout);
  const { toast } = useToast();

  useEffect(() => {
    if (logoutStatus === "pending") {
      setLoading(true);
    } else if (logoutStatus === "success") {
      setLoading(false);
      document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/login");
      toast({
        title: "Success",
        description: "Logged out successfully.",
        variant: "success",
      });
      dispatch(authActions.clearLogoutStatus());
    } else if (logoutStatus === "failed") {
      setLoading(false);
      toast({
        title: "Error",
        description: logoutError || "Failed to logout.",
        variant: "destructive",
      });
      dispatch(authActions.clearLogoutStatus());
    }
  }, [logoutStatus, logoutError, dispatch, router, toast]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return { loading, handleLogout };
};
