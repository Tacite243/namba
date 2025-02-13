import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    login(state: { isAuthenticated: boolean; user: any }, action: { payload: any }) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state: { isAuthenticated: boolean; user: any }) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;