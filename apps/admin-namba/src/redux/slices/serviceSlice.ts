import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../constantes";

// Création d'une instance Axios avec la base URL
const api = axios.create({
  baseURL: API_URL + "/service",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interface de Service
interface Service {
  id: string;
  name: string;
  description?: string;
  image: string;
  like: number;
  price: number;
  unit: string;
  createdAt: string;
  reservations?: any[]; // À définir selon la structure des réservations
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

// 🔹 Action asynchrone pour récupérer tous les services
export const fetchServices = createAsyncThunk("service/fetchServices", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<Service[]>("/");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Erreur lors du chargement des services");
  }
});

// 🔹 Action asynchrone pour créer un service
export const createService = createAsyncThunk(
  "service/createService",
  async (
    { name, description, image, price, unit }: {
      name: string;
      description?: string;
      image: string;
      price: number;
      unit: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post<Service>("/", {
        name,
        description,
        image,
        price,
        unit,
        like: 0 // Valeur par défaut
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Erreur lors de la création du service");
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Gestion de `fetchServices`
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Gestion de `createService`
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