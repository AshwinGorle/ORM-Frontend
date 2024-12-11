import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { approveHotelOwner } from "@/redux/actions/owner";
import { ownerActions } from "@/redux/slices/ownerSlice";
import { createIngredient, deleteIngredient, updateIngredient } from "@/redux/actions/ingredient";
import { ingredientActions } from "@/redux/slices/ingredientsSlice";

export const useDeleteIngredient = (setDialog) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.ingredient.deleteIngredient);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Ingredient deleted successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(ingredientActions.clearDeleteIngredientStats());
            setDialog(false) // to close dialog
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to delete Ingredients.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(ingredientActions.clearDeleteIngredientStats());
            setDialog(false) // to close dialog

        }
    }, [status, error, dispatch, toast]);

    const handleDeleteIngredient = (ingredientId) => {
        console.log("hook-delete-ingredient-req:" , ingredientId);
        dispatch(deleteIngredient(ingredientId));
    };

    return {loading, handleDeleteIngredient};
};
