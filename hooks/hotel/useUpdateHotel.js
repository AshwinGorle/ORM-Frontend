import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // ShadCN toast hook
import { updateHotel } from "@/redux/actions/hotel/hotelAction";
import { hotelActions } from "@/redux/slices/hotelSlice";

export const useUpdateHotel = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.hotel.updateHotel);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Hotel updated successfully.",
                variant: "success",
            });
            dispatch(hotelActions.clearUpdateHotelState());
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to update hotel.",
                variant: "destructive",
            });
            dispatch(hotelActions.clearUpdateHotelState());
        }
    }, [status, error, dispatch, toast]);

    const handleUpdateHotel = (hotelId, updateData) => {
        console.log("hook-update-hotel-req:", { hotelId, updateData });
        dispatch(updateHotel(hotelId, updateData));
    };

    return { loading, handleUpdateHotel };
};
