import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "../constantes";
import { AppDispatch } from "../store";


// Définition des types
interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface RegisterResponse {
  user: User;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// 🎯 Vérifier si l'utilisateur est encore authentifié
export const checkAuthStatus = () => async (dispatch: AppDispatch): Promise<boolean> => {
  try {
    const [storedToken, storedUser, storedDate] = await AsyncStorage.multiGet([
      'token',
      'user',
      'loginDate',
    ]);

    if (!storedToken[1] || !storedUser[1] || !storedDate[1]) return false;

    const loginDate = new Date(storedDate[1]);
    const now = new Date();
    const threeMonths = 90 * 24 * 60 * 60 * 1000;

    const isValid = now.getTime() - loginDate.getTime() < threeMonths;

    if (isValid) {
      dispatch(setAuthenticated(true));
      dispatch({ type: "auth/loginUser/fulfilled", payload: {
        token: storedToken[1],
        user: JSON.parse(storedUser[1]),
      }});
      return true;
    } else {
      await AsyncStorage.multiRemove(['token', 'user', 'loginDate']);
      return false;
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de l’authentification :', error);
    return false;
  }
};

// 🎯 Thunk pour la connexion
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ phoneNumber, password }: { phoneNumber: string; password: string }) => {
    try {
      const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { phoneNumber, password });
      await AsyncStorage.multiSet([
        ["token", response.data.token],
        ["user", JSON.stringify(response.data.user)],
        ["loginDate", new Date().toISOString()],
      ]);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erreur lors de la connexion");
    }
  }
);

// 🎯 Thunk pour l'inscription
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, phoneNumber, password }: { name: string; email: string; phoneNumber: string; password: string }) => {
    try {
      const response = await axios.post<RegisterResponse>(`${API_URL}/auth/register`, { name, email, phoneNumber, password });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erreur lors de l'inscription");
    }
  }
);

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// 🎯 Slice pour l'authentification
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: any) => {
      AsyncStorage.multiRemove(["token", "user", "loginDate"])
        .then(() => {
          state.user = null;
          state.isAuthenticated = false;
        })
        .catch((error) => console.error("Erreur lors de la suppression des données :", error));
    },
    setAuthenticated: (state: any, action: { payload: boolean }) => {
      state.isAuthenticated = action.payload;
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(loginUser.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message || "Erreur inconnue";
      })
      .addCase(registerUser.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message || "Erreur inconnue";
      });
  },
});

export const { logout, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
