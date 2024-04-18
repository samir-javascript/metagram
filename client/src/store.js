import { ApiSlice } from "./slices/ApiSlice";
import { configureStore } from "@reduxjs/toolkit";
import authSlideReducer from './slices/usersSlice'
import conversationSlice from "./slices/conversationSlice";
export const store = configureStore({
    reducer: {
        [ApiSlice.reducerPath]:ApiSlice.reducer,
        auth: authSlideReducer,
        conversation: conversationSlice
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(ApiSlice.middleware),
    devTools: true
})