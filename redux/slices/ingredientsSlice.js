import { createSlice } from "@reduxjs/toolkit";

const initialIngredient = {
    createIngredient: {
        status: null,
        error: null,
        data: null,
    },

    getAllIngredients: {
        status: null,
        error: null,
        data: null,
    },

    updateIngredient: {
        status: null,
        error: null,
        data: null,
    },

    deleteIngredient: {
        status: null,
        error: null,
        data: null,
    },

    openCreateIngredientPopup : false
};

const ingredientSlice = createSlice({
    name: "ingredient",
    initialState: initialIngredient,
    reducers: {
        // create ingredient popup
        setCreateIngredientPopup : (state, action)=>{
            console.log("set : ",state.createIngredientPopup)
            state.openCreateIngredientPopup = action.payload;
        },
        // createIngredient
        createIngredientRequest: (state) => {
            state.createIngredient.status = "pending";
        },
        createIngredientSuccess: (state, action) => {
            state.createIngredient.status = "success";
            state.createIngredient.data = action.payload;
            // state.getAllIngredients.data.ingredients =  state.getAllIngredients.data.ingredients.map((ingredient)=>{
            //     if(ingredient._id == action.payload.ingredient._id) return action.payload.ingredient
            //     else return ingredient
            // })
            if(!state?.getAllIngredients?.data?.ingredients) state.getAllIngredients.data = {ingredients:[]};
            state.getAllIngredients.data.ingredients.push(action.payload.ingredient);

        },
        createIngredientFailure: (state, action) => {
            state.createIngredient.status = "failed";
            state.createIngredient.error = action.payload;
        },

        // getAllIngredients
        getAllIngredientsRequest: (state) => {
            state.getAllIngredients.status = "pending";
        },
        getAllIngredientsSuccess: (state, action) => {
            state.getAllIngredients.status = "success";
            state.getAllIngredients.data = action.payload;
        },
        getAllIngredientsFailure: (state, action) => {
            state.getAllIngredients.status = "failed";
            state.getAllIngredients.error = action.payload;
        },

        // updateIngredient
        updateIngredientRequest: (state) => {
            state.updateIngredient.status = "pending";
        },
        updateIngredientSuccess: (state, action) => {
            state.updateIngredient.status = "success";
            state.updateIngredient.data = action.payload;
            state.getAllIngredients.data.ingredients = state.getAllIngredients.data.ingredients.map((ingredient) => {
                if (ingredient._id === action.payload.ingredient._id) {
                    return action.payload.ingredient;
                } else {
                    return ingredient;
                }
            });
        },
        updateIngredientFailure: (state, action) => {
            state.updateIngredient.status = "failed";
            state.updateIngredient.error = action.payload;
        },

        // deleteIngredient
        deleteIngredientRequest: (state) => {
            state.deleteIngredient.status = "pending";
        },
        deleteIngredientSuccess: (state, action) => {
            state.deleteIngredient.status = "success";
            if (state.getAllIngredients.data && state.getAllIngredients.data.ingredients) {
                state.getAllIngredients.data.ingredients = state.getAllIngredients.data.ingredients.filter(
                    (ingredient) => ingredient._id !== action.payload.ingredient
                );
            }
        },
        deleteIngredientFailure: (state, action) => {
            state.deleteIngredient.status = "failed";
            state.deleteIngredient.error = action.payload;
        },

        // Manual state cleaners
        clearGetAllIngredientsStatus : (state)=>{
            state.getAllIngredients.status = null;
        },
        clearGetAllIngredientsError : (state)=>{
            state.getAllIngredients.error = null;
        },

        clearCreateIngredientStats: (state) => {
            state.createIngredient.status = null;
            state.createIngredient.error = null;
            state.createIngredient.data = null;
        },


        clearUpdateIngredientStats: (state) => {
            state.updateIngredient.status = null;
            state.updateIngredient.error = null;
            state.updateIngredient.data = null;
        },

        clearDeleteIngredientStats: (state) => {
            state.deleteIngredient.status = null;
            state.deleteIngredient.error = null;
            state.deleteIngredient.data = null;
        },
    },
});

export const ingredientActions = ingredientSlice.actions;
export const ingredientReducer = ingredientSlice.reducer;
