import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook
import { createTable } from "@/redux/actions/table";
import { tableActions } from "@/redux/slices/tableSlice";

export const useCreateTable = (handleClose) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.table.createTable);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Table added successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(tableActions.clearCreateTableStats());
            handleClose() // to close dialog
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to add Tables.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(tableActions.clearCreateTableStats());
            handleClose() // to close dialog

        }
    }, [status, error, dispatch, toast]);

    const handleCreateTable = (data) => {
        console.log("hook-create-table-req:", data);
        dispatch(createTable(data));
    };

    return {loading, handleCreateTable};
};
