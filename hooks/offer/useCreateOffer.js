import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { createOffer } from "@/redux/actions/offer";
import { offerActions } from "@/redux/slices/offerSlice";

export const useCreateOffer = (setOpen) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.offer.createOffer);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Offer added successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(offerActions.clearCreateOfferStats());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to add Offers.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(offerActions.clearCreateOfferStats());
        }
    }, [status, error, dispatch, toast]);

    const handleCreateOffer = (data) => {
        console.log("hook-create-offer-req:", data);
        dispatch(createOffer(data));
    };

    return {loading, handleCreateOffer};
};
