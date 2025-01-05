import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { createCategory } from "@/redux/actions/category";
import { categoryActions } from "@/redux/slices/categorySlice";

export const useCreateCategory = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.category.createCategory);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Category created successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(categoryActions.clearCreateCategoryStats());
            dispatch(categoryActions.setCreateCategoryPopup(false));
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to create Category.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(categoryActions.clearCreateCategoryStats());
            dispatch(categoryActions.setCreateCategoryPopup(false));

        }
    }, [status, error, dispatch, toast]);

    const handleCreateCategory = (data) => {
        console.log("hook-create-category-req:", data);
        dispatch(createCategory(data));
    };

    return { loading, handleCreateCategory };
};
