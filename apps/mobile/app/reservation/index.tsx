import React, { useEffect, useReducer, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Switch, Alert, ScrollView, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { createReservation, resetState } from "@/redux/slices/reservationSlice";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { colors } from "@/constants/Colors";


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
    const [poids, setPoids] = useState('leger');
    const [delai, setDelai] = useState('normal');
    const dispatch = useDispatch<AppDispatch>();
    const { success, loading, error } = useSelector((state: RootState) => state.reservation);
    const { serviceId, name, description, price, unit, image } = useLocalSearchParams();
    const imageUrl = Array.isArray(image) ? image[0] : image;
    const [state, setState] = useReducer(reducer, initialState);
    const { control, handleSubmit } = useForm();

    const getTotal = () => {
        let total = 0;
        if (poids === 'leger') total += 5;
        else if (poids === 'moyen') total += 10;
        else if (poids === 'lourd') total += 15;

        if (delai === 'express') total += 5;

        return `$${total}`;
    };

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
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.description}>{description}</Text>

            <Controller
                control={control}
                name="pickupAddress"
                defaultValue=""
                render={({ field }) => <TextInput style={styles.input} placeholder="Adresse" value={state.pickupAddress} onChangeText={(text) => setState({ name: "pickupAddress", value: text })} />}
            />

            <View style={styles.switchContainer}>
                <Text style={{ marginRight: 10, color: colors.text }}>Utiliser ma position actuelle</Text>
                <Switch
                    value={state.isCurrentLocation}
                    onValueChange={() => setState({ name: "isCurrentLocation", value: !state.isCurrentLocation })}
                    trackColor={{ false: "#ccc", true: colors.primary }}
                    thumbColor={state.isCurrentLocation ? colors.secondary : "#f4f3f4"}
                />
            </View>

            <TextInput style={styles.input} placeholder="Numéro WhatsApp" value={state.whatsappNumber} onChangeText={(text) => setState({ name: "whatsappNumber", value: text })} />
            <TextInput style={styles.input} placeholder="Email" value={state.email} onChangeText={(text) => setState({ name: "email", value: text })} />
            <Picker
                style={styles.picker}
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

            <Text style={styles.label}>Type de vêtement</Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={poids}
                    onValueChange={(itemValue) => setPoids(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Léger" value="leger" />
                    <Picker.Item label="Moyen" value="moyen" />
                    <Picker.Item label="Lourd" value="lourd" />
                </Picker>
            </View>

            <Text style={styles.label}>Délais</Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={delai}
                    onValueChange={(itemValue) => setDelai(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Normal 24h" value="normal" />
                    <Picker.Item label="Express 6h" value="express" />
                </Picker>
            </View>

            <Text style={styles.total}>
                Total : <Text style={styles.price}>{getTotal()}</Text>
            </Text>
            {loading ?
                (<ActivityIndicator size="large" color="blue" />)
                : (
                    <TouchableOpacity
                        onPress={handleSubmit(handleReservation)}
                        style={{
                            backgroundColor: colors.primary,
                            paddingVertical: 14,
                            borderRadius: 10,
                            marginTop: 10,
                        }}
                    >
                        <Text style={{ color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "bold" }}>
                            Réserver maintenant
                        </Text>
                    </TouchableOpacity>
                )}
            {error && <Text style={{ color: "red" }}>{error}</Text>}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
    },
    image: {
        width: "100%",
        height: 220,
        borderRadius: 16,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: colors.primary,
        marginBottom: 4,
    },
    description: {
        fontSize: 15,
        color: colors.text,
        opacity: 0.8,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        backgroundColor: "#fff",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 16,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    picker: {
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        marginBottom: 16,
        height: 40,
        width: '100%',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        color: colors.primary,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        justifyContent: "space-between",
    },
    selectedItemsContainer: {
        padding: 12,
        borderRadius: 10,
        backgroundColor: "#f6f6f6",
        marginBottom: 16,
    },
    selectedItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    price: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.secondary,
        textAlign: "right",
        marginBottom: 16,
    },
    reserveButton: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    reserveButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 15,
        color: '#333',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    total: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
});

export default Reservation;
