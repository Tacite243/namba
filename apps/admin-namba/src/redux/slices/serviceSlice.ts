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
  reservations?: [];
}

// Interface de l'état global du slice
interface ServiceState {
  loading: boolean;
  error: string | null;
  services: Service[];
  selectedService: Service | null;
}

// État initial
const initialState: ServiceState = {
  loading: false,
  error: null,
  services: [],
  selectedService: null,
};

// 🔹 Action pour récupérer **tous** les services
export const fetchServices = createAsyncThunk("service/fetchServices", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<Service[]>("/");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Erreur lors du chargement des services");
  }
});

// 🔹 Action pour récupérer **un seul service** par ID
export const fetchServiceById = createAsyncThunk("service/fetchServiceById", async (id: string, { rejectWithValue }) => {
  try {
    const response = await api.get<Service>(`/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Service introuvable");
  }
});

// 🔹 Action pour créer un service
export const createService = createAsyncThunk(
  "service/createService",
  async ({ name, description, image, price, unit }: Partial<Service>, { rejectWithValue }) => {
    try {
      const response = await api.post<Service>("/", { name, description, image, price, unit, like: 0 });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Erreur lors de la création du service");
    }
  }
);

// 🔹 Action pour modifier un service
export const updateService = createAsyncThunk(
  "service/updateService",
  async ({ id, name, description, image, price, unit }: Partial<Service>, { rejectWithValue }) => {
    try {
      const response = await api.put<Service>(`/${id}`, { name, description, image, price, unit });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Erreur lors de la mise à jour du service");
    }
  }
);

// 🔹 Action pour supprimer un service
export const deleteService = createAsyncThunk("service/deleteService", async (id: string, { rejectWithValue }) => {
  try {
    await api.delete(`/${id}`);
    return id; // Retourne l'ID du service supprimé
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Erreur lors de la suppression du service");
  }
});

// 🔹 Création du slice
const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // **fetchServices**
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

      // **fetchServiceById**
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedService = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedService = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // **createService**
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
      })

      // **updateService**
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.map((service) =>
          service.id === action.payload.id ? action.payload : service
        );
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // **deleteService**
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter((service) => service.id !== action.payload);
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default serviceSlice.reducer;