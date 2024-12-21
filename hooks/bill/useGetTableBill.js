import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { billActions } from "@/redux/slices/billSlice";
import { getTableBill, generateBill } from "@/redux/actions/bill/billAction.js";

export const useGetTableBill = (tableId) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.bill.getTableBill);
    const { toast } = useToast();

    const fetchTableBill = () => {
        dispatch(getTableBill(tableId));
    };

    const handleGenerateBill = async () => {
        try {
            setLoading(true);
            await dispatch(generateBill(tableId)).unwrap();
            toast({
                title: "Success",
                description: "Bill generated successfully.",
                variant: "success",
            });
            fetchTableBill(); // Fetch once after generation
        } catch (err) {
            toast({
                title: "Error",
                description: err.message || "Failed to generate bill.",
                variant: "destructive",
            });
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTableBill(); // Initial fetch only
    }, [tableId]); // Only re-fetch when tableId changes

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            dispatch(billActions.clearGetTableBillStatus());
            dispatch(billActions.clearGetTableBillError());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to fetch bill.",
                variant: "destructive",
            });
            dispatch(billActions.clearGetTableBillStatus());
            dispatch(billActions.clearGetTableBillError());
        }
    }, [status, error, dispatch, toast]);

    return { 
        bill: data?.bill || null, 
        loading,
        handleGenerateBill,
        refreshBill: fetchTableBill // Expose refresh function
    };
};
