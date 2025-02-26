import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const backendUrl = process.env.BACKEND_URL;

interface User {
    id: number;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }: { rejectWithValue: (value: any) => any }) => {
        try {
            const response = await axios.post<{ token: string; user: User }>(`${backendUrl}/login`, { email, password });
            if (response.data.user.role !== 'client') {
                return rejectWithValue({ message: 'Accès réservé aux clients.' });
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state: AuthState) => {
            state.user = null;
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(loginUser.pending, (state: AuthState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state: AuthState, action: PayloadAction<{ token: string; user: User }>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state: AuthState, action: PayloadAction<{ message: string; user: User }>) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;