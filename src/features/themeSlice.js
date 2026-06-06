import { createSlice } from "@reduxjs/toolkit";

const theme = {
    color: "red"
}

const themeSlice = createSlice({
    name: "theme",
    initialState: theme,
    reducers: {
        changeTheme: (state, action) => {
            console.log("color is changed", state.color, action.type, action.payload)
            return state = {
                ...state,
                color: action.payload
            }
        }
    }
})

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer