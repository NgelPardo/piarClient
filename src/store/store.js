import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, piarSlice, modalSlice, authSlice } from "./";

export const store = configureStore({
    reducer: {
        auth:   authSlice.reducer,
        ui:     uiSlice.reducer,
        piar:   piarSlice.reducer,
        modal:  modalSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})