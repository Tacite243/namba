import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const projects = [
  {
    id: "1",
    title: "Panama Reforestation Project",
    label: "Gold Standard",
    image: require("@/assets/images/WhatsApp Image 2025-02-24 at 09.19.33 (1).jpeg"), // Ajoute cette image dans assets
  },
  {
    id: "2",
    title: "Mauritan Project",
    label: "Gold Standard",
    image: require("@/assets/images/WhatsApp Image 2025-02-24 at 09.19.33 (1).jpeg"), // Ajoute cette image aussi
  },
];

export default function Home() {
  const renderProject = ({ item }: any) => (
    <View style={styles.projectCard}>
      <Image source={item.image} style={styles.projectImage} />
      <View style={styles.overlay}>
        <Text style={styles.projectTitle}>{item.title}</Text>
        <Text style={styles.projectLabel}>{item.label}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Background with greeting */}
      <ImageBackground source={require("@/assets/images/WhatsApp Image 2025-02-24 at 09.19.33 (1).jpeg")} style={styles.header}>
        <Text style={styles.wave}>👋</Text>
        <Text style={styles.title}>Hi User!</Text>
        <Text style={styles.subtitle}>Merci d'avoir choisie NAMBA</Text>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="leaf-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Reserver un service !</Text>
        </TouchableOpacity>
      </ImageBackground>

      {/* Projects */}
      <View style={styles.projects}>
        <View style={styles.projectHeader}>
          <Text style={styles.projectTitleSection}>Nos services</Text>
          <Text style={styles.seeAll}>Voir plus !</Text>
        </View>
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderProject}
          style={{ paddingLeft: 20 }}
        />
      </View>
      <View style={styles.pagination}>
        {projects.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: "#cbd5e1" },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
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
    color: "#e2e8f0",
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    marginTop: 15,
    flexDirection: "row",
    backgroundColor: "#22c55e",
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
    fontWeight: "600",
    color: "#1e293b",
  },
  seeAll: {
    color: "#3b82f6",
    fontWeight: "500",
  },
  projectCard: {
    width: width * 0.6,
    height: 150,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 15,
    position: "relative",
  },
  projectImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  projectTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  projectLabel: {
    color: "#d1d5db",
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
  },  
});
