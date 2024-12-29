import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { getAllOrders } from "@/redux/actions/order/orderActions";
import { orderActions } from "@/redux/slices/orderSlice";

export const useGetAllOrders = (type="order", params = {}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { refresh = false, setRefresh } = params;

    const { status, error, data } = useSelector((state) => state.order.getAllOrders);
    const { toast } = useToast();

    // Cleanup function to reset states
    useEffect(() => {
        return () => {
            dispatch(orderActions.clearGetAllOrdersStatus());
            dispatch(orderActions.clearGetAllOrdersError());
        };
    }, [dispatch]);

    const fetchAllOrders = useCallback(() => {
        if ( type === 'order') {
            dispatch(getAllOrders());
        }
    }, [dispatch, type]);

    // Initial fetch and refresh handling
    useEffect(() => {
        if (refresh || !data ) {
            setRefresh(false);
            fetchAllOrders();
        }
    }, [fetchAllOrders, data, refresh]);

    // Status handling
    useEffect(() => {
        switch (status) {
            case "pending":
                setLoading(true);
                break;
            case "success":
                setLoading(false);
                if (setRefresh) setRefresh(false);
                if (refresh) {
                    toast({
                        title: "Success",
                        description: "Orders fetched successfully.",
                        variant: "success",
                    });
                }
                dispatch(orderActions.clearGetAllOrdersStatus());
                dispatch(orderActions.clearGetAllOrdersError());
                break;
            case "failed":
                setLoading(false);
                toast({
                    title: "Error",
                    description: error || "Failed to Fetch Orders.",
                    variant: "destructive",
                });
                dispatch(orderActions.clearGetAllOrdersStatus());
                dispatch(orderActions.clearGetAllOrdersError());
                break;
        }
    }, [status, error, dispatch, toast, setRefresh, refresh]);

    const transformedOrders = useMemo(() => {
        return data || {
            draft: [],
            pending: [],
            preparing: [],
            completed: [],
        };
    }, [data]);

    return { 
        orders: transformedOrders, 
        loading,
        refetch: fetchAllOrders
    };
};
