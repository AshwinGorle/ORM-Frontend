import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { createDish } from "@/redux/actions/dish";
import { dishActions } from "@/redux/slices/dishSlice";

export const useCreateDish = (setOpen) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.dish.createDish);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Dish added successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(dishActions.clearCreateDishStats());
            setOpen(false) // to close dialog
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to add Dishs.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(dishActions.clearCreateDishStats());
            setOpen(false) // to close dialog

        }
    }, [status, error, dispatch, toast]);

    const handleCreateDish = (data) => {
        console.log("hook-create-dish-req:", data);
        dispatch(createDish(data));
    };

    return {loading, handleCreateDish};
};
