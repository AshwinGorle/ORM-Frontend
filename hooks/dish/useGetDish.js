import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { dishActions } from "@/redux/slices/dishSlice";
import { getAllDishes, getDish } from "@/redux/actions/dish";

export const useGetDish = (dishId) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    // const { refresh = false, setRefresh = null } = params;

    const { status, error, data } = useSelector((state) => state.dish.getDish); // Directly use this
    const { toast } = useToast();

    const fetchDish = useCallback(() => {
        if ( !data || data.dish._id.toString() != dishId ) {
            dispatch(getDish(dishId));
        }
    }, [dispatch, data]);

    useEffect(() => {
        fetchDish();
    }, [fetchDish]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            // setRefresh && setRefresh(false);
            toast({
                title: "Success",
                description: "dish fetched successfully.",
                variant: "success",
            });
            dispatch(dishActions.clearGetDishStatus());
            dispatch(dishActions.clearGetDishError());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to Fetch dish.",
                variant: "destructive",
            });
            dispatch(dishActions.clearGetDishStatus());
            dispatch(dishActions.clearGetDishError());
        }
    }, [status, data, error, dispatch, toast]);

    const transformedDishes = useMemo(() => {
        return data?.dish || [];
    }, [data]);

    return { dish: transformedDishes, loading };
};
