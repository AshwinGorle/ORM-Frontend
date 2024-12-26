import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { createOrder } from "@/redux/actions/order/orderActions";
import { orderActions } from "@/redux/slices/orderSlice";
import { useGetUser } from "../auth";

export const useCreateOrder = (handleClose) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.order.createOrder);
    const { toast } = useToast();
    const {loading : userLoading ,user} = useGetUser();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Order added successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(orderActions.clearCreateOrderStats());
            handleClose() // to close dialog
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to add Orders.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(orderActions.clearCreateOrderStats());
            handleClose() // to close dialog

        }
    }, [status, error, dispatch, toast]);

    const handleCreateOrder = (data) => {
        const hotelId = user.hotelId;
        const tableId = data.tableId;
        console.log("hook-create-order-req:", data, hotelId, tableId);
        dispatch(createOrder(data, hotelId, tableId));
    };
   
    return {loading, handleCreateOrder};
};
