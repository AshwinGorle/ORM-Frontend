import { createSlice } from "@reduxjs/toolkit";

const initialDish = {
    createDish: {
        status: null,
        error: null,
        data: null,
    },

    getAllDishes: {
        status: null,
        error: null,
        data: null,
    },

    getDish: {
        status: null,
        error: null,
        data: null,
    },

    updateDish: {
        status: null,
        error: null,
        data: null,
    },

    deleteDish: {
        status: null,
        error: null,
        data: null,
    },

    removeOffer : {
        status: null,
        error: null,
        data: null,
    }
};

const dishSlice = createSlice({
    name: "dish",
    initialState: initialDish,
    reducers: {
        // createDish
        createDishRequest: (state) => {
            state.createDish.status = "pending";
        },
        createDishSuccess: (state, action) => {
            state.createDish.status = "success";
            state.createDish.data = action.payload;
            if(!state?.getAllDishes?.data?.dishes) state.getAllDishes.data = {dishes:[]};
            state.getAllDishes.data.dishes.push(action.payload.dish);
        },
        createDishFailure: (state, action) => {
            state.createDish.status = "failed";
            state.createDish.error = action.payload;
        },

        // getAllDishes
        getAllDishesRequest: (state) => {
            state.getAllDishes.status = "pending";
        },
        getAllDishesSuccess: (state, action) => {
            state.getAllDishes.status = "success";
            state.getAllDishes.data = action.payload;
        },
        getAllDishesFailure: (state, action) => {
            state.getAllDishes.status = "failed";
            state.getAllDishes.error = action.payload;
        },

        // getDish
        getDishRequest: (state) => {
            state.getDish.status = "pending";
        },
        getDishSuccess: (state, action) => {
            state.getDish.stat = "success";
            state.getDish.data = action.payload;
        },
        getDishFailure: (state, action) => {
            state.getDish.status = "failed";
            state.getDish.error = action.payload;
        },

        // updateDish
        updateDishRequest: (state) => {
            state.updateDish.status = "pending";
        },
        updateDishSuccess: (state, action) => {
            state.updateDish.status = "success";
            state.updateDish.data = action.payload;
            state.getDish.data = action.payload;
            if(!state?.getAllDishes?.data?.dishes){
                state.getAllDishes.data = {dishes :[]};
                state.getAllDishes.data.dishes.push(action.payload.dish)
            } else{
                state.getAllDishes.data.dishes = state.getAllDishes.data.dishes.map((dish) => {
                    if (dish._id === action.payload.dish._id) {
                        return action.payload.dish;
                    } else {
                        return dish;
                    }
                });
            }
        },
        updateDishFailure: (state, action) => {
            state.updateDish.status = "failed";
            state.updateDish.error = action.payload;
        },

        // removeOffer
        removeOfferRequest: (state) => {
            state.removeOffer.status = "pending";
        },
        removeOfferSuccess: (state, action) => {
            state.removeOffer.status = "success";
            state.removeOffer.data = action.payload;
            if(!state?.getAllDishes?.data?.dishes){
                state.getAllDishes.data = {dishes :[]};
                state.getAllDishes.data.dishes.push(action.payload.dish)
            } else{
                state.getAllDishes.data.dishes = state.getAllDishes.data.dishes.map((dish) => {
                    if (dish._id === action.payload.dish._id) {
                        return action.payload.dish;
                    } else {
                        return dish;
                    }
                });
            }
        },
        removeOfferFailure: (state, action) => {
            state.removeOffer.status = "failed";
            state.removeOffer.error = action.payload;
        },

        // deleteDish
        deleteDishRequest: (state) => {
            state.deleteDish.status = "pending";
        },
        deleteDishSuccess: (state, action) => {
            state.deleteDish.status = "success";
            state.getAllDishes.data.dishes = state.getAllDishes.data.dishes.filter(
                (dish) => dish._id !== action.payload.dish
            );
        },
        deleteDishFailure: (state, action) => {
            state.deleteDish.status = "failed";
            state.deleteDish.error = action.payload;
        },

        // Manual state cleaners
        clearGetAllDishesStatus : (state)=>{
            state.getAllDishes.status = null;
        },
        clearGetAllDishesError : (state)=>{
            state.getAllDishes.error = null;
        },

        clearGetDishStatus : (state)=>{
            state.getAllDishes.status = null;
        },
        clearGetDishError : (state)=>{
            state.getAllDishes.error = null;
        },


        clearCreateDishStats: (state) => {
            state.createDish.status = null;
            state.createDish.error = null;
            state.createDish.data = null;
        },


        clearUpdateDishStats: (state) => {
            state.updateDish.status = null;
            state.updateDish.error = null;
            state.updateDish.data = null;
        },

        clearRemoveOfferStats: (state) => {
            state.removeOffer.status = null;
            state.removeOffer.error = null;
            state.removeOffer.data = null;
        },

        clearDeleteDishStats: (state) => {
            state.deleteDish.status = null;
            state.deleteDish.error = null;
            state.deleteDish.data = null;
        },
    },
});

export const dishActions = dishSlice.actions;
export const dishReducer = dishSlice.reducer;
