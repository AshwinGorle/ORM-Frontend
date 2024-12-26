import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authDetails: {
        status: null,
        error: null,
        data: null,
        currentUser: null,
        isAuthenticated: false
    },
    signup: {
        status: null,
        error: null,
        data: null
    },
    verifyOTP: {
        status: null,
        error: null,
        data: null
    },
    logout: {
        status: null,
        error: null
    },
    forgotPassword: {
        status: null,
        error: null,
        data: null
    },
    getUser: {
        status: null,
        error: null,
        data: null
    }
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // when we update hotel owner we have to put it into user 
        updateUser : (state, action) => {
            state.getUser.data = {user : action.payload}
        },

        clearAuthState : (state) => {
            state.authDetails = initialState.authDetails
            state.signup = initialState.signup
            state.verifyOTP = initialState.verifyOTP
            state.logout = initialState.logout
            state.getUser = initialState.getUser
            state.forgotPassword = initialState.forgotPassword

        },
        loginRequest: (state) => {
            state.authDetails.status = "pending";
        },
        loginSuccess: (state, action) => {
            state.authDetails.status = "success";
            state.authDetails.data = action.payload;
            state.authDetails.currentUser = action.payload;
            state.authDetails.isAuthenticated = true;
            state.authDetails.error = null;
        },
        loginFailure: (state, action) => {
            state.authDetails.status = "failed";
            state.authDetails.error = action.payload;
            state.authDetails.isAuthenticated = false;
        },

        // Signup actions
        signupRequest: (state) => {
            state.signup.status = "pending";
        },
        signupSuccess: (state, action) => {
            state.signup.status = "success";
            state.signup.data = action.payload;
            state.signup.error = null;
        },
        signupFailure: (state, action) => {
            state.signup.status = "failed";
            state.signup.error = action.payload;
        },

        // Logout actions
        logoutRequest: (state) => {
            state.logout.status = "pending";
        },
        logoutSuccess: (state) => {
            state.logout.status = "success";
            state.authDetails = initialState.authDetails;
            state.signup = initialState.signup;
            state.verifyOTP = initialState.verifyOTP;
            state.forgotPassword = initialState.forgotPassword;
        },
        logoutFailure: (state, action) => {
            state.logout.status = "failed";
            state.logout.error = action.payload;
        },

        getUserRequest: (state, action) => {
            state.getUser.status = 'pending'
        },
        getUserSuccess: (state, action) => {
            state.getUser.status = 'success'
            state.getUser.data = action.payload;
        },
        getUserFailure: (state, action) => {
            state.getUser.status = 'failed'
            state.getUser.error = action.payload;
        },

        // Clear states
        clearAuthDetailsStatus: (state) => {
            state.authDetails.status = null;
        },
        clearAuthDetailsError: (state) => {
            state.authDetails.error = null;
        },
        clearSignupStatus: (state) => {
            state.signup.status = null;
        },
        clearSignupError: (state) => {
            state.signup.error = null;
        },
        clearLogoutStatus: (state) => {
            state.logout.status = null;
        },
        clearCurrentUser: (state) => {
            state.authDetails.currentUser = null;
            state.authDetails.isAuthenticated = false;
        },

        // Verify OTP actions
        verifyOTPRequest: (state) => {
            state.verifyOTP.status = "pending";
        },
        verifyOTPSuccess: (state, action) => {
            state.verifyOTP.status = "success";
            state.verifyOTP.data = action.payload;
            state.verifyOTP.error = null;
        },
        verifyOTPFailure: (state, action) => {
            state.verifyOTP.status = "failed";
            state.verifyOTP.error = action.payload;
        },
        clearVerifyOTPStatus: (state) => {
            state.verifyOTP.status = null;
        },
        clearVerifyOTPError: (state) => {
            state.verifyOTP.error = null;
        },

        clearGetUserStatus : (state)=>{
            state.getUser.status = null
        },
        clearGetUserError : (state)=>{
            state.getUser.error = null
        },
        clearGetUserData : (state)=>{
            state.getUser.data = null
        }
    }
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;