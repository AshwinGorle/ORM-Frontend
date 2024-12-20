import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { updateOffer } from "@/redux/actions/offer";
import { offerActions } from "@/redux/slices/offerSlice";

export const useUpdateOffer = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.offer.updateOffer);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Offer updated successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(offerActions.clearUpdateOfferStats());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to update Offers.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(offerActions.clearUpdateOfferStats());

        }
    }, [status, error, dispatch, toast]);

    const handleUpdateOffer = (offerId, data) => {
        console.log("hook-update-offer-req:" , offerId , data);
        dispatch(updateOffer(offerId, data));
    };

    return {loading, handleUpdateOffer};
};
