import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendUrl = process.env.BACKEND_URL;

// Async thunk pour la connexion
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }: { rejectWithValue: (value: any) => any }) => {
    try {
      const response = await axios.post(`${backendUrl}/login`, { email, password });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk pour l'inscription
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }: { username: string; email: string; password: string }, { rejectWithValue }: { rejectWithValue: (value: any) => any }) => {
    try {
      const response = await axios.post(`${backendUrl}/register`, { username, email, password });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state: { user: any; loading: boolean; error: any }) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder: any) => {
    builder
      // Connexion
      .addCase(loginUser.pending, (state: { loading: boolean; error: any }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state: { user: any; loading: boolean; error: any }, action: { payload: any }) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state: { loading: boolean; error: any }, action: { payload: any }) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Inscription
      .addCase(registerUser.pending, (state: { loading: boolean; error: any }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state: { user: any; loading: boolean; error: any }, action: { payload: any }) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state: { loading: boolean; error: any }, action: { payload: any }) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;