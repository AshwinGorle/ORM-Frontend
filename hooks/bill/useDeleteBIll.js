import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { deleteBill } from "@/redux/actions/bill/billAction";
import { billActions } from "@/redux/slices/billSlice";

export const useDeleteBill = (setDialog) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.bill.deleteBill);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Bill deleted successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(billActions.clearDeleteBillStats());
            setDialog(null) // to close dialog
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to delete bill.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(billActions.clearDeleteBillStats());
            setDialog(null) // to close dialog

        }
    }, [status, error, dispatch, toast]);

    const handleDeleteBill = (billId) => {
        console.log("hook-delete-bill-req:" , billId);
        dispatch(deleteBill(billId));
    };

    return {loading, handleDeleteBill};
};
