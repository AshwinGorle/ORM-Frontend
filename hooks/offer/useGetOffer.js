import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { offerActions } from "@/redux/slices/offerSlice";
import { getOffer } from "@/redux/actions/offer";
export const useGetOffer = (offerId) => {
    const params = {}
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { refresh = false, setRefresh = null } = params;

    const { status, error, data } = useSelector((state) => state.offer.getOffer); // Directly use this
    const { toast } = useToast();

    const fetchAllOffers = useCallback(() => {
        if (!data || data?.offer?._id?.toString() != offerId) {
            dispatch(getOffer(offerId));
        }
    }, [dispatch, data, refresh]);

    useEffect(() => {
        fetchAllOffers();
    }, [fetchAllOffers]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Offers fetched successfully.",
                variant: "success",
            });
            dispatch(offerActions.clearGetOfferError());
            dispatch(offerActions.clearGetOfferStatus());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to Fetch Offers.",
                variant: "destructive",
            });
            dispatch(offerActions.clearGetOfferError());
            dispatch(offerActions.clearGetOfferStatus());
        }
    }, [status, data, error, dispatch, toast, setRefresh]);

    const transformedOffer = useMemo(() => {
        return data?.offer || null;
    }, [data]);

    return { offer: transformedOffer, loading };
};
