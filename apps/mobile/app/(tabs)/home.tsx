import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "@/redux/slices/serviceSlices";
import { RootState, AppDispatch } from "@/redux/store";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { services, loading, error } = useSelector(
    (state: RootState) => state.services
  );

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const renderService = ({ item }: any) => (
    <TouchableOpacity
      style={styles.projectCard}
      onPress={() =>
        router.push({
          pathname: "/reservation",
          params: {
            serviceId: item.id,
            name: item.name,
            description: item.description,
            image: item.image,
            price: item.price,
            unit: item.unit,
          }
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.projectImage} />
      <View style={styles.overlay}>
        <Text style={styles.projectTitle}>{item.name}</Text>
        <Text style={styles.projectLabel}>{item.unit} - {item.price} $</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/WhatsApp Image 2025-02-24 at 09.19.33 (1).jpeg")}
        style={styles.header}
      >
        <Text style={styles.wave}>👋</Text>
        <Text style={styles.title}>Hi User!</Text>
        <Text style={styles.subtitle}>Merci d'avoir choisie NAMBA</Text>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="leaf-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Reserver un service !</Text>
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.projects}>
        <View style={styles.projectHeader}>
          <Text style={styles.projectTitleSection}>Nos services</Text>
          <Text style={styles.seeAll}>Voir plus !</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : error ? (
          <Text style={{ color: "red", paddingHorizontal: 20 }}>{error}</Text>
        ) : (
          <FlatList
            data={services}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderService}
            style={{ paddingLeft: 20 }}
          />
        )}
      </View>

      <View style={styles.pagination}>
        {services.map((index: any) => (
          <View key={index} style={[styles.dot, { backgroundColor: "#cbd5e1" }]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 330,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  wave: {
    fontSize: 28,
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: colors.tertiary,
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    marginTop: 15,
    flexDirection: "row",
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 10,
  },
  projects: {
    flex: 1,
    paddingTop: 20,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  projectTitleSection: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  seeAll: {
    color: colors.primary,
    fontWeight: "500",
  },
  projectCard: {
    width: width * 0.6,
    height: 150,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 15,
    position: "relative",
    backgroundColor: "#ccc",
  },
  projectImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  projectTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  projectLabel: {
    color: "#f1f5f9",
    fontSize: 12,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
});
