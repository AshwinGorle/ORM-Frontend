import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { approveHotelOwner } from "@/redux/actions/owner";
import { ownerActions } from "@/redux/slices/ownerSlice";
import { createIngredient } from "@/redux/actions/ingredient";
import { ingredientActions } from "@/redux/slices/ingredientsSlice";

export const useCreateIngredient = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.ingredient.createIngredient);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Ingredient added successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(ingredientActions.clearCreateIngredientStats());
            dispatch(ingredientActions.setCreateIngredientPopup(false));
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to add Ingredients.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(ingredientActions.clearCreateIngredientStats());
            dispatch(ingredientActions.setCreateIngredientPopup(false));
        }
    }, [status, error, dispatch, toast]);

    const handleCreateIngredient = (data) => {
        console.log("hook-create-ingredient-req:", data);
        dispatch(createIngredient(data));
    };

    return {loading, handleCreateIngredient};
};
