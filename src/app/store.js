import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";
import authReducer from "../features/authSlice"
const store = configureStore({
    reducer: {
        todo: todoReducer,
        auth: authReducer,
    }
});
export default store;