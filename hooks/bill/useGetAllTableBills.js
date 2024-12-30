import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { getAllBills } from "@/redux/actions/bill/billAction";
import { billActions } from "@/redux/slices/billSlice";


export const useGetAllBills = (params = {}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { refresh = false, setRefresh = null } = params;

    const { status, error, data } = useSelector((state) => state.bill.getAllBills); // Directly use this
    const { toast } = useToast();

    const fetchAllBills = useCallback(() => {
        if (( refresh || !data )) {
            dispatch(getAllBills());
            setRefresh(false);
        }
    }, [dispatch, data, refresh]);

    useEffect(() => {
        fetchAllBills();
    }, [fetchAllBills, refresh]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            setRefresh && setRefresh(false);
            toast({
                title: "Success",
                description: "Bills fetched successfully.",
                variant: "success",
            });
            dispatch(billActions.clearGetAllBillsStatus());
            dispatch(billActions.clearGetAllBillsError());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to Fetch Bills.",
                variant: "destructive",
            });
            dispatch(billActions.clearGetAllBillsStatus());
            dispatch(billActions.clearGetAllBillsError());
        }
    }, [status, data, error, dispatch, toast, setRefresh]);

    const transformedBills = useMemo(() => {
        return data?.bills || [];
    }, [data]);

    return { bills: transformedBills, loading };
};
