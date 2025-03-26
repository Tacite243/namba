import React, { useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, Image, StyleSheet, Animated, ActivityIndicator, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { colors } from "@/constants/Colors";

const LoginScreen = () => {
  const router = useRouter();
  const { isRegistering } = useLocalSearchParams();
  const [isRegisteringState, setIsRegistering] = useState(isRegistering === "true");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const animation = new Animated.Value(isRegistering ? 1 : 0);

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Utilisateur connecté !");
      // Redirection ou action après connexion
    }
  }, [isAuthenticated]);

  // Animation pour la transition du formulaire
  const toggleForm = () => {
    Animated.timing(animation, {
      toValue: isRegisteringState ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsRegistering(!isRegisteringState));
  };

  // Fonction de connexion
  const handleLogin = () => {
    if (!phoneNumber || !password) return;
    dispatch(loginUser({ phoneNumber, password }));
    router.replace("/(tabs)/home")
  };

  // Fonction d'inscription
  const handleRegister = () => {
    if (!name || !email || !phoneNumber || !password) return;
    dispatch(registerUser({ name, email, phoneNumber, password }));
    router.replace("/(tabs)/home")
  };

  return (
    <LinearGradient colors={[colors.background, colors.secondary]} style={styles.container}>
      <Text style={styles.language}>Français (DRC)</Text>

      <Image source={require("@/assets/images/LOGO_NAMBA.png")} style={styles.logo} />

      <Animated.View style={[styles.formContainer, { minHeight: isRegisteringState ? 300 : 220 }]}>
        {isRegisteringState && (
          <>
            <TextInput style={styles.input} placeholder="Nom d'utilisateur" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
          </>
        )}
        <TextInput style={styles.input} placeholder="Numéro de téléphone" value={phoneNumber} onChangeText={setPhoneNumber} />
        <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.actionButton} onPress={isRegisteringState ? handleRegister : handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.actionText}>{isRegisteringState ? "Créer un compte" : "Se connecter"}</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleForm} style={styles.switchButton}>
          <Text style={styles.switchText}>{isRegisteringState ? "Déjà un compte ? Se connecter" : "Créer un compte"}</Text>
        </TouchableOpacity>
      </Animated.View>

      {!isRegisteringState && <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>}

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
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
