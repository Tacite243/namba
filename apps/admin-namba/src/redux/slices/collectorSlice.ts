import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/createCollector";
const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Remplace par ton token

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

// Thunk pour créer un collecteur
export const createCollector = createAsyncThunk(
  "collector/create",
  async (collectorData: { name: string; email: string; password: string; phoneNumber: string }, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, collectorData, {
        headers: {
          Authorization: `Bearer ${ADMIN_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Une erreur s'est produite");
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