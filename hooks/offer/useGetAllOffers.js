import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { offerActions } from "@/redux/slices/offerSlice";
import { getAllOffers } from "@/redux/actions/offer"; // Ensure this matches your action import

export const useGetAllOffers = (type = "offer") => {
    const params = {}
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { refresh = false, setRefresh = null } = params;

    const { status, error, data } = useSelector((state) => state.offer.getAllOffers); // Directly use this
    const { toast } = useToast();

    const fetchAllOffers = useCallback(() => {
        console.log("checking -----", type)
        if (type == 'offer' && (!data || refresh)) {
            dispatch(getAllOffers());
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
            setRefresh && setRefresh(false);
            toast({
                title: "Success",
                description: "Offers fetched successfully.",
                variant: "success",
            });
            dispatch(offerActions.clearGetAllOffersStatus());
            dispatch(offerActions.clearGetAllOffersError());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to Fetch Offers.",
                variant: "destructive",
            });
            dispatch(offerActions.clearGetAllOffersStatus());
            dispatch(offerActions.clearGetAllOffersError());
        }
    }, [status, data, error, dispatch, toast, setRefresh]);

    const transformedOffers = useMemo(() => {
        return data?.offers || [];
    }, [data]);

    return { offers: transformedOffers, loading };
};
