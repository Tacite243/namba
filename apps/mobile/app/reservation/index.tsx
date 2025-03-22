import React, { useEffect, useReducer } from "react";
import { View, Text, TextInput, Button, StyleSheet, Switch, Alert, ScrollView, Image, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { createReservation, resetState } from "@/redux/slices/reservationSlice";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";

const initialState = {
    pickupAddress: "",
    isCurrentLocation: false,
    latitude: null,
    longitude: null,
    whatsappNumber: "",
    email: "",
    weightKg: "",
    dirtinessLevel: "LEGER",
    processingTime: "NORMAL_24H",
    pickupDate: "",
    pickupTime: "",
    paymentMethod: "CASH",
    additionalNotes: "",
    selectedItems: [],
    itemRemarks: "",
};

const reducer = (state: any, action: any) => ({ ...state, [action.name]: action.value });

const Reservation = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { success, loading, error } = useSelector((state: RootState) => state.reservation);
    const { serviceId, name, description, price, unit, image } = useLocalSearchParams();

    const [state, setState] = useReducer(reducer, initialState);
    const { control, handleSubmit } = useForm();

    const getLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission refusée", "Activez la localisation pour utiliser cette fonctionnalité.");
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setState({ name: "latitude", value: location.coords.latitude });
            setState({ name: "longitude", value: location.coords.longitude });
            setState({ name: "pickupAddress", value: `Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}` });
        } catch {
            Alert.alert("Erreur", "Impossible de récupérer votre position.");
        }
    };

    useEffect(() => {
        if (state.isCurrentLocation) {
            getLocation();
        } else {
            setState({ name: "latitude", value: null });
            setState({ name: "longitude", value: null });
            setState({ name: "pickupAddress", value: "" });
        }
    }, [state.isCurrentLocation]);

    useEffect(() => {
        if (success) {
            Alert.alert("Succès", "Votre réservation a été envoyée !");
            dispatch(resetState());
        }
    }, [success]);

    const handleReservation = () => {
        dispatch(createReservation({
            ...state,
            serviceId: serviceId,
            weightKg: parseFloat(state.weightKg),
            totalPrice: parseFloat(state.weightKg) * Number(price) || 0
        }));
    };

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <Image source={{ uri: Array.isArray(image) ? image[0] : image }} style={styles.image} />
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.description}>{description}</Text>

            <Controller
                control={control}
                name="pickupAddress"
                defaultValue=""
                render={({ field }) => <TextInput style={styles.input} placeholder="Adresse" value={state.pickupAddress} onChangeText={(text) => setState({ name: "pickupAddress", value: text })} />}
            />

            <Switch value={state.isCurrentLocation} onValueChange={() => setState({ name: "", value: !state.isCurrentLocation })} />

            <TextInput style={styles.input} placeholder="Numéro WhatsApp" value={state.whatsappNumber} onChangeText={(text) => setState({ name: "whatsappNumber", value: text })} />
            <TextInput style={styles.input} placeholder="Email" value={state.email} onChangeText={(text) => setState({ name: "email", value: text })} />
            <Picker
                selectedValue=""
                onValueChange={(value) => {
                    if (value && !state.selectedItems.includes(value)) {
                        setState({ name: "selectedItems", value: [...state.selectedItems, value] });
                    }
                }}
            >
                <Picker.Item label="Sélectionner un article" value="" />
                <Picker.Item label="Chemise" value="Chemise" />
                <Picker.Item label="Pantalon" value="Pantalon" />
                <Picker.Item label="Robe" value="Robe" />
            </Picker>

            {state.selectedItems.length > 0 && (
                <View style={styles.selectedItemsContainer}>
                    {state.selectedItems.map((item: string, index: any) => (
                        <View key={index} style={styles.selectedItem}>
                            <Text>{item}</Text>
                            <Button title="X" onPress={() => setState({ name: "selectedItems", value: state.selectedItems.filter((i: any) => i !== item) })} />
                        </View>
                    ))}
                </View>
            )}

            <TextInput style={styles.input} placeholder="Poids en Kg" value={state.weightKg} keyboardType="numeric" onChangeText={(text) => setState({ name: "weightKg", value: text })} />
            <TextInput
                style={styles.input}
                placeholder="Date de ramassage (YYYY-MM-DD)"
                value={state.pickupDate}
                onChangeText={(text) => setState({ name: "pickupDate", value: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Heure de ramassage (HH:MM)"
                value={state.pickupTime}
                onChangeText={(text) => setState({ name: "pickupTime", value: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Remarques sur l'article"
                value={state.itemRemarks}
                onChangeText={(text) => setState({ name: "itemRemarks", value: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Notes supplémentaires"
                value={state.additionalNotes}
                onChangeText={(text) => setState({ name: "additionalNotes", value: text })}
            />

            <Picker selectedValue={state.dirtinessLevel} onValueChange={(value) => setState({ name: "dirtinessLevel", value })}>
                <Picker.Item label="Léger" value="LEGER" />
                <Picker.Item label="Modéré" value="MODERE" />
                <Picker.Item label="Fort" value="FORT" />
            </Picker>

            <Picker selectedValue={state.processingTime} onValueChange={(value) => setState({ name: "processingTime", value })}>
                <Picker.Item label="Express 4h" value="EXPRESS_4H" />
                <Picker.Item label="Express 8h" value="EXPRESS_8H" />
                <Picker.Item label="Normal 24h" value="NORMAL_24H" />
            </Picker>

            <Text style={styles.price}>Total: ${parseFloat(state.weightKg) * Number(price) || 0}</Text>
            {loading ? (<ActivityIndicator size="large" color="blue" />) : (<Button title="Réserver" onPress={handleSubmit(handleReservation)} />)}
            {error && <Text style={{ color: "red" }}>{error}</Text>}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
    title: { fontSize: 24, fontWeight: "bold" },
    description: { fontSize: 16, opacity: 0.7 },
    input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5, borderColor: "#ccc" },
    price: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    checkboxContainer: {
        marginTop: 10,
    },
    checkboxItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    selectedItemsContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
    },
    selectedItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        backgroundColor: "#ddd",
        borderRadius: 5,
        marginBottom: 5,
    },    
});

export default Reservation;
