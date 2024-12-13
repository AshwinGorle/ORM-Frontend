import axios from "axios";
import { categoryActions } from "@/redux/slices/categorySlice";
import { getActionErrorMessage } from "@/utils";
export const getAllCategories = () => async (dispatch) => {
    console.log("action-get-all-categories-req:");
    try {
        dispatch(categoryActions.getAllCategoriesRequest());
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/categories`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-get-all-categories-res:", data);
        if (status === "success") {
            dispatch(categoryActions.getAllCategoriesSuccess(data));
        } else {
            dispatch(categoryActions.getAllCategoriesFailure(message));
        }
    } catch (error) {
        console.log("action-get-all-categories-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(categoryActions.getAllCategoriesFailure(errorMessage));
    }
};

export const createCategory = (data) => async (dispatch) => {
    console.log("action-create-category-req:", data);
    try {
        dispatch(categoryActions.createCategoryRequest());
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/categories`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data: responseData } = response.data;
        console.log("action-create-category-res:", responseData);
        if (status === "success") {
            dispatch(categoryActions.createCategorySuccess(responseData));
        } else {
            dispatch(categoryActions.createCategoryFailure(message));
        }
    } catch (error) {
        console.log("action-create-category-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(categoryActions.createCategoryFailure(errorMessage));
    }
};

export const updateCategory = (categoryId, data) => async (dispatch) => {
    console.log("action-update-category-req:", data);
    try {
        dispatch(categoryActions.updateCategoryRequest());
        const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/categories/${categoryId}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data: responseData } = response.data;
        console.log("action-update-category-res:", responseData);
        if (status === "success") {
            dispatch(categoryActions.updateCategorySuccess(responseData));
        } else {
            dispatch(categoryActions.updateCategoryFailure(message));
        }
    } catch (error) {
        console.log("action-update-category-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(categoryActions.updateCategoryFailure(errorMessage));
    }
};

export const deleteCategory = (categoryId) => async (dispatch) => {
    console.log("action-delete-category-req:", categoryId);
    try {
        dispatch(categoryActions.deleteCategoryRequest());
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/categories/${categoryId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-delete-category-res:", data);
        if (status === "success") {
            dispatch(categoryActions.deleteCategorySuccess(data));
        } else {
            dispatch(categoryActions.deleteCategoryFailure(message));
        }
    } catch (error) {
        console.log("action-delete-category-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(categoryActions.deleteCategoryFailure(errorMessage));
    }
};