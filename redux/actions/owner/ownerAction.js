import axios from "axios";
import { ownerActions } from "@/redux/slices/ownerSlice";
import { getActionErrorMessage } from "@/utils/getActionErrorMessage.js"; // Utility for error parsing

export const approveHotelOwner = (hotelOwnerId) => async (dispatch) => {
    console.log("action-approve-owner-req:", hotelOwnerId);
    try {
        dispatch(ownerActions.approveOwnerRequest());
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/users/approve-hotel-owner/${hotelOwnerId}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-approve-owner-res:", data);
        if (status === "success") {
            dispatch(ownerActions.approveOwnerSuccess(data));
        } else {
            dispatch(ownerActions.approveOwnerFailure(message));
        }
    } catch (error) {
        console.log("action-approve-owner-error:", error);
        let errorMessage = getActionErrorMessage(error);
        dispatch(ownerActions.approveOwnerFailure(errorMessage));
    }
};



export const getAllHotelOwners = () => async (dispatch) => {
    console.log("action-get-all-owner-req:");
    try {
        dispatch(ownerActions.getAllOwnersRequest());
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/users/hotel-owners`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-get-all-owner-res:", data);
        if (status === "success") {
            dispatch(ownerActions.getAllOwnersSuccess(data));
        } else {
            dispatch(ownerActions.getAllOwnersFailure(message));
        }
    } catch (error) {
        console.log("action-get-all-owner-error:", error);
        let errorMessage = getActionErrorMessage(error);
        dispatch(ownerActions.getAllOwnersFailure(errorMessage));
    }
};

