import axios from "axios";
import { dishActions } from "@/redux/slices/dishSlice";
import { getActionErrorMessage } from "@/utils";

// Action to get all dishes
export const getAllDishes = () => async (dispatch) => {
    console.log("action-get-all-dishes-req:");
    try {
        dispatch(dishActions.getAllDishesRequest());
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/dishes`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-get-all-dishes-res:", data);
        if (status === "success") {
            dispatch(dishActions.getAllDishesSuccess(data));
        } else {
            dispatch(dishActions.getAllDishesFailure(message));
        }
    } catch (error) {
        console.log("action-get-all-dishes-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(dishActions.getAllDishesFailure(errorMessage));
    }
};
// Action to get all dish byID
export const getDish = (dishId) => async (dispatch) => {
    console.log("action-get-dish-req: ", dishId);
    try {
        dispatch(dishActions.getDishRequest());
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/dishes/${dishId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-get-dish-res:", data);
        if (status === "success") {
            dispatch(dishActions.getDishSuccess(data));
        } else {
            dispatch(dishActions.getDishFailure(message));
        }
    } catch (error) {
        console.log("action-get-all-dishes-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(dishActions.getAllDishesFailure(errorMessage));
    }
};

// Action to update an dish
// export const updateDish = (dishId, dishData) => async (dispatch) => {
//     console.log("action-update-dish-req:", dishId, dishData);
//     try {
//         dispatch(dishActions.updateDishRequest());
//         const response = await axios.patch(
//             `${process.env.NEXT_PUBLIC_SERVER_URL}/dishes/${dishId}`,
//             dishData,
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 withCredentials: true,
//             }
//         );

//         const { status, message, data } = response.data;
//         console.log("action-update-dish-res:", data);
//         if (status === "success") {
//             dispatch(dishActions.updateDishSuccess(data));
//         } else {
//             dispatch(dishActions.updateDishFailure(message));
//         }
//     } catch (error) {
//         console.log("action-update-dish-error:", error);
//         const errorMessage = getActionErrorMessage(error);
//         dispatch(dishActions.updateDishFailure(errorMessage));
//     }
// };

export const updateDish = (dishId, dishData) => async (dispatch) => {
    console.log("action-update-dish-req:", dishId, dishData);
    try {
        dispatch(dishActions.updateDishRequest());

        // // Create FormData and append fields
        // const formData = new FormData();
        // Object.keys(dishData).forEach((key) => {
        //     if (key === "file" && dishData[key]) {
        //         formData.append("logo", dishData[key]); // Append file
        //     } else {
        //         formData.append(key, dishData[key]); // Append other fields
        //     }
        // });

        const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/dishes/${dishId}`,
            dishData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-update-dish-res:", data);
        if (status === "success") {
            dispatch(dishActions.updateDishSuccess(data));
        } else {
            dispatch(dishActions.updateDishFailure(message));
        }
    } catch (error) {
        console.log("action-update-dish-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(dishActions.updateDishFailure(errorMessage));
    }
};

export const removeOffer = (dishId) => async (dispatch) => {
    console.log("action-remove-offer-dish-req:", dishId);
    try {
        dispatch(dishActions.removeOfferRequest());

        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/dishes/remove-offer/${dishId}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-remove-offer-dish-res:", data);
        if (status === "success") {
            dispatch(dishActions.removeOfferSuccess(data));
        } else {
            dispatch(dishActions.removeOfferFailure(message));
        }
    } catch (error) {
        console.log("action-remove-offer-dish-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(dishActions.removeOfferFailure(errorMessage));
    }
};


// Action to create a new dish
export const createDish = (dishData) => async (dispatch) => {
    console.log("action-create-dish-req:", dishData);
    try {
        dispatch(dishActions.createDishRequest());
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/dishes`,
            dishData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-create-dish-res:", data);
        if (status === "success") {
            dispatch(dishActions.createDishSuccess(data));
        } else {
            dispatch(dishActions.createDishFailure(message));
        }
    } catch (error) {
        console.log("action-create-dish-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(dishActions.createDishFailure(errorMessage));
    }
};

// Action to delete an dish
export const deleteDish = (dishId) => async (dispatch) => {
    console.log("action-delete-dish-req:", dishId);
    try {
        dispatch(dishActions.deleteDishRequest());
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/dishes/${dishId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-delete-dish-res:", data);
        if (status === "success") {
            dispatch(dishActions.deleteDishSuccess(data));
        } else {
            dispatch(dishActions.deleteDishFailure(message));
        }
    } catch (error) {
        console.log("action-delete-dish-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(dishActions.deleteDishFailure(errorMessage));
    }
};
