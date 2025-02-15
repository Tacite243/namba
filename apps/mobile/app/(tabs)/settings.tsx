import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { colors } from "@/constants/Colors";



const SettingsScreen = () => {
  const [language, setLanguage] = useState("fr");
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [textSize, setTextSize] = useState("medium");
  const [privateMode, setPrivateMode] = useState(false);
  
  // Animation pour l'apparition des paramètres
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("language");
        const savedTheme = await AsyncStorage.getItem("theme");
        const savedNotifications = await AsyncStorage.getItem("notifications");
        const savedTextSize = await AsyncStorage.getItem("textSize");
        const savedPrivateMode = await AsyncStorage.getItem("privateMode");

        if (savedLanguage) setLanguage(savedLanguage);
        if (savedTheme) setTheme(savedTheme);
        if (savedNotifications !== null) setNotifications(savedNotifications === "true");
        if (savedTextSize) setTextSize(savedTextSize);
        if (savedPrivateMode !== null) setPrivateMode(savedPrivateMode === "true");
      } catch (error) {
        console.error("Erreur lors du chargement des paramètres", error);
      }
    };

    loadSettings();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const saveSetting = async (key: string, value: string | boolean) => {
    try {
      await AsyncStorage.setItem(key, String(value));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde", error);
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.header}>Paramètres</Text>

      {/* Langue */}
      <View style={styles.card}>
        <Text style={styles.label}>Langue</Text>
        <Picker
          selectedValue={language}
          onValueChange={(value) => {
            setLanguage(value);
            saveSetting("language", value);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Français" value="fr" />
          <Picker.Item label="Anglais" value="en" />
          <Picker.Item label="Swahili" value="sw" />
        </Picker>
      </View>

      {/* Thème */}
      <View style={styles.card}>
        <Text style={styles.label}>Thème</Text>
        <Picker
          selectedValue={theme}
          onValueChange={(value) => {
            setTheme(value);
            saveSetting("theme", value);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Clair" value="light" />
          <Picker.Item label="Sombre" value="dark" />
          <Picker.Item label="Automatique" value="auto" />
        </Picker>
      </View>

      {/* Notifications */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: colors.primary }}
          thumbColor={notifications ? colors.yellow : "#f4f3f4"}
          value={notifications}
          onValueChange={(value) => {
            setNotifications(value);
            saveSetting("notifications", value);
          }}
        />
      </View>

      {/* Taille du texte */}
      <View style={styles.card}>
        <Text style={styles.label}>Taille du texte</Text>
        <Picker
          selectedValue={textSize}
          onValueChange={(value) => {
            setTextSize(value);
            saveSetting("textSize", value);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Petit" value="small" />
          <Picker.Item label="Moyen" value="medium" />
          <Picker.Item label="Grand" value="large" />
        </Picker>
      </View>

      {/* Mode privé */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Mode privé</Text>
        <Switch
          trackColor={{ false: "#767577", true: colors.primary }}
          thumbColor={privateMode ? colors.yellow : "#f4f3f4"}
          value={privateMode}
          onValueChange={(value) => {
            setPrivateMode(value);
            saveSetting("privateMode", value);
          }}
        />
      </View>

      {/* Bouton Réinitialiser */}
      <TouchableOpacity
        style={styles.resetButton}
        onPress={async () => {
          await AsyncStorage.clear();
          setLanguage("fr");
          setTheme("light");
          setNotifications(true);
          setTextSize("medium");
          setPrivateMode(false);
        }}
      >
        <Text style={styles.resetText}>Réinitialiser</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 5,
  },
  picker: {
    backgroundColor: colors.tertiary,
    borderRadius: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  resetButton: {
    backgroundColor: colors.error,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  resetText: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SettingsScreen;