import { createSlice } from '@reduxjs/toolkit';

const serviceSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
  },
  reducers: {
    setServices(state: { services: any[] }, action: { payload: any[] }) {
      state.services = action.payload;
    },
  },
});

export const { setServices } = serviceSlice.actions;
export default serviceSlice.reducer;