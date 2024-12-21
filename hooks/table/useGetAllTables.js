import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { tableActions } from "@/redux/slices/tableSlice";
import { getAllTables } from "@/redux/actions/table";

export const useGetAllTables = (params = {}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { refresh = false, setRefresh = null } = params;

    const { status, error, data } = useSelector((state) => state.table.getAllTables);
    const { toast } = useToast();

    const fetchAllTables = useCallback(() => {
        if (!data || refresh) {
            dispatch(getAllTables());
        }
    }, [dispatch, data, refresh]);

    useEffect(() => {
        fetchAllTables();
    }, [fetchAllTables]);

    const handleStatusChange = useCallback(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            if (setRefresh) {
                setRefresh(false);
            }
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
    }, [status, error, dispatch, setRefresh, toast]);

    useEffect(() => {
        handleStatusChange();
    }, [handleStatusChange]);

    const transformedTables = useMemo(() => {
        return data?.tables || [];
    }, [data]);

    return { tables: transformedTables, loading };
};
