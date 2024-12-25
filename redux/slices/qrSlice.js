import { createSlice } from "@reduxjs/toolkit";

const initialQr = {
    getQr: {
        status: null,
        error: null,
        data: null,
    },
};

const QrSlice = createSlice({
    name: "qr",
    initialState: initialQr,
    reducers: {
        getQrRequest: (state) => {
            state.getQr.status = "pending";
        },
        getQrSuccess: (state, action) => {
            state.getQr.status = "success";
            state.getQr.data = action.payload;
        },
        getQrFailure: (state, action) => {
            state.getQr.status = "failed";
            state.getQr.error = action.payload;
        },
        
        // Manual state cleaners
        clearGetQrsStatus : (state)=>{
            state.getQr.status = null;
        },
        clearGetQrsError : (state)=>{
            state.getQr.error = null;
        },

    },
});

export const QrActions = QrSlice.actions;
export const QrReducer = QrSlice.reducer;
