import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { approveHotelOwner } from "@/redux/actions/owner";
import { ownerActions } from "@/redux/slices/ownerSlice";
import { createIngredient, updateIngredient } from "@/redux/actions/ingredient";
import { ingredientActions } from "@/redux/slices/ingredientsSlice";

export const useUpdateIngredient = (setDialog) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.ingredient.updateIngredient);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Ingredient updated successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(ingredientActions.clearUpdateIngredientStats());
            setDialog(false) // to close dialog
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to update Ingredients.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(ingredientActions.clearUpdateIngredientStats());
            setDialog(false) // to close dialog

        }
    }, [status, error, dispatch, toast]);

    const handleUpdateIngredient = (ingredientId, data) => {
        console.log("hook-update-ingredient-req:" , ingredientId , data);
        dispatch(updateIngredient(ingredientId, data));
    };

    return {loading, handleUpdateIngredient};
};
