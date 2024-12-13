import { createSlice } from "@reduxjs/toolkit";

const initialOffer = {
    createOffer: {
        status: null,
        error: null,
        data: null,
    },

    getAllOffers: {
        status: null,
        error: null,
        data: null,
    },

    updateOffer: {
        status: null,
        error: null,
        data: null,
    },

    deleteOffer: {
        status: null,
        error: null,
        data: null,
    },
};

const offerSlice = createSlice({
    name: "offer",
    initialState: initialOffer,
    reducers: {
        // createOffer
        createOfferRequest: (state) => {
            state.createOffer.status = "pending";
        },
        createOfferSuccess: (state, action) => {
            state.createOffer.status = "success";
            state.createOffer.data = action.payload;
            state.getAllOffers.data.offers.push(action.payload.offer);

        },
        createOfferFailure: (state, action) => {
            state.createOffer.status = "failed";
            state.createOffer.error = action.payload;
        },

        // getAllOffers
        getAllOffersRequest: (state) => {
            state.getAllOffers.status = "pending";
        },
        getAllOffersSuccess: (state, action) => {
            state.getAllOffers.status = "success";
            state.getAllOffers.data = action.payload;
        },
        getAllOffersFailure: (state, action) => {
            state.getAllOffers.status = "failed";
            state.getAllOffers.error = action.payload;
        },

        // updateOffer
        updateOfferRequest: (state) => {
            state.updateOffer.status = "pending";
        },
        updateOfferSuccess: (state, action) => {
            state.updateOffer.status = "success";
            state.updateOffer.data = action.payload;
            state.getAllOffers.data.offers = state.getAllOffers.data.offers.map((offer) => {
                if (offer._id === action.payload.offer._id) {
                    return action.payload.offer;
                } else {
                    return offer;
                }
            });
        },
        updateOfferFailure: (state, action) => {
            state.updateOffer.status = "failed";
            state.updateOffer.error = action.payload;
        },

        // deleteOffer
        deleteOfferRequest: (state) => {
            state.deleteOffer.status = "pending";
        },
        deleteOfferSuccess: (state, action) => {
            state.deleteOffer.status = "success";
            state.getAllOffers.data.offers = state.getAllOffers.data.offers.filter(
                (offer) => offer._id !== action.payload.offer
            );
        },
        deleteOfferFailure: (state, action) => {
            state.deleteOffer.status = "failed";
            state.deleteOffer.error = action.payload;
        },

        // Manual state cleaners
        clearGetAllOffersStatus : (state)=>{
            state.getAllOffers.status = null;
        },
        clearGetAllOffersError : (state)=>{
            state.getAllOffers.error = null;
        },

        clearCreateOfferStats: (state) => {
            state.createOffer.status = null;
            state.createOffer.error = null;
            state.createOffer.data = null;
        },


        clearUpdateOfferStats: (state) => {
            state.updateOffer.status = null;
            state.updateOffer.error = null;
            state.updateOffer.data = null;
        },

        clearDeleteOfferStats: (state) => {
            state.deleteOffer.status = null;
            state.deleteOffer.error = null;
            state.deleteOffer.data = null;
        },
    },
});

export const offerActions = offerSlice.actions;
export const offerReducer = offerSlice.reducer;
