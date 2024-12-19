import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { updateOrder } from "@/redux/actions/order";
import { orderActions } from "@/redux/slices/orderSlice";

export const useUpdateOrder = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.order.updateOrder);
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
            dispatch(orderActions.clearUpdateOrderStats());
            dispatch(orderActions.setSelectedEditOrder(null));
            dispatch(orderActions.setOpenEditOrder(false));
            
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to update Orders.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(orderActions.clearUpdateOrderStats());

        }
    }, [status, error, dispatch, toast]);

    const handleUpdateOrder = (orderId, data) => {
        console.log("hook-update-order-req:" , orderId , data);
        dispatch(updateOrder(orderId, data));
    };

    return {loading, handleUpdateOrder};
};
