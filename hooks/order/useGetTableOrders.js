import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { getTableOrders } from "@/redux/actions/order";
import { orderActions } from "@/redux/slices/orderSlice";


export const useGetTableOrders = (tableId) => {
    const params = {}
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { refresh = false, setRefresh = null } = params;

    const { status, error, data } = useSelector((state) => state.order.getTableOrders); // Directly use this
    const { toast } = useToast();

    const fetchTableOrders = useCallback(() => {
        if ( (!data || refresh)) {
            dispatch(getTableOrders(tableId));
        }
    }, [dispatch, data, refresh]);

    useEffect(() => {
        fetchTableOrders();
    }, [fetchTableOrders]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            setRefresh && setRefresh(false);
            toast({
                title: "Success",
                description: " Table Orders fetched successfully.",
                variant: "success",
            });
            dispatch(orderActions.clearGetTableOrderStatus());
            dispatch(orderActions.clearGetTableOrderError());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to Fetch Table Orders.",
                variant: "destructive",
            });
            dispatch(orderActions.clearGetTableOrderStatus());
            dispatch(orderActions.clearGetTableOrderError());
        }
    }, [status, data, error, dispatch, toast, setRefresh]);

    const transformedOrders = useMemo(() => {
        return data;
    }, [data]);

    return { orders: transformedOrders, loading };
};
