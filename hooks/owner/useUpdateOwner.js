import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { ownerActions } from "@/redux/slices/ownerSlice";
import { updateOwner } from "@/redux/actions/auth";

export const useUpdateOwner = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.owner.updateOwner);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Owner updated successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(ownerActions.clearUpdateOwnerStats());
            setDialog(false) // to close dialog
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to update Owners.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(ownerActions.clearUpdateOwnerStats());
        }
    }, [status, error, dispatch, toast]);

    const handleUpdateOwner = (ownerId, data) => {
        console.log("hook-update-owner-req:" , ownerId , data);
        dispatch(updateOwner(ownerId, data));
    };

    return {loading, handleUpdateOwner};
};
