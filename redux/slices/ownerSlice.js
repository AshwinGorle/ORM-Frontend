import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
    approveOwner: {
        status: null,
        error: null,
        data: null,
    },
};

const ownerSlice = createSlice({
    name: "owner",
    initialState: initialUser,
    reducers: {
        approveOwnerRequest: (state) => {
            state.approveOwner.status = "pending";
        },
        approveOwnerSuccess: (state, action) => {
            state.approveOwner.status = "success";
            state.approveOwner.data = action.payload;
        },
        approveOwnerFailure: (state, action) => {
            state.approveOwner.status = "failed";
            state.approveOwner.error = action.payload;
        },

        // Manual state cleaners
        clearApproveOwnerStatus: (state) => {
            state.approveOwner.status = null;
        },
        clearApproveOwnerError: (state) => {
            state.approveOwner.error = null;
        },
        clearApproveOwnerData: (state) => {
            state.approveOwner.data = null;
        },
    },
});

export const ownerActions = ownerSlice.actions;
export const ownerReducer = ownerSlice.reducer;
