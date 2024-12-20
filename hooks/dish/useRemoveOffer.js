import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { removeOffer } from "@/redux/actions/dish";
import { dishActions } from "@/redux/slices/dishSlice";

export const useRemoveOffer = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.dish.removeOffer);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "offer remove successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(dishActions.clearRemoveOfferStats());
            // setDialog(false) // to close dialog
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to remove offer.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(dishActions.clearRemoveOfferStats());
            // setDialog(false) // to close dialog

        }
    }, [status, error, dispatch, toast]);

    const handleRemoveOffer = (dishId) => {
        console.log("hook-remove-offer-dish-req:" , dishId );
        dispatch(removeOffer(dishId));
    };

    return {loading, handleRemoveOffer};
};
