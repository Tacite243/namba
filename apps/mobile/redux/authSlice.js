import { createSlice } from '@reduxjs/toolkit';
import authService from '../services/authService';
import { storeToken, getToken } from '../utils/Storage'

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, isAuthenticated: false },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export const loginUser = (phoneNumber, password) => async (dispatch) => {
  try {
    const token = await authService.login(phoneNumber, password);
    await storeToken(token);  // Stocke le token dans AsyncStorage
    dispatch(setToken(token));
  } catch (error) {
    console.error('Erreur de connexion:', error);
  }
};

export const loadUser = () => async (dispatch) => {
  const token = await getToken();
  if (token) dispatch(setToken(token));
};

export const logoutUser = () => async (dispatch) => {
  await authService.logout();
  dispatch(clearToken());
};

export default authSlice.reducer;