import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN's toast hook

import {updateTable } from "@/redux/actions/table";
import { tableActions } from "@/redux/slices/tableSlice";

export const useUpdateTable = (setDialog) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector((state) => state.table.updateTable);
    const { toast } = useToast();

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setLoading(false);
            toast({
                title: "Success",
                description: "Table updated successfully.",
                variant: "success", // Optional, for success styling
            });
            dispatch(tableActions.clearUpdateTableStats());
            setDialog(false) // to close dialog
        } else if (status === "failed") {
            setLoading(false);
            toast({
                title: "Error",
                description: error || "Failed to update Tables.",
                variant: "destructive", // Optional, for error styling
            });
            dispatch(tableActions.clearUpdateTableStats());
            setDialog(false) // to close dialog

        }
    }, [status, error, dispatch, toast]);

    const handleUpdateTable = (tableId, data) => {
        console.log("hook-update-table-req:" , tableId , data);
        dispatch(updateTable(tableId, data));
    };

    return {loading, handleUpdateTable};
};
