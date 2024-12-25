import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { payBill } from "@/redux/actions/bill/billAction";
import { billActions } from "@/redux/slices/billSlice";
import { useRouter } from "next/navigation";

export const usePayBill = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.bill.payBill);
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Bill paid successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(billActions.clearPayBillStats());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to pay bill.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(billActions.clearPayBillStats());
        }
    }, [status, error, dispatch, toast]);

    const handlePayBill = (billId) => {
        console.log("hook-pay-bill-req:" , billId);
        dispatch(payBill(billId, data));
    };

    return {loading, handlePayBill};
};
