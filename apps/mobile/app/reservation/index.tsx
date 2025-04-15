import React, { useEffect, useReducer } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Platform,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { createReservation, resetState } from "@/redux/slices/reservationSlice";
import { useForm } from "react-hook-form";
import { colors } from "@/constants/Colors";

// Active LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const initialState = {
  pickupAddress: "",
  isCurrentLocation: false,
  latitude: null,
  longitude: null,
  whatsappNumber: "",
  processingTime: "NORMAL_24H",
  pickupDate: "",
  pickupTime: "",
  additionalNotes: "",
};

const reducer = (state: any, action: any) => ({
  ...state,
  [action.name]: action.value,
});

const Reservation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { success, loading, error } = useSelector((state: RootState) => state.reservation);
  const { serviceId, name, description, image } = useLocalSearchParams();
  const imageUrl = Array.isArray(image) ? image[0] : image;
  const [state, setState] = useReducer(reducer, initialState);
  const { handleSubmit } = useForm();

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission refusée", "Activez la localisation pour utiliser cette fonctionnalité.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setState({ name: "latitude", value: location.coords.latitude });
      setState({ name: "longitude", value: location.coords.longitude });
      setState({
        name: "pickupAddress",
        value: `Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`,
      });
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
    dispatch(
      createReservation({
        ...state,
        serviceId: String(serviceId),
      })
    );
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}

      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>

      <TextInput
        style={styles.input}
        placeholder="Adresse de ramassage"
        value={state.pickupAddress}
        onChangeText={(text) => setState({ name: "pickupAddress", value: text })}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Utiliser ma position actuelle</Text>
        <Switch
          value={state.isCurrentLocation}
          onValueChange={() =>
            setState({ name: "isCurrentLocation", value: !state.isCurrentLocation })
          }
          trackColor={{ false: "#ccc", true: colors.primary }}
          thumbColor={state.isCurrentLocation ? colors.secondary : "#f4f3f4"}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Numéro WhatsApp"
        keyboardType="phone-pad"
        value={state.whatsappNumber}
        onChangeText={(text) => setState({ name: "whatsappNumber", value: text })}
      />

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
        style={[styles.input, { height: 80 }]}
        placeholder="Notes supplémentaires"
        multiline
        value={state.additionalNotes}
        onChangeText={(text) => setState({ name: "additionalNotes", value: text })}
      />

      <Text style={styles.label}>Délais de traitement</Text>
      <View style={styles.pickerWrapper}>
        <TouchableOpacity
          style={[
            styles.option,
            state.processingTime === "NORMAL_24H" && styles.selectedOption,
          ]}
          onPress={() => setState({ name: "processingTime", value: "NORMAL_24H" })}
        >
          <Text style={styles.optionText}>Normal (24h)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            state.processingTime === "EXPRESS_6H" && styles.selectedOption,
          ]}
          onPress={() => setState({ name: "processingTime", value: "EXPRESS_6H" })}
        >
          <Text style={styles.optionText}>Express (6h)</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <TouchableOpacity onPress={handleSubmit(handleReservation)} style={styles.button}>
          <Text style={styles.buttonText}>Réserver maintenant</Text>
        </TouchableOpacity>
      )}

      {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
    </ScrollView>
  );
};

export default Reservation;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
    color: colors.primary,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 15,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 14,
    color: "#444",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 14,
    fontSize: 16,
  },
  pickerWrapper: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  option: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  selectedOption: {
    backgroundColor: colors.primary,
  },
  optionText: {
    color: "#000",
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
