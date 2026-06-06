import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";
import themeReducer from "../features/themeSlice";
import authReducer from "../features/authSlice"
const store = configureStore({
    reducer: {
        todo: todoReducer,
        theme: themeReducer,
        auth: authReducer,
    }
});
export default store;