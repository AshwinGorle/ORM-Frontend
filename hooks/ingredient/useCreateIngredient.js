import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { approveHotelOwner } from "@/redux/actions/owner";
import { ownerActions } from "@/redux/slices/ownerSlice";

export const useCreateIngredient = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.owner.approveOwner);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Hotel Owner approved successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(ownerActions.clearApproveOwnerStats());
            setApprovingItemId(null);
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to approve Hotel Owner.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(ownerActions.clearApproveOwnerStats());
            setApprovingItemId(null);
        }
    }, [status, error, dispatch, toast]);

    const handleCreateIngredient = (hotelOwnerId) => {
        console.log("hook-approve-owner-req:", hotelOwnerId);
        dispatch(approveHotelOwner(hotelOwnerId));
    };

    return {loading, handleCreateIngredient};
};
