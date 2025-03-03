import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import appReducer from "@/redux/slices/appSlice";
import serviceReducer from "./slices/serviceSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    service: serviceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
