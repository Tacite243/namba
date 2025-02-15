import React, { useState, useEffect, useRef } from "react";
import { 
  View, Text, Switch, StyleSheet, TouchableOpacity, Animated 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { colors } from "@/constants/Colors";

const SettingsScreen = () => {
  const [language, setLanguage] = useState("fr");
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [textSize, setTextSize] = useState("medium");
  const [privateMode, setPrivateMode] = useState(false);
  
  // Animation d'apparition
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [
          savedLanguage,
          savedTheme,
          savedNotifications,
          savedTextSize,
          savedPrivateMode,
        ] = await Promise.all([
          AsyncStorage.getItem("language"),
          AsyncStorage.getItem("theme"),
          AsyncStorage.getItem("notifications"),
          AsyncStorage.getItem("textSize"),
          AsyncStorage.getItem("privateMode"),
        ]);

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
      <SettingCard label="Langue">
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
      </SettingCard>

      {/* Thème */}
      <SettingCard label="Thème">
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
      </SettingCard>

      {/* Notifications */}
      <SwitchSetting 
        label="Notifications"
        value={notifications}
        onChange={(value: boolean) => {
          setNotifications(value);
          saveSetting("notifications", value);
        }}
      />

      {/* Taille du texte */}
      <SettingCard label="Taille du texte">
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
      </SettingCard>

      {/* Mode privé */}
      <SwitchSetting 
        label="Mode privé"
        value={privateMode}
        onChange={(value: boolean) => {
          setPrivateMode(value);
          saveSetting("privateMode", value);
        }}
      />

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

// Composant pour les cartes de paramètres
const SettingCard: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <View style={styles.card}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

// Composant pour les switchs
const SwitchSetting: React.FC<{ label: string; value: boolean; onChange: (value: boolean) => void }> = ({ label, value, onChange }) => (
  <View style={styles.switchContainer}>
    <Text style={styles.label}>{label}</Text>
    <Switch
      trackColor={{ false: "#767577", true: colors.primary }}
      thumbColor={value ? colors.yellow : "#f4f3f4"}
      value={value}
      onValueChange={onChange}
    />
  </View>
);

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
