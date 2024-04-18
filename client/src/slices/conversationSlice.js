/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name: "conversation",
    initialState:  
    {
        selectedConvesation: null ,
        messages: null
       
   },
    reducers: {
        setSelectedConversation: (state,action)=> {
            state.selectedConvesation = action.payload;
        },
        setMessagese: (state,action)=> {
            state.messages = action.payload;
        },
       
    }
})
export const {
 setSelectedConversation, setMessagese
} = conversationSlice.actions;
export default conversationSlice.reducer;