import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { deleteOffer } from "@/redux/actions/offer";
import { offerActions } from "@/redux/slices/offerSlice";

export const useDeleteOffer = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.offer.deleteOffer);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Offer deleted successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(offerActions.clearDeleteOfferStats());
            dispatch(offerActions.closeDeleteOfferDialog());
            
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to delete Offers.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(offerActions.clearDeleteOfferStats());
            // to close dialog

        }
    }, [status, error, dispatch, toast]);

    const handleDeleteOffer = (offerId) => {
        console.log("hook-delete-offer-req:" , offerId);
        dispatch(deleteOffer(offerId));
    };

    return {loading, handleDeleteOffer};
};
