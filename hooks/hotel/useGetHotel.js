import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { hotelActions } from "@/redux/slices/hotelSlice";
import { getHotel } from "@/redux/actions/hotel/hotelAction";

export const useGetHotel = (hotelId) => {
    console.log("useGetHotel hotelId --------", hotelId)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    // const { refresh = false, setRefresh = null } = params;

    const { status, error, data } = useSelector((state) => state.hotel.getHotel); // Directly use this
    const { toast } = useToast();
     //!data || data?.hotel?._id?.toString() != hotelId
     const fetchHotel = useCallback(() => {
        // Check if hotelId is valid and if we need to fetch data
        if (
            hotelId && 
            (!data || data?.hotel?._id?.toString() !== hotelId.toString())
        ) {
            console.log("Calling getHotel with hotelId:", hotelId);
            dispatch(getHotel(hotelId));
        }
    }, [dispatch, data, hotelId]);

    useEffect(() => {
        fetchHotel();
    }, [fetchHotel, hotelId]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            // setRefresh && setRefresh(false);
            toast({
                title: "Success",
                description: "hotel fetched successfully.",
                variant: "success",
            });
            dispatch(hotelActions.clearGetHotelStatus());
            dispatch(hotelActions.clearGetHotelError());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to Fetch hotel.",
                variant: "destructive",
            });
            dispatch(hotelActions.clearGetHotelStatus());
            dispatch(hotelActions.clearGetHotelError());
        }
    }, [status, data, error, dispatch, toast]);

    const transformedHotel = useMemo(() => {
        return data?.hotel || null;
    }, [data]);

    return { hotel: transformedHotel, loading };
};
