import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../constantes";

// interface service 
interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    unit: string;
    image: string;
    // hover: string;
}

// interface du state global des services
interface ServiceState {
    services: Service[];
    loading: boolean;
    error: string | null;
}

// Thunk pour récupérer les services depuis le backend
export const fetchServices = createAsyncThunk(
    "services/fetchServices",
    async () => {
        try {
            const response = await axios.get<Service[]>(`${API_URL}/service/`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erreur lors du chargement des services");
        }
    });

// State initial
const initialState: ServiceState = {
    services: [],
    loading: false,
    error: null
};

// Slice pour la gestion des services
const serviceSlice = createSlice({
    name: "services",
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder
        .addCase(fetchServices.pending, (state: any) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchServices.fulfilled, (state: any, action: any) => {
            state.loading = false;
           state.services = action.payload;
        })
        .addCase(fetchServices.rejected, (state: any, action: any) => {
            state.loading = false;
            state.error = action.error.message || "Erreur inconnue";
        })
    }
});

export default serviceSlice.reducer;