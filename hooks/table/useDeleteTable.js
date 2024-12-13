import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { deleteTable} from "@/redux/actions/table";
import { tableActions } from "@/redux/slices/tablesSlice";

export const useDeleteTable = (setDialog) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.table.deleteTable);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Table deleted successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(tableActions.clearDeleteTableStats());
            setDialog(false) // to close dialog
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to delete Tables.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(tableActions.clearDeleteTableStats());
            setDialog(false) // to close dialog

        }
    }, [status, error, dispatch, toast]);

    const handleDeleteTable = (tableId) => {
        console.log("hook-delete-table-req:" , tableId);
        dispatch(deleteTable(tableId));
    };

    return {loading, handleDeleteTable};
};
