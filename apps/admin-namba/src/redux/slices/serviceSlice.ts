import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/service"; // URL de l'API

// Interface du Service
interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  createdAt: string;
}

// Interface de l'état global du slice
interface ServiceState {
  loading: boolean;
  error: string | null;
  services: Service[];
}

// État initial
const initialState: ServiceState = {
  loading: false,
  error: null,
  services: [],
};

// Action asynchrone pour créer un service
export const createService = createAsyncThunk(
  "service/createService",
  async (
    { name, description, price }: { name: string; description?: string; price: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post<Service>(API_URL, {
        name,
        description,
        price,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Erreur inconnue");
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default serviceSlice.reducer;