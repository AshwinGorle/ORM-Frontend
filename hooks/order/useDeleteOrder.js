import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { deleteOrder, updateOrder } from "@/redux/actions/order/orderActions.js";
import { orderActions } from "@/redux/slices/orderSlice";

export const useDeleteOrder = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.order.deleteOrder);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Order updated successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(orderActions.clearDeleteOrderStats());
            dispatch(orderActions.setSelectedDeleteOrder(null));
            dispatch(orderActions.setOpenDeleteOrder(false));
            
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to update Orders.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(orderActions.clearDeleteOrderStats());
        }
    }, [status, error, dispatch, toast]);

    const handleDeleteOrder = (orderId) => {
        console.log("hook-delete-order-req:" , orderId );
        dispatch(deleteOrder(orderId));
    };

    return {loading, handleDeleteOrder};
};
