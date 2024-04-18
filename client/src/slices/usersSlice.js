/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
const initialState ={ userInfo:  localStorage.getItem("appGramUsers") ? JSON.parse(localStorage.getItem("appGramUsers")) : null}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state,action)=> {
            state.userInfo = action.payload;
            localStorage.setItem("appGramUsers",JSON.stringify(action.payload))
        },
        logoutUser: (state,action)=> {
            state.userInfo = null;
            localStorage.removeItem("appGramUsers")
        }
    }
})
export const {
  setCredentials,logoutUser
} = authSlice.actions;
export default authSlice.reducer;