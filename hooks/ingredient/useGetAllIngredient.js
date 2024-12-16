import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { getAllIngredients } from "@/redux/actions/ingredient";
import { ingredientActions } from "@/redux/slices/ingredientsSlice";

export const useGetAllIngredients = () => {
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.ingredient.getAllIngredients);
    const { toast } = useToast();

    const fetchIngredients = useCallback(() => {
        dispatch(getAllIngredients());
    }, [dispatch]);

    useEffect(() => {
        if (status === "failed") {
            toast({
                title: "Error",
                description: error || "Failed to fetch ingredients.",
                variant: "destructive",
            });
            dispatch(ingredientActions.clearGetAllIngredientsError());
        }
    }, [status, error, dispatch, toast]);

    return {
        ingredients: data?.ingredients || [],
        loading: status === "pending",
        getAllIngredients: fetchIngredients
    };
};
