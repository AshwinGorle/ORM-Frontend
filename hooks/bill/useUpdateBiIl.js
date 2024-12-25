import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { updateBill } from "@/redux/actions/bill/billAction";
import { billActions } from "@/redux/slices/billSlice";

export const useUpdateBill = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.bill.updateBill);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Bill updated successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(billActions.clearUpdateBillStats());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to update bill.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(billActions.clearUpdateBillStats());
        }
    }, [status, error, dispatch, toast]);

    const handleUpdateBill = (billId, data) => {
        console.log("hook-update-bill-req:" , billId , data);
        dispatch(updateBill(billId, data));
    };

    return {loading, handleUpdateBill};
};
