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
