import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { createDish, updateDish } from "@/redux/actions/dish";
import { dishActions } from "@/redux/slices/dishSlice";

export const useUpdateDish = (setDialog) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.dish.updateDish);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Dish updated successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(dishActions.clearUpdateDishStats());
            setDialog(false) // to close dialog
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to update Dishs.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(dishActions.clearUpdateDishStats());
            setDialog(false) // to close dialog

        }
    }, [status, error, dispatch, toast]);

    const handleUpdateDish = (dishId, data) => {
        console.log("hook-update-dish-req:" , dishId , data);
        dispatch(updateDish(dishId, data));
    };

    return {loading, handleUpdateDish};
};
