import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice.js";
import { ownerReducer } from "./slices/ownerSlice.js";

export const store  = configureStore({
    reducer: {
        auth : authReducer,
        owner : ownerReducer
    }
})

