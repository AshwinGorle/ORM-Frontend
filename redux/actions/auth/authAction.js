import { serverUrl } from "@/config/config";
import { authActions } from "@/redux/slices/authSlice"
import { getActionErrorMessage } from "@/utils";
import axios from "axios";

const route = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth`

export const login = (loginData) => async(dispatch) => {
    try {
        dispatch(authActions.loginRequest());
        console.log("Login request to:", `${route}/login`);
        
        const response = await axios.post(
            `${route}/login`,
            loginData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        
        const { status, message, data } = response.data;
        console.log("Login response:", response.data);
        
        if (status === "success" && data) {
            // Set token from the nested data object
            if (data.token) {
                document.cookie = `authToken=${data.token}; path=/;`;
            }
            dispatch(authActions.loginSuccess({
                id: data.id,
                name: data.name,
                role: data.role,
                email: data.email
            }));
            return false
        } else {
            dispatch(authActions.loginFailure(message || "Login failed"));
            return false 
        }
    } catch (error) {
        console.log("Login error:", error.response?.data || error.message);
        const errorMessage = getActionErrorMessage(error);
        dispatch(authActions.loginFailure(errorMessage));
        return false;
    }
};

export const verifyEmail = (verifyEmailData) => async(dispatch)=>{
    console.log("action-verifyOtp-req : ", verifyEmailData);
    try{
        dispatch(authActions.verifyOTPRequest());
        const response = await axios.post(
            `${route}/verify`,
            verifyEmailData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        )
        const {status , message , data} = response.data;
        console.log("action-verifyOtp-res : ", data);
        if(status == "success"){
            dispatch(authActions.verifyOTPSuccess(data));
        }else{
            dispatch(authActions.verifyOTPFailure(message));
        }
    }catch(error){
        console.log("action-verifyOtp-error", error);
        let errorMessage = getActionErrorMessage(error);
        dispatch(authActions.verifyOTPFailure(errorMessage));
    }
}
export const resendOtp = (resendOtpData) => async(dispatch)=>{
    console.log("action-resendOtp-req : ", resendOtpData);
    try{
        dispatch(authActions.verifyOTPRequest());
        const response = await axios.post(
            `${route}/resend-otp`,
            {email : resendOtpData},
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        )
        const {status , message , data} = response.data;
        console.log("action-resendOtp-res : ", data);
        if(status == "success"){
            dispatch(authActions.verifyOTPSuccess(data));
        }else{
            dispatch(authActions.verifyOTPFailure(message));
        }
    }catch(error){
        console.log("action-resendOtp-error", error);
        let errorMessage = getActionErrorMessage(error);
        dispatch(authActions.verifyOTPFailure(errorMessage));
    }
}
export const signup = (signupData) => async(dispatch) => {
    try {
        dispatch(authActions.signupRequest());
        const response = await axios.post(
            `${route}/signup`,
            signupData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        const { status, message, data } = response.data;
        
        if(status === "success") {
            dispatch(authActions.signupSuccess(data));
            return true;
        } else {
            dispatch(authActions.signupFailure(message));
            return false;
        }
    } catch(error) {
        const errorMessage = getActionErrorMessage(error);
        dispatch(authActions.signupFailure(errorMessage));
        return false;
    }
};


// export const logout = () => async (dispatch) => {
//     try {
//         dispatch(authActions.logoutRequest());
        
//         // Remove auth cookie
//         document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
//         dispatch(authActions.logoutSuccess());
//         document.location.reload();
//         return true;
//     } catch (error) {
//         console.error('Logout error:', error);
//         const errorMessage = getActionErrorMessage(error);
//         dispatch(authActions.logoutFailure(errorMessage));
//         return false;
//     }
// };

export const logout = () => async (dispatch) => {
    try {
        dispatch(authActions.logoutRequest());

        // Clear auth token cookie
        document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";

        // Clear local storage
        localStorage.clear();

        // Clear Redux state (optional, if you have a reset action)
        dispatch(authActions.clearAuthState()); // Replace with your actual Redux reset action if needed

        // Reload the page to ensure all states are cleared
        dispatch(authActions.logoutSuccess());
        window.location.href = "/";
        
        return true;
    } catch (error) {
        console.error("Logout error:", error);
        const errorMessage = getActionErrorMessage(error);
        dispatch(authActions.logoutFailure(errorMessage));
        return false;
    }
};

export const forgotPassword = (forgotPasswordData) => async (dispatch) => {
    try {
        console.log('action-forgotPassword-req : ', forgotPasswordData)
        dispatch(authActions.forgotPasswordRequest());

        const response = await axios.post(
            `${route}/send-reset-password-email`,
            forgotPasswordData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('action-forgot-password-res', response);
        dispatch(authActions.forgotPasswordSuccess(response));
    } catch (error) {
        console.log("action-forget-password-error", error.response.data.message)
        let errorMessage = getActionErrorMessage(error);
        dispatch(authActions.forgotPasswordFailure(errorMessage));
    }
};

export const resetPasswordWithOTP = (otpData) => async (dispatch) => {
    try {
        console.log('action-verifyOTPData-req', otpData);
        dispatch(authActions.verifyOTPRequest());

        const { data } = await axios.post(
            `${route}/reset-password-with-otp`,
            otpData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('action-forgot-password-res', data);
        dispatch(authActions.verifyOTPSuccess(data));
    } catch (error) {
        console.log("action-resetPasswordWIthOtp-error", error.response.data.message)
        let errorMessage = getActionErrorMessage(error);
        dispatch(authActions.verifyOTPFailure(errorMessage));
    }
};

export const changePassword = (data) => async (dispatch) => {
    try {
        console.log("action-change-password-data", data);
        dispatch(authActions.changePasswordRequest());

        const response = await axios.post(
            `${route}/change-password`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        dispatch(authActions.changePasswordSuccess(data));
    } catch (error) {
        console.log("error", error);
        let errorMessage = getActionErrorMessage(error);
        dispatch(authActions.changePasswordSuccess(errorMessage));
    }
};


export const getUser = () => async (dispatch) => {
    try {
        console.log('getUser req')
        dispatch(authActions.getUserRequest());

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/users/profile`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials : true
            }
        );
        const { status, message, data: responseData } = response.data;
        console.log("action-get-user-res:", responseData);
        dispatch(authActions.getUserSuccess(responseData));
    } catch (error) {
        console.log("error",error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(authActions.getUserFailure(errorMessage));
    }
};