"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../constantes";

interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

// 🎯 Vérifier si l'utilisateur est encore authentifié
const checkAuthStatus = () => {
    if (typeof window === "undefined") return false;

    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedDate = localStorage.getItem("loginDate");

    if (!storedToken || !storedUser || !storedDate) return false;

    const loginDate = new Date(storedDate);
    const now = new Date();
    const threeMonths = 90 * 24 * 60 * 60 * 1000; // 3 mois

    return now.getTime() - loginDate.getTime() < threeMonths;
};

// 🎯 Thunk pour la connexion
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ phoneNumber, password }: { phoneNumber: string; password: string }, { rejectWithValue }) => {
        if (typeof window === "undefined") return false;
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { phoneNumber, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("loginDate", new Date().toISOString());
            return response.data;
        } catch (error: unknown) {
            console.log(error)
            if (error instanceof Error) {
                return rejectWithValue(error || "Erreur lors de la connexion");
            }
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ name, email, phoneNumber, password }: { name: string; email: string; phoneNumber: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, { name, email, phoneNumber, password });
            return response.data;
        } catch (error: unknown) {
            console.log(error)
            if (error instanceof Error) {
                return rejectWithValue(error || "Erreur lors de l'inscription");
            }
        }
    }
);

const initialState: AuthState = {
    user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null,
    loading: false,
    error: null,
    isAuthenticated: checkAuthStatus(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("loginDate");
            state.user = null;
            state.isAuthenticated = false;
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;