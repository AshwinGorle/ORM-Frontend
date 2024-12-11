import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { deleteCategory } from "@/redux/actions/category";
import { categoryActions } from "@/redux/slices/categorySlice";

export const useDeleteCategory = (setDialog) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.category.deleteCategory);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Category deleted successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(categoryActions.clearDeleteCategoryStats());
            setDialog(false); // Close the dialog
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to delete category.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(categoryActions.clearDeleteCategoryStats());
            setDialog(false); // Close the dialog
        }
    }, [status, error, dispatch, toast]);

    const handleDeleteCategory = (categoryId) => {
        console.log("hook-delete-category-req:", categoryId);
        dispatch(deleteCategory(categoryId));
    };

    return { loading, handleDeleteCategory };
};
