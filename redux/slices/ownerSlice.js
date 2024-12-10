import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
    approveOwner: {
        status: null,
        error: null,
        data: null,
    },

    getAllOwners: {
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

        //getAllOwners
        getAllOwnersRequest: (state) => {
            state.getAllOwners.status = "pending";
        },
        getAllOwnersSuccess: (state, action) => {
            state.getAllOwners.status = "success";
            state.getAllOwners.data = action.payload;
        },
        getAllOwnersFailure: (state, action) => {
            state.getAllOwners.status = "failed";
            state.getAllOwners.error = action.payload;
        },

        // Manual state cleaners
        clearApproveOwnerStats: (state) => {
            state.approveOwner.status = null;
            state.approveOwner.error = null;
            state.approveOwner.data = null;
        },
        //getAllOwners
        clearGetAllOwnersStatus: (state) => {
            state.getAllOwners.status = null;
        },
        clearGetAllOwnersData: (state) => {
            state.getAllOwners.data = null;
        },
        clearGetAllOwnersError: (state) => {
            state.getAllOwners.error = null;
        },
    },
});

export const ownerActions = ownerSlice.actions;
export const ownerReducer = ownerSlice.reducer;
