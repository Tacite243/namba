import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice";
import serviceReducer from "./slices/serviceSlices";
import reservationReducer from "./slices/reservationSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    reservation: reservationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
