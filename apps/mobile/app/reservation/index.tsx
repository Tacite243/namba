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
import { useForm, Controller } from "react-hook-form";
import { colors } from "@/constants/Colors";

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
  const { control, handleSubmit, setValue } = useForm();

  const getLocation = async (): Promise<{ latitude: number; longitude: number } | null> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission refusée", "Activez la localisation pour utiliser cette fonctionnalité.");
        return null;
      }

      const location = await Location.getCurrentPositionAsync({});
      const coords = location.coords;

      setState({ name: "latitude", value: coords.latitude });
      setState({ name: "longitude", value: coords.longitude });
      setState({
        name: "pickupAddress",
        value: `Lat: ${coords.latitude}, Lon: ${coords.longitude}`,
      });

      return { latitude: coords.latitude, longitude: coords.longitude };
    } catch (err) {
      Alert.alert("Erreur", "Impossible de récupérer votre position.");
      return null;
    }
  };

  // useEffect(() => {
  //   if (state.isCurrentLocation) {
  //     getLocation();
  //   } else {
  //     setState({ name: "latitude", value: null });
  //     setState({ name: "longitude", value: null });
  //     setState({ name: "pickupAddress", value: "" });
  //   }
  // }, [state.isCurrentLocation]);

  useEffect(() => {
    if (success) {
      Alert.alert("Succès", "Votre réservation a été envoyée !");
      dispatch(resetState());
    }
  }, [success]);

  const handleReservation = async () => {
    console.log(state.isCurrentLocation);

    if (state.isCurrentLocation) {
      const location = await getLocation();
      console.log("Location récupérée:", location);

      if (!location) {
        Alert.alert("Adresse incomplète", "La position actuelle n'a pas pu être récupérée. Veuillez réessayer.");
        return;
      }

      // S'assurer que les valeurs sont correctement mises à jour
      const cleanedData = {
        ...state,
        latitude: location.latitude,
        longitude: location.longitude,
        pickupAddress: `Lat: ${location.latitude}, Lon: ${location.longitude}`,
        whatsappNumber: state.whatsappNumber.trim(),
        pickupDate: state.pickupDate.trim(),
        pickupTime: state.pickupTime.trim(),
        additionalNotes: state.additionalNotes.trim(),
        serviceId: String(serviceId),
      };
      dispatch(createReservation(cleanedData));
    } else {
      if (state.pickupAddress.trim() === "") {
        Alert.alert("Adresse incomplète", "Veuillez entrer une adresse de ramassage.");
        return;
      }

      const cleanedData = {
        ...state,
        whatsappNumber: state.whatsappNumber.trim(),
        pickupDate: state.pickupDate.trim(),
        pickupTime: state.pickupTime.trim(),
        additionalNotes: state.additionalNotes.trim(),
        serviceId: String(serviceId),
      };
      dispatch(createReservation(cleanedData));
    }
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
        style={[
          styles.input,
          state.isCurrentLocation && { backgroundColor: "#ddd", color: "#888" },
        ]}
        placeholder="Adresse de ramassage"
        value={state.pickupAddress}
        editable={!state.isCurrentLocation}
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
