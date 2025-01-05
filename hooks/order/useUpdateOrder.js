import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { updateOrder } from "@/redux/actions/order/orderActions.js";
import { orderActions } from "@/redux/slices/orderSlice";

export const useUpdateOrder = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.order.updateOrder);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Order updated successfully.",
                variant: "success",
            });
            dispatch(orderActions.clearUpdateOrderStats());
            dispatch(orderActions.setEditOrderDialog({order : null, open : false}));
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to update Orders.",
                variant: "destructive",
            });
            dispatch(orderActions.clearUpdateOrderStats());
        }
    }, [status, error, dispatch, toast]);

    const handleUpdateOrder = async (orderId, data) => {
        await dispatch(updateOrder(orderId, data));
    };

    return { loading, handleUpdateOrder };
};
