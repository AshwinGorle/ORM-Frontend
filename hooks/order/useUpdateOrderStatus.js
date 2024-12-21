import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook

import { updateOrderStatus } from "@/redux/actions/order/orderActions";
import { orderActions } from "@/redux/slices/orderSlice";

export const useUpdateOrderStatus = () => {
    const [loading, setLoading] = useState(false);
    const [updatingOrderId, setUpdatingOrderId] = useState(null);
    const [leftLoading, setLeftLoading] = useState(false);
    const [rightLoading, setRightLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.order.updateOrderStatus);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "OrderStatus updated successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(orderActions.clearUpdateOrderStatusStats());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to update order status.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(orderActions.clearUpdateOrderStatusStats());
        }
    }, [status, error, dispatch, toast]);

    const handleUpdateOrderStatus = (orderId, newStatus, direction) => {
        console.log("hook-update-orderStatus-req:" , orderId , newStatus);
        if(direction == "left") setLeftLoading(true); 
        if(direction == "right") setRightLoading(true); 
        setUpdatingOrderId(orderId);
        dispatch(updateOrderStatus(orderId, newStatus));
    };

    return {loading, updatingOrderId, leftLoading, rightLoading, handleUpdateOrderStatus};
};
