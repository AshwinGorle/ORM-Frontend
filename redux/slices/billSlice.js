import { createSlice } from "@reduxjs/toolkit";

const initialBill = {
    createBill: {
        status: null,
        error: null,
        data: null,
    },

    getAllBills: {
        status: null,
        error: null,
        data: null,
    },

    updateBill: {
        status: null,
        error: null,
        data: null,
    },

    payBill: {
        status: null,
        error: null,
        data: null,
    },

    deleteBill: {
        status: null,
        error: null,
        data: null,
    },

    getTableBill: {
        status: null,
        error: null,
        data: null,
    },

    sendBillToEmail : {
        status: null,
        error: null,
        data: null,

    }
};

const billSlice = createSlice({
    name: "bill",
    initialState: initialBill,
    reducers: {
        // to send bill at email
        sendBillToEmailRequest: (state) => {
            state.sendBillToEmail.status = "pending";
        },
        sendBillToEmailSuccess: (state, action) => {
            state.sendBillToEmail.status = "success";
            state.sendBillToEmail.data = action.payload;
        },
        sendBillToEmailFailure: (state, action) => {
            state.sendBillToEmail.status = "failed";
            state.sendBillToEmail.error = action.payload;
        },

        clearSendBillToEmailStats : (state)=>{
            state.sendBillToEmail.status = null;
            state.sendBillToEmail.data = null;
            state.sendBillToEmail.error = null;
        },

        // createBill
        createBillRequest: (state) => {
            state.createBill.status = "pending";
        },
        createBillSuccess: (state, action) => {
            state.createBill.status = "success";
            state.createBill.data = action.payload;
            // state.getAllBills.data.bills =  state.getAllBills.data.bills.map((bill)=>{
            //     if(bill._id == action.payload.bill._id) return action.payload.bill
            //     else return bill
            // })
            if(!state?.getAllBills?.data?.bills) state.getAllBills.data = {bills:[]};
            state.getAllBills.data.bills.push(action.payload.bill);

        },
        createBillFailure: (state, action) => {
            state.createBill.status = "failed";
            state.createBill.error = action.payload;
        },

        // getAllBills
        getAllBillsRequest: (state) => {
            state.getAllBills.status = "pending";
        },
        getAllBillsSuccess: (state, action) => {
            action?.payload?.bills?.reverse();
            state.getAllBills.status = "success";
            state.getAllBills.data = action.payload;
        },
        getAllBillsFailure: (state, action) => {
            state.getAllBills.status = "failed";
            state.getAllBills.error = action.payload;
        },

        // getTableBill
        getTableBillRequest: (state) => {
            state.getTableBill.status = "pending";
        },
        getTableBillSuccess: (state, action) => {
            state.getTableBill.status = "success";
            state.getTableBill.data = action.payload;
            if(!state.getAllBills.data) state.getAllBills.data = {bills : []}
            state.getAllBills.data.bills = state.getAllBills.data.bills.filter((bill)=>bill?._id?.toString() != action.payload?.bill?._id?.toString());
            state.getAllBills.data.bills.unshift(action.payload.bill);
        },
        getTableBillFailure: (state, action) => {
            state.getTableBill.status = "failed";
            state.getTableBill.error = action.payload;
        },
        clearGetTableBillStatus : (state)=>{
            state.getTableBill.status = null;
        },
        clearGetTableBillError : (state)=>{
            state.getTableBill.error = null;
        },
        clearGetTableBillData : (state)=>{
            state.getTableBill.data = null;
        },



        // updateBill
        updateBillRequest: (state) => {
            state.updateBill.status = "pending";
        },
        updateBillSuccess: (state, action) => {
            state.updateBill.status = "success";
            state.updateBill.data = action.payload;
            state.getAllBills.data.bills = state.getAllBills.data.bills.map((bill) => {
                if (bill._id === action.payload.bill._id) {
                    return action.payload.bill;
                } else {
                    return bill;
                }
            });
            state.getTableBill.data = action.payload;
        },
        updateBillFailure: (state, action) => {
            state.updateBill.status = "failed";
            state.updateBill.error = action.payload;
        },

        payBillRequest: (state) => {
            state.payBill.status = "pending";
        },
        payBillSuccess: (state, action) => {
            console.log("payload success bill = ", action.payload
            )
         
            state.payBill.status = "success";
            state.payBill.data = action.payload;
            state.getAllBills.data.bills = state.getAllBills.data.bills.map((bill) => {
                if (bill._id === action.payload._id) {
                    return action.payload;
                } else {
                    return bill;
                }
            });
            state.payBill.data = action.payload
            state.getTableBill.data = {bill : action.payload}
        },
        payBillFailure: (state, action) => {
            state.payBill.status = "failed";
            state.payBill.error = action.payload;
        },

        // deleteBill
        deleteBillRequest: (state) => {
            state.deleteBill.status = "pending";
        },
        deleteBillSuccess: (state, action) => {
            state.deleteBill.status = "success";
            if (state.getAllBills.data && state.getAllBills.data.bills) {
                state.getAllBills.data.bills = state.getAllBills.data.bills.filter(
                    (bill) => bill._id.toString() != action.payload.bill._id.toString()
                );
            }
        },
        deleteBillFailure: (state, action) => {
            state.deleteBill.status = "failed";
            state.deleteBill.error = action.payload;
        },

        // Manual state cleaners
        clearGetAllBillsStatus : (state)=>{
            state.getAllBills.status = null;
        },
        clearGetAllBillsError : (state)=>{
            state.getAllBills.error = null;
        },

        clearCreateBillStats: (state) => {
            state.createBill.status = null;
            state.createBill.error = null;
            state.createBill.data = null;
        },


        clearUpdateBillStats: (state) => {
            state.updateBill.status = null;
            state.updateBill.error = null;
            state.updateBill.data = null;
        },
        clearPayBillStats: (state) => {
            state.updateBill.status = null;
            state.updateBill.error = null;
            state.updateBill.data = null;
        },

        clearDeleteBillStats: (state) => {
            state.deleteBill.status = null;
            state.deleteBill.error = null;
            state.deleteBill.data = null;
        },
    },
});

export const billActions = billSlice.actions;
export const billReducer = billSlice.reducer;
