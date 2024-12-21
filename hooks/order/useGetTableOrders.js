import { useState, useCallback, useMemo } from "react";
import { useGetAllOrders } from "./useGetAllOrders";

export const useGetTableOrders = (tableId) => {
    const { orders: allOrders, loading } = useGetAllOrders();

    const transformedOrders = useMemo(() => {
        if (!allOrders) return { pending: [], preparing: [], completed: [], draft: [] };
        
        return {
            draft: allOrders.draft?.filter(order => 
                order?.tableId?._id?.toString() === tableId
            ) || [],
            pending: allOrders.pending?.filter(order => 
                order?.tableId?._id?.toString() === tableId
            ) || [],
            preparing: allOrders.preparing?.filter(order => 
                order?.tableId?._id?.toString() === tableId
            ) || [],
            completed: allOrders.completed?.filter(order => 
                order?.tableId?._id?.toString() === tableId
            ) || []
        };
    }, [allOrders, tableId]);

    return { orders: transformedOrders, loading };
};
