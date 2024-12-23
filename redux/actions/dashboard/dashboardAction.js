import axios from "axios";
import { dashboardActions } from "@/redux/slices/dashboardSlice";
import { getActionErrorMessage } from "@/utils";

// Action to get dashboard
export const getDashboard = () => async (dispatch) => {
    console.log("action-get-dashboard-req:");
    try {
        dispatch(dashboardActions.getDashboardRequest());
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        const { status, message, data } = response.data;
        console.log("action-get-dashboard-res:", data);
        if (status === "success") {
            dispatch(dashboardActions.getDashboardSuccess(data));
        } else {
            dispatch(dashboardActions.getDashboardFailure(message));
        }
    } catch (error) {
        console.log("action-get-dashboard-error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(dashboardActions.getDashboardFailure(errorMessage));
    }
};