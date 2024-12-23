import { createSlice } from "@reduxjs/toolkit";

const initialDashboard = {
    getDashboard: {
        status: null,
        error: null,
        data: null,
    },
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: initialDashboard,
    reducers: {
        getDashboardRequest: (state) => {
            state.getDashboard.status = "pending";
        },
        getDashboardSuccess: (state, action) => {
            state.getDashboard.status = "success";
            state.getDashboard.data = action.payload;
        },
        getDashboardFailure: (state, action) => {
            state.getDashboard.status = "failed";
            state.getDashboard.error = action.payload;
        },
        clearDashboardStats: (state) => {
            state.getDashboard.status = null;
            state.getDashboard.error = null;
        },
    },
});

export const dashboardActions = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
