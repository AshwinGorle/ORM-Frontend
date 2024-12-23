import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { getDashboard } from "@/redux/actions/dashboard";
import { dashboardActions } from "@/redux/slices/dashboardSlice";

export const useFetchDashboard = (params = {}) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { refresh = false, setRefresh = null } = params;

    const { status, error, data } = useSelector((state) => state.dashboard.getDashboard);
    const { toast } = useToast();

    const fetchDashboard = useCallback(() => {
        if (!data || refresh) {
            dispatch(getDashboard());
        } else {
            setLoading(false);
        }
    }, [dispatch, data, refresh]);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    const handleStatusChange = useCallback(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            if (setRefresh) {
                setRefresh(false);
            }
            dispatch(dashboardActions.clearDashboardStats());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to Fetch Dashboard Stats.",
                variant: "destructive",
            });
            dispatch(dashboardActions.clearDashboardStats());
        }
    }, [status, error, dispatch, setRefresh, toast]);

    useEffect(() => {
        handleStatusChange();
    }, [handleStatusChange]);

    return { data, loading };
};
