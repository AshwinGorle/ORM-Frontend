import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { createUpload } from "@/redux/actions/upload";
import { uploadActions } from "@/redux/slices/uploadSlice";

export const useCreateUpload = (setImageUrl) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.upload.createUpload);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Upload added successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(uploadActions.clearCreateUploadStats());
            setImageUrl(data.url);
           
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to add Uploads.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(uploadActions.clearCreateUploadStats());

        }
    }, [status, error, dispatch, toast]);

    const handleCreateUpload = (data) => {
        console.log("hook-create-upload-req:", data);
        dispatch(createUpload(data));
    };

    return {data, loading, handleCreateUpload};
};
