import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHotels } from "@/redux/actions/hotel";
import { useToast } from "@/hooks/use-toast";

export const useFetchAllHotels = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.hotel.allHotels);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "All Hotels fetched successfully.",
                variant: "success",
            });
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to fetch Hotels.",
                variant: "destructive",
            });
        }
    }, [status, error, toast]);

    const handleFetchAllHotels = () => {
        dispatch(fetchAllHotels());
    };

    return { loading, data, handleFetchAllHotels };
};
