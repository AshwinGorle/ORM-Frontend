import axios from "axios";
import { hotelActions } from "../slices/hotelSlice";
import { getActionErrorMessage } from "@/utils/errorHandler";

export const fetchHotelOwners = () => async (dispatch) => {
    console.log("action-fetch-hotel-owners-req");
    try {
        dispatch(hotelActions.fetchHotelOwnersRequest());
        const response = await axios.get(`http://localhost:5000/api/v1/users/hotel-owners`, {
            withCredentials: true,
        });

        const { status, message, data } = response.data;
        console.log("action-fetch-hotel-owners-res:", data);
        if (status === "success") {
            dispatch(hotelActions.fetchHotelOwnersSuccess(data));
        } else {
            dispatch(hotelActions.fetchHotelOwnersFailure(message));
        }
    } catch (error) {
        console.log("action-fetch-hotel-owners-error:", error);
        let errorMessage = getActionErrorMessage(error);
        dispatch(hotelActions.fetchHotelOwnersFailure(errorMessage));
    }
};

export const fetchAllHotels = () => async (dispatch) => {
    console.log("action-fetch-all-hotels-req");
    try {
        dispatch(hotelActions.fetchAllHotelsRequest());
        const response = await axios.get(`http://localhost:5000/api/v1/hotels/getAllHotels`, {
            withCredentials: true,
        });

        const { status, message, data } = response.data;
        console.log("action-fetch-all-hotels-res:", data);
        if (status === "success") {
            dispatch(hotelActions.fetchAllHotelsSuccess(data));
        } else {
            dispatch(hotelActions.fetchAllHotelsFailure(message));
        }
    } catch (error) {
        console.log("action-fetch-all-hotels-error:", error);
        let errorMessage = getActionErrorMessage(error);
        dispatch(hotelActions.fetchAllHotelsFailure(errorMessage));
    }
};


export const updateHotel = (hotelId, updateData) => async (dispatch) => {
    console.log("action-update-hotel-req:", { hotelId, updateData });
    try {
        dispatch(hotelActions.updateHotelRequest());
        const response = await axios.put(
            `http://localhost:5000/api/v1/hotels/update/${hotelId}`, 
            updateData, 
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-update-hotel-res:", data);

        if (status === "success") {
            dispatch(hotelActions.updateHotelSuccess(data));
        } else {
            dispatch(hotelActions.updateHotelFailure(message));
        }
    } catch (error) {
        console.log("action-update-hotel-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(hotelActions.updateHotelFailure(errorMessage));
    }
};

