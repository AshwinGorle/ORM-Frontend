import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
    getOwner : {
        status: null,
        error: null,
        data: null,
    },
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

    extendOwnerMembership: {
        status: null,
        error: null,
        data: null,
    },

    getOwner: {
        status: null,
        error: null,
        data: null,
    },

    updateOwner: {
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
            state.getAllOwners.data.hotelOwners =  state.getAllOwners.data.hotelOwners.map((owner)=>{
                if(owner._id == action.payload.hotelOwner._id) return action.payload.hotelOwner;
                else return owner; 
            })
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

        getOwnerRequest: (state) => {
            state.getOwner.status = "pending";
        },
        getOwnerSuccess: (state, action) => {
            state.getOwner.status = "success";
            state.getOwner.data = action.payload;
        },
        getOwnerFailure: (state, action) => {
            state.getOwner.status = "failed";
            state.getOwner.error = action.payload;
        },

        updateOwnerRequest: (state) => {
            state.updateOwner.status = "pending";
        },
        updateOwnerSuccess: (state, action) => {
            state.updateOwner.status = "success";
            state.updateOwner.data = action.payload;
        },
        updateOwnerFailure: (state, action) => {
            state.updateOwner.status = "failed";
            state.updateOwner.error = action.payload;
        },
        
        //extendOwnerMembership
        extendOwnerMembershipRequest: (state) => {
            state.extendOwnerMembership.status = "pending";
        },
        extendOwnerMembershipSuccess: (state, action) => {
            state.extendOwnerMembership.status = "success";
            state.extendOwnerMembership.data = action.payload;
            state.getAllOwners.data.hotelOwners =  state.getAllOwners.data.hotelOwners.map((owner)=>{
                if(owner._id == action.payload.updatedHotelOwner._id) return action.payload.updatedHotelOwner;
                else return owner; 
            })
            
        },
        extendOwnerMembershipFailure: (state, action) => {
            state.extendOwnerMembership.status = "failed";
            state.extendOwnerMembership.error = action.payload;
        },

        // Manual state cleaners
        clearApproveOwnerStats: (state) => {
            state.approveOwner.status = null;
            state.approveOwner.error = null;
            state.approveOwner.data = null;
        },

        clearUpdateOwnerStats: (state) => {
            state.updateOwner.status = null;
            state.updateOwner.error = null;
            state.updateOwner.data = null;
        },
        
        clearExtendOwnerMembershipStats: (state) => {
            state.extendOwnerMembership.status = null;
            state.extendOwnerMembership.error = null;
            state.extendOwnerMembership.data = null;
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
        
        //getAllOwners
        clearGetOwnerStatus: (state) => {
            state.getOwner.status = null;
        },
        clearGetOwnerData: (state) => {
            state.getOwner.data = null;
        },
        clearGetOwnerError: (state) => {
            state.getOwner.error = null;
        },

        // get owner profile
        clearGetOwnerStatus : (state)=>{
            state.getOwner.status = null
        },
        clearGetOwnerError : (state)=>{
            state.getOwner.status = null
        },
        clearGetOwnerData : (state)=>{
            state.getOwner.status = null
        }
    },
});

export const ownerActions = ownerSlice.actions;
export const ownerReducer = ownerSlice.reducer;
