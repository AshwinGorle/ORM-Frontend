import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { updateCategory } from "@/redux/actions/category";
import { categoryActions } from "@/redux/slices/categorySlice";

export const useUpdateCategory = (setDialog) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.category.updateCategory);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Category updated successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(categoryActions.clearUpdateCategoryStats());
            setDialog(false); // Close the dialog/modal
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to update category.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(categoryActions.clearUpdateCategoryStats());
            setDialog(false); // Close the dialog/modal
        }
    }, [status, error, dispatch, toast]);

    const handleUpdateCategory = (categoryId, data) => {
        console.log("hook-update-category-req:", data);
        dispatch(updateCategory(categoryId, data));
    };

    return { loading, handleUpdateCategory };
};
