import { createSlice } from "@reduxjs/toolkit";

const initialHotelState = {
    hotelOwners: {
        status: null,
        error: null,
        data: null,
    },
    allHotels: {
        status: null,
        error: null,
        data: null,
    },
    updateHotel: {
        status: null,
        error: null,
        data: null,
    },
};

const hotelSlice = createSlice({
    name: "hotel",
    initialState: initialHotelState,
    reducers: {
        // Hotel Owners Actions
        fetchHotelOwnersRequest: (state) => {
            state.hotelOwners.status = "pending";
        },
        fetchHotelOwnersSuccess: (state, action) => {
            state.hotelOwners.status = "success";
            state.hotelOwners.data = action.payload;
        },
        fetchHotelOwnersFailure: (state, action) => {
            state.hotelOwners.status = "failed";
            state.hotelOwners.error = action.payload;
        },

        // All Hotels Actions
        fetchAllHotelsRequest: (state) => {
            state.allHotels.status = "pending";
        },
        fetchAllHotelsSuccess: (state, action) => {
            state.allHotels.status = "success";
            state.allHotels.data = action.payload;
        },
        fetchAllHotelsFailure: (state, action) => {
            state.allHotels.status = "failed";
            state.allHotels.error = action.payload;
        },

        //Update Hotel
        updateHotelRequest: (state) => {
            state.updateHotel.status = "pending";
        },
        updateHotelSuccess: (state, action) => {
            state.updateHotel.status = "success";
            state.updateHotel.data = action.payload;
        },
        updateHotelFailure: (state, action) => {
            state.updateHotel.status = "failed";
            state.updateHotel.error = action.payload;
        },

        // Manual State Cleaners
        clearHotelOwnersState: (state) => {
            state.hotelOwners.status = null;
            state.hotelOwners.error = null;
            state.hotelOwners.data = null;
        },
        clearAllHotelsState: (state) => {
            state.allHotels.status = null;
            state.allHotels.error = null;
            state.allHotels.data = null;
        },
        clearUpdateHotelState: (state) => {
            state.updateHotel.status = null;
            state.updateHotel.error = null;
            state.updateHotel.data = null;
        },
    },
});

export const hotelActions = hotelSlice.actions;
export const hotelReducer = hotelSlice.reducer;
