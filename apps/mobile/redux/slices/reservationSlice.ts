import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../constantes";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ReservationData {
    pickupAddress: string;
    isCurrentLocation: boolean;
    latitude: number | null;
    longitude: number | null;
    whatsappNumber: string;
    processingTime: string;
    pickupDate: string;
    pickupTime: string;
    additionalNotes: string;
    serviceId: string;
}

interface ReservationState {
    loading: boolean;
    error: string | null;
    success: boolean;
}

// Création de la réservation avec Redux Thunk
export const createReservation = createAsyncThunk(
    "reservation/create",
    async (formValues: ReservationData) => {
        try {
            const storedUser = await AsyncStorage.getItem("user");
            if (!storedUser) throw new Error("Utilisateur non authentifié");

            const user = JSON.parse(storedUser);
            const clientId = user.id;

            const reservationData = { ...formValues, clientId }
            console.log("reservationData envoyé :", reservationData);
            const response = await axios.post(`${API_URL}/reservation/create`, reservationData);
            return response.data;
        } catch (error: any) {
            console.log(await AsyncStorage.getItem('id'));

            console.error(error);
            throw new Error(error.response?.data?.message || "Erreur lors de la réservation");
        }
    }
);

const initialState: ReservationState = {
    loading: false,
    error: null,
    success: false,
};

// Slice de réservation
const reservationSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {
        resetState: (state: any) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(createReservation.pending, (state: any) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createReservation.fulfilled, (state: any) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createReservation.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message || "Une erreur est survenue";
            });
    },
});

export const { resetState } = reservationSlice.actions;
export default reservationSlice.reducer;
