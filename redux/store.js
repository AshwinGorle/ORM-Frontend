import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice.js";
import { ownerReducer } from "./slices/ownerSlice.js";
import { ingredientReducer } from "./slices/ingredientsSlice.js";
import { categoryReducer } from "./slices/categorySlice.js";
import { dishReducer } from "./slices/dishSlice.js";
import { tableReducer } from "./slices/tableSlice.js";
import { offerReducer } from "./slices/offerSlice.js";
import systemReducer from "./slices/systemSlice.js";
import { orderReducer } from "./slices/orderSlice.js";
import connectionReducer from "./slices/connectionSlice.js";
import { uploadReducer } from "./slices/uploadSlice.js";
import { billReducer } from "./slices/billSlice.js";
import { dashboardReducer } from "./slices/dashboardSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        owner: ownerReducer,
        ingredient: ingredientReducer,
        category: categoryReducer,
        dish: dishReducer,
        table: tableReducer,
        offer: offerReducer,
        system: systemReducer,
        order: orderReducer,
        connection: connectionReducer,
        upload: uploadReducer,
        bill: billReducer
    }
})


