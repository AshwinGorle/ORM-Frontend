import axios from "axios";
import { tableActions } from "@/redux/slices/tablesSlice";
import { getActionErrorMessage } from "@/utils";

// Action to get all tables
export const getAllTables = () => async (dispatch) => {
    console.log("action-get-all-tables-req:");
    try {
        dispatch(tableActions.getAllTablesRequest());
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/tables`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-get-all-tables-res:", data);
        if (status === "success") {
            dispatch(tableActions.getAllTablesSuccess(data));
        } else {
            dispatch(tableActions.getAllTablesFailure(message));
        }
    } catch (error) {
        console.log("action-get-all-tables-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(tableActions.getAllTablesFailure(errorMessage));
    }
};

// Action to update an table
export const updateTable = (tableId, tableData) => async (dispatch) => {
    console.log("action-update-table-req:", tableId);
    try {
        dispatch(tableActions.updateTableRequest());
        const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/tables/${tableId}`,
            { name : tableData.name, description : tableData.description},
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-update-table-res:", data);
        if (status === "success") {
            dispatch(tableActions.updateTableSuccess(data));
        } else {
            dispatch(tableActions.updateTableFailure(message));
        }
    } catch (error) {
        console.log("action-update-table-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(tableActions.updateTableFailure(errorMessage));
    }
};


// Action to create a new table
export const createTable = (tableData) => async (dispatch) => {
    console.log("action-create-table-req:", tableData);
    try {
        dispatch(tableActions.createTableRequest());
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/tables`,
            tableData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-create-table-res:", data);
        if (status === "success") {
            dispatch(tableActions.createTableSuccess(data));
        } else {
            dispatch(tableActions.createTableFailure(message));
        }
    } catch (error) {
        console.log("action-create-table-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(tableActions.createTableFailure(errorMessage));
    }
};

// Action to delete an table
export const deleteTable = (tableId) => async (dispatch) => {
    console.log("action-delete-table-req:", tableId);
    try {
        dispatch(tableActions.deleteTableRequest());
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/tables/${tableId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-delete-table-res:", data);
        if (status === "success") {
            dispatch(tableActions.deleteTableSuccess({ deletedTableId: tableId }));
        } else {
            dispatch(tableActions.deleteTableFailure(message));
        }
    } catch (error) {
        console.log("action-delete-table-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(tableActions.deleteTableFailure(errorMessage));
    }
};
