import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotelOwners } from "@/redux/actions/hotel";
import { useToast } from "@/hooks/use-toast";

export const useFetchHotelOwners = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.hotel.hotelOwners);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Hotel Owners fetched successfully.",
                variant: "success",
            });
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to fetch Hotel Owners.",
                variant: "destructive",
            });
        }
    }, [status, error, toast]);

    const handleFetchHotelOwners = () => {
        dispatch(fetchHotelOwners());
    };

    return { loading, data, handleFetchHotelOwners };
};
