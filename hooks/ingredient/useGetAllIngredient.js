import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { ingredientActions } from "@/redux/slices/ingredientsSlice";
import { getAllIngredients } from "@/redux/actions/ingredient"; // Ensure this matches your action import

export const useGetAllIngredients = (params = {}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { refresh = false, setRefresh = null } = params;

    const { status, error, data } = useSelector((state) => state.ingredient.getAllIngredients); // Directly use this
    const { toast } = useToast();

    const fetchAllIngredients = useCallback(() => {
        if (!data || refresh) {
            dispatch(getAllIngredients());
        }
    }, [dispatch, data, refresh]);

    useEffect(() => {
        fetchAllIngredients();
    }, [fetchAllIngredients]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            setRefresh && setRefresh(false);
            toast({
                title: "Success",
                description: "Ingredients fetched successfully.",
                variant: "success",
            });
            dispatch(ingredientActions.clearGetAllIngredientsStatus());
            dispatch(ingredientActions.clearGetAllIngredientsError());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to Fetch Ingredients.",
                variant: "destructive",
            });
            dispatch(ingredientActions.clearGetAllIngredientsStatus());
            dispatch(ingredientActions.clearGetAllIngredientsError());
        }
    }, [status, data, error, dispatch, toast, setRefresh]);

    const transformedIngredients = useMemo(() => {
        return data?.ingredients || [];
    }, [data]);

    return { ingredients: transformedIngredients, loading };
};
