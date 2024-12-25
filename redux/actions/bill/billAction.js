import axios from "axios";
import { billActions } from "@/redux/slices/billSlice";
import { getActionErrorMessage } from "@/utils";
import { tableActions } from "@/redux/slices/tableSlice";

// Action to get all bills
export const getAllBills = () => async (dispatch) => {
    console.log("action-get-all-bills-req:");
    try {
        dispatch(billActions.getAllBillsRequest());
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/bills`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-get-all-bills-res:", data);
        if (status === "success") {
            dispatch(billActions.getAllBillsSuccess(data));
        } else {
            dispatch(billActions.getAllBillsFailure(message));
        }
    } catch (error) {
        console.log("action-get-all-bills-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(billActions.getAllBillsFailure(errorMessage));
    }
};

export const getTableBill = (tableId) => async (dispatch) => {
    console.log("action-get-Table-bill-req:");
    try {
        dispatch(billActions.getTableBillRequest());
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/tables/bill/${tableId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-get-Table-bill-res:", data);
        if (status === "success") {
            dispatch(billActions.getTableBillSuccess(data));
        } else {
            dispatch(billActions.getTableBillFailure(message));
        }
    } catch (error) {
        console.log("action-get-all-bills-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(billActions.getTableBillFailure(errorMessage));
    }
};



// Action to update an bill
export const updateBill = (billId, billData) => async (dispatch) => {
    console.log("action-update-bill-req:", billId, billData);
    try {
        dispatch(billActions.updateBillRequest());
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/bills/${billId}`,
            billData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-update-bill-res:", data);
        if (status === "success") {
            dispatch(billActions.updateBillSuccess(data));
        } else {
            dispatch(billActions.updateBillFailure(message));
        }
    } catch (error) {
        console.log("action-update-bill-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(billActions.updateBillFailure(errorMessage));
    }
};
// Action to Pay an bill
export const payBill = (billId) => async (dispatch) => {
    console.log("action-pay-bill-req:", billId);
    try {
        dispatch(billActions.payBillRequest());
        const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/bills/paid/${billId}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-pay-bill-res:", data);
        if (status === "success") {
            dispatch(billActions.payBillSuccess(data.bill));
            if(data.table) dispatch(tableActions.insertUpdatedTable(data.table));
        } else {
            dispatch(billActions.payBillFailure(message));
        }
    } catch (error) {
        console.log("action-pay-bill-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(billActions.payBillFailure(errorMessage));
    }
};


// Action to create a new bill
export const createBill = (billData) => async (dispatch) => {
    console.log("action-create-bill-req:", billData);
    try {
        dispatch(billActions.createBillRequest());
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/bills`,
            billData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-create-bill-res:", data);
        if (status === "success") {
            dispatch(billActions.createBillSuccess(data));
        } else {
            dispatch(billActions.createBillFailure(message));
        }
    } catch (error) {
        console.log("action-create-bill-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(billActions.createBillFailure(errorMessage));
    }
};

// Action to delete an bill
export const deleteBill = (billId) => async (dispatch) => {
    console.log("action-delete-bill-req:", billId);
    try {
        dispatch(billActions.deleteBillRequest());
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/bills/${billId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-delete-bill-res:", data);
        if (status === "success") {
            dispatch(billActions.deleteBillSuccess({ deletedBillId: billId }));
        } else {
            dispatch(billActions.deleteBillFailure(message));
        }
    } catch (error) {
        console.log("action-delete-bill-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(billActions.deleteBillFailure(errorMessage));
    }

};


