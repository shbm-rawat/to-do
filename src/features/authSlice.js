import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authState = {
    authToken: Cookies.get("token") || "",
    name: Cookies.get("name") || "",
}

const authSlice = createSlice({
    name: "auth",
    initialState: authState,
    reducers: {
        login: (state, action) => {
            state.authToken = action.payload.authToken
            state.name = action.payload.name
        },
        Signup: (state, action) => {
            state.authToken = action.payload.authToken
            state.name = action.payload.name

        },
        logout: (state) => {
            state.authToken = ""

        }
    }
})

export const { login, Signup, logout } = authSlice.actions
export default authSlice.reducer