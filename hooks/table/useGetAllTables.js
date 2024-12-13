import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { tableActions } from "@/redux/slices/tableSlice";
import { getAllTables } from "@/redux/actions/table";// Ensure this matches your action import

export const useGetAllTables = (params = {}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { refresh = false, setRefresh = null } = params;

    const { status, error, data } = useSelector((state) => state.table.getAllTables); // Directly use this
    const { toast } = useToast();

    const fetchAllTables = useCallback(() => {
        if (!data || refresh) {
            dispatch(getAllTables());
        }
    }, [dispatch, data, refresh]);

    useEffect(() => {
        fetchAllTables();
    }, [fetchAllTables]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            setRefresh && setRefresh(false);
            toast({
                title: "Success",
                description: "Tables fetched successfully.",
                variant: "success",
            });
            dispatch(tableActions.clearGetAllTablesStatus());
            dispatch(tableActions.clearGetAllTablesError());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to Fetch Tables.",
                variant: "destructive",
            });
            dispatch(tableActions.clearGetAllTablesStatus());
            dispatch(tableActions.clearGetAllTablesError());
        }
    }, [status, data, error, dispatch, toast, setRefresh]);

    const transformedTables = useMemo(() => {
        return data?.tables || [];
    }, [data]);

    return { tables: transformedTables, loading };
};
