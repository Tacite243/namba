import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, Image, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { colors } from "@/constants/Colors";


const LoginScreen = () => {
  const {isRegistering} = useLocalSearchParams();
  const [isRegisteringState, setIsRegistering] = useState(isRegistering === 'true');
  const animation = new Animated.Value(isRegistering ? 1 : 0);

  // Animation pour une transition plus fluide
  const toggleForm = () => {
    Animated.timing(animation, {
      toValue: isRegistering ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsRegistering(!isRegistering));
  };

  return (
    <LinearGradient colors={[colors.background, colors.secondary]} style={styles.container}>
      {/* Langue */}
      <Text style={styles.language}>Français (DRC)</Text>

      {/* Logo */}
      <Image source={require("@/assets/images/LOGO_NAMBA .png")} style={styles.logo} />

      {/* Champs de formulaire */}
      <Animated.View style={[styles.formContainer, { minHeight: isRegistering ? 300 : 220 }]}>
        {isRegisteringState && <TextInput style={styles.input} placeholder="Nom d'utilisateur" />}
        {isRegisteringState && <TextInput style={styles.input} placeholder="Email" />}
        <TextInput style={styles.input} placeholder="Numéro de téléphone" />
        <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry />

        {/* Boutons */}
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>{isRegistering ? "Créer un compte" : "Se connecter"}</Text>
        </TouchableOpacity>

        {/* Changer d'état */}
        <TouchableOpacity onPress={toggleForm} style={styles.switchButton}>
          <Text style={styles.switchText}>
            {isRegistering ? "Déjà un compte ? Se connecter" : "Créer un compte"}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Mot de passe oublié */}
      {!isRegisteringState && <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>}

      {/* Logo Meta */}
      <Text style={styles.metaText}>∞ from NAMBA TEAM</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  language: {
    position: "absolute",
    top: 50,
    fontSize: 14,
    color: colors.text,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButton: {
    width: "100%",
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  actionText: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: "bold",
  },
  switchButton: {
    marginTop: 15,
  },
  switchText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    marginTop: 15,
    color: "#1877f2",
    fontSize: 14,
  },
  metaText: {
    position: "absolute",
    bottom: 40,
    fontSize: 16,
    color: "#666",
  },
});

export default LoginScreen;
