import { createSlice } from "@reduxjs/toolkit";

const initialCategory = {
    createCategory: {
        status: null,
        error: null,
        data: null,
    },

    getAllCategories: {
        status: null,
        error: null,
        data: null,
    },

    updateCategory: {
        status: null,
        error: null,
        data: null,
    },

    deleteCategory: {
        status: null,
        error: null,
        data: null,
    },

    openCreateCategoryPopup : false
};

const categorySlice = createSlice({
    name: "category",
    initialState: initialCategory,
    reducers: {
        // create category popup
        setCreateCategoryPopup : (state, action) => {
            console.log("set : ", state.openCreateCategoryPopup )
            state.openCreateCategoryPopup = action.payload;
        },
        // createCategory
        createCategoryRequest: (state) => {
            state.createCategory.status = "pending";
        },
        createCategorySuccess: (state, action) => {
            state.createCategory.status = "success";
            state.createCategory.data = action.payload;
            if(!state?.getAllCategories?.data?.categories) state.getAllCategories.data = {categories:[]};
            state.getAllCategories.data.categories.push(action.payload.category);
        },
        createCategoryFailure: (state, action) => {
            state.createCategory.status = "failed";
            state.createCategory.error = action.payload;
        },

        // getAllCategories
        getAllCategoriesRequest: (state) => {
            state.getAllCategories.status = "pending";
        },
        getAllCategoriesSuccess: (state, action) => {
            state.getAllCategories.status = "success";
            state.getAllCategories.data = action.payload;
        },
        getAllCategoriesFailure: (state, action) => {
            state.getAllCategories.status = "failed";
            state.getAllCategories.error = action.payload;
        },

        // updateCategory
        updateCategoryRequest: (state) => {
            state.updateCategory.status = "pending";
        },
        updateCategorySuccess: (state, action) => {
            state.updateCategory.status = "success";
            state.updateCategory.data = action.payload;
            state.getAllCategories.data.categories = state.getAllCategories.data.categories.map((category) => {
                if (category._id === action.payload.category._id) {
                    return action.payload.category;
                } else {
                    return category;
                }
            });
        },
        updateCategoryFailure: (state, action) => {
            state.updateCategory.status = "failed";
            state.updateCategory.error = action.payload;
        },

        // deleteCategory
        deleteCategoryRequest: (state) => {
            state.deleteCategory.status = "pending";
        },
        deleteCategorySuccess: (state, action) => {
            state.deleteCategory.status = "success";
            state.getAllCategories.data.categories = state.getAllCategories.data.categories.filter(
                (category) => category._id !== action.payload.category._id
            );
        },
        deleteCategoryFailure: (state, action) => {
            state.deleteCategory.status = "failed";
            state.deleteCategory.error = action.payload;
        },

        // Manual state cleaners
        clearGetAllCategoriesStatus: (state) => {
            state.getAllCategories.status = null;
        },
        clearGetAllCategoriesError: (state) => {
            state.getAllCategories.error = null;
        },

        clearCreateCategoryStats: (state) => {
            state.createCategory.status = null;
            state.createCategory.error = null;
            state.createCategory.data = null;
        },

        clearUpdateCategoryStats: (state) => {
            state.updateCategory.status = null;
            state.updateCategory.error = null;
            state.updateCategory.data = null;
        },

        clearDeleteCategoryStats: (state) => {
            state.deleteCategory.status = null;
            state.deleteCategory.error = null;
            state.deleteCategory.data = null;
        },
    },
});

export const categoryActions = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
