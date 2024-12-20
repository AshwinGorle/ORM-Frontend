import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { billActions } from "@/redux/slices/billSlice";
import { getTableBill } from "@/redux/actions/bill";

export const useGetTableBill = (tableId) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    // const { refresh = false, setRefresh = null } = params;

    const { status, error, data } = useSelector((state) => state.bill.getTableBill); // Directly use this
    const { toast } = useToast();

    const fetchTableBill = useCallback(() => {
        console.log( data?.bill?._id?.toString() , "-----------", tableId)
        if ( !data || data?.bill?._id?.toString() != tableId ) {
            dispatch(getTableBill(tableId));
        }
    }, [dispatch, data]);

    useEffect(() => {
        fetchTableBill();
    }, [fetchTableBill]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            // setRefresh && setRefresh(false);
            toast({
                title: "Success",
                description: "tableBill fetched successfully.",
                variant: "success",
            });
            dispatch(billActions.clearGetTableBillStatus());
            dispatch(billActions.clearGetTableBillError());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to Fetch tableBill.",
                variant: "destructive",
            });
            dispatch(billActions.clearGetTableBillStatus());
            dispatch(billActions.clearGetTableBillError());
        }
    }, [status, data, error, dispatch, toast]);

    const transformedTableBill = useMemo(() => {
        return data?.bill || [];
    }, [data]);

    return { tableBill: transformedTableBill, loading };
};
