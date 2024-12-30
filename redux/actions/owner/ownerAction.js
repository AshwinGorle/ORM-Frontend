import axios from "axios";
import { ownerActions } from "@/redux/slices/ownerSlice";
import { getActionErrorMessage } from "@/utils/getActionErrorMessage.js"; // Utility for error parsing
import { authActions } from "@/redux/slices/authSlice";

export const approveHotelOwner = (hotelOwnerId) => async (dispatch) => {
    console.log("action-approve-owner-req:", hotelOwnerId);
    try {
        dispatch(ownerActions.approveOwnerRequest());
        const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/users/approve-hotel-owner/${hotelOwnerId}`,
            {

            },
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

export const extendOwnerMembership = (ownerId, numberOfDays) => async (dispatch) => {
    console.log("action-extend-owner-membership-req:",ownerId , numberOfDays  );
    try {
        dispatch(ownerActions.extendOwnerMembershipRequest());
        const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/users/membership-extender/${ownerId}`,
            {
                days : numberOfDays
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-extend-owner-membership-res:", data);
        if (status === "success") {
            dispatch(ownerActions.extendOwnerMembershipSuccess(data));
        } else {
            dispatch(ownerActions.extendOwnerMembershipFailure(message));
        }
    } catch (error) {
        console.log("action-extend-owner-membership-error:", error);
        let errorMessage = getActionErrorMessage(error);
        dispatch(ownerActions.extendOwnerMembershipFailure(errorMessage));
    }
};

export const updateOwner = (ownerId, ownerData) => async (dispatch) => {
    console.log("action-update-owner-req:", ownerId);
    try {
        dispatch(ownerActions.updateOwnerRequest());
        const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/users/owner/${ownerId}`,
            ownerData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-update-owner-res:", data);
        if (status === "success") {
            dispatch(ownerActions.updateOwnerSuccess(data));
            console.log('updating user from update owner : ', data.owner)
            dispatch(authActions.updateUser(data.owner));  
            dispatch(ownerActions.setProfileRefresh(true)); 
        } else {
            dispatch(ownerActions.updateOwnerFailure(message));
        }
    } catch (error) {
        console.log("action-update-ingredient-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(ownerActions.updateOwnerFailure(errorMessage));
    }
};