import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { approveHotelOwner } from "@/redux/actions/owner";
import { ownerActions } from "@/redux/slices/ownerSlice";
import { createDish, deleteDish, updateDish } from "@/redux/actions/dish";
import { dishActions } from "@/redux/slices/dishsSlice";

export const useDeleteDish = (setDialog) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.dish.deleteDish);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Dish deleted successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(dishActions.clearDeleteDishStats());
            setDialog(false) // to close dialog
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to delete Dishs.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(dishActions.clearDeleteDishStats());
            setDialog(false) // to close dialog

        }
    }, [status, error, dispatch, toast]);

    const handleDeleteDish = (dishId) => {
        console.log("hook-delete-dish-req:" , dishId);
        dispatch(deleteDish(dishId));
    };

    return {loading, handleDeleteDish};
};
