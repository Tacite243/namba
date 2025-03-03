import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../constantes";


interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
};

// 🎯 Vérifier si l'utilisateur est encore authentifié
export const isAuthenticated = () => {
    if (typeof window === "undefined") return false; // vérifie qu'on est dans le navigateur
    const storedToken = localStorage.getItem("token");
    const storedDate = localStorage.getItem("loginDate");

    if (!storedToken || !storedDate) return false;

    const loginDate = new Date(storedDate);
    const now = new Date();
    const diff = now.getTime() - loginDate.getTime();
    const threeMonths = 90 * 24 * 60 * 60 * 1000; // 3 mois en millisecondes

    return diff < threeMonths; // Vrai si la session est encore valide
};

// 🎯 Thunk pour la connexion
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ phoneNumber, password }: { phoneNumber: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { phoneNumber, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("loginDate", new Date().toISOString());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur lors de la connexion");
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ name, email, phoneNumber, password }: { name: string; email: string; phoneNumber: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, { name, email, phoneNumber, password });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur lors de l'inscription");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null as User | null,
        loading: false,
        error: null as string | null,
        isAuthenticated: false, // Vérifie si l'utilisateur est déjà connecté
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
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
                state.user = {
                    id: action.payload.user.id,
                    name: action.payload.user.name,
                    email: action.payload.user.email,
                    phoneNumber: action.payload.user.phoneNumber,
                    role: action.payload.user.role, // Ajout du rôle
                };
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