import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { getAllOrders } from "@/redux/actions/order";
import { orderActions } from "@/redux/slices/orderSlice";


export const useGetAllOrders = (type="order") => {
    const params = {}
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { refresh = false, setRefresh = null } = params;

    const { status, error, data } = useSelector((state) => state.order.getAllOrders); // Directly use this
    const { toast } = useToast();

    const fetchAllOrders = useCallback(() => {
        if (type == 'order' && (!data || refresh)) {
            dispatch(getAllOrders());
        }
    }, [dispatch, data, refresh]);

    useEffect(() => {
        fetchAllOrders();
    }, [fetchAllOrders]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            setRefresh && setRefresh(false);
            toast({
                title: "Success",
                description: "Orders fetched successfully.",
                variant: "success",
            });
            dispatch(orderActions.clearGetAllOrdersStatus());
            dispatch(orderActions.clearGetAllOrdersError());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to Fetch Orders.",
                variant: "destructive",
            });
            dispatch(orderActions.clearGetAllOrdersStatus());
            dispatch(orderActions.clearGetAllOrdersError());
        }
    }, [status, data, error, dispatch, toast, setRefresh]);

    const transformedOrders = useMemo(() => {
        return data || {
          draft:[],  
          pending: [],
          preparing: [],
          completed: [],
        };
    }, [data]);

    return { orders: transformedOrders, loading };
};
