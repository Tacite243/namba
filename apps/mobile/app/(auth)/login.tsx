import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("@/assets/images/login_background.jpeg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>NAMBA</Text>
        </View>

        {/* Texte principal */}
        <Text style={styles.title}>Rendez-vous la vie facile</Text>

        {/* Boutons */}
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => router.push({ pathname: "/(auth)/loginScreen", params: { isRegistering: "true" } })}
        >
          <Text style={styles.signUpText}>Créer un compte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/(auth)/loginScreen")}
        >
          <Text style={styles.loginText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)", 
  },
  logoContainer: {
    position: "absolute",
    top: 100,
    alignSelf: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: colors.secondary, // Vert NAMBA
    borderRadius: 5,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.secondary, // Vert NAMBA
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.secondary, 
    marginBottom: 20,
  },
  signUpButton: {
    width: "80%",
    padding: 15,
    backgroundColor: colors.primary, // Bleu NAMBA
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  signUpText: {
    color: colors.secondary, 
    fontWeight: "bold",
    fontSize: 16,
  },
  loginButton: {
    width: "80%",
    padding: 15,
    backgroundColor: colors.secondary, // Vert NAMBA
    borderRadius: 8,
    alignItems: "center",
  },
  loginText: {
    color: colors.primary, // Bleu NAMBA
    fontWeight: "bold",
    fontSize: 16,
  },
});
