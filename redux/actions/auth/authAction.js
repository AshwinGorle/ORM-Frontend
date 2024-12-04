import { serverUrl } from "@/config/config";
import { authActions } from "@/redux/slices/authSlice"
import { getActionErrorMessage } from "@/utils";
import axios from "axios";

const route = `${serverUrl}/auth`

export const login = (loginData) => async(dispatch)=>{
    console.log("action-login-req : ", loginData);
    try{
        dispatch(authActions.loginRequest());
        const response = await axios.post(
            `${route}/login`,
            loginData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        )
        const {status , message , data} = response.data;
        console.log("action-login-res : ", data);
        if(status == "success"){
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('isAuthenticated', true);
            dispatch(authActions.loginSuccess(data));
        }else{
            dispatch(authActions.loginFailure(message));
        }
    }catch(error){
        console.log("action-login-error", error);
        let errorMessage = getActionErrorMessage();
        dispatch(authActions.loginFailure(errorMessage));
    }
}

export const signup = (signupData) => async(dispatch)=>{
    console.log("action-signup-req : ", signupData);
    try{
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
        )
        const {status , message , data} = response.data;
        console.log("action-signup-res : ", data);
        if(status == "success"){
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('isAuthenticated', true);
            dispatch(authActions.signupSuccess(data));
           
        }else{
            dispatch(authActions.signupFailure(message));
        }
    }catch(error){
        console.log("action-signup-error", error);
        let errorMessage = getActionErrorMessage(error);
        dispatch(authActions.signupFailure(errorMessage));
    }
}


export const logout = () => async (dispatch) => {
    try {
        console.log("action-logout-req");
        dispatch(authActions.logoutRequest());
        const response = await axios.get(
            `${route}/logout`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        localStorage.removeItem("user");
        localStorage.removeItem('isAuthenticated');
        console.log('action-logout-res:');
        dispatch(authActions.logoutSuccess(response));
    } catch (error) {
        console.log('action-registration-error', error);
        let errorMessage = getActionErrorMessage(error);
        dispatch(authActions.logoutFailure(errorMessage));
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


