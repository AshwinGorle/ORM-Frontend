import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { billActions } from "@/redux/slices/billSlice";
import { sendBillToEmail } from "@/redux/actions/bill/billAction";

export const useSendBillToEmail = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.bill.sendBillToEmail);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Email sent successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(billActions.clearSendBillToEmailStats());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to Send bill.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(billActions.clearSendBillToEmailStats());
        }
    }, [status, error, dispatch, toast]);

    const handleSendBillToEmail = (email, billId) => {
        console.log("hook-send-email-bill-req:" ,email, billId);
        dispatch(sendBillToEmail(email, billId));
    };

    return {loading, handleSendBillToEmail};
};
