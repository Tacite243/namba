"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../constantes";
import { RootState } from "../store";

interface CollectorState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: CollectorState = {
  loading: false,
  error: null,
  success: false,
};

// Thunk pour créer un collecteur (avec vérification du rôle)
export const createCollector = createAsyncThunk(
  "collector/create",
  async (
    collectorData: { name: string; email: string; password: string; phoneNumber: string },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const token = localStorage.getItem("token");
    const user = state.auth.user; // Récupérer l'utilisateur depuis Redux

    if (!token || !user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return rejectWithValue("Accès refusé : seuls l'administrateur et le super administrateur peuvent créer un collecteur.");
    }

    try {
      const response = await axios.post(`${API_URL}/auth/createCollector`, collectorData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error || "Une erreur s'est produite");
    }
  }
);

const collectorSlice = createSlice({
  name: "collector",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCollector.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCollector.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createCollector.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default collectorSlice.reducer;
