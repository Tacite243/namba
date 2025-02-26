import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";
import { colors } from "@/constants/Colors";
import { useSelector } from "react-redux";

const Login = () => {
  const router = useRouter();
  // const {loading, error} = useSelector((state) => state.auth)

  // Définition de l'état
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; confirmPassword?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // Animation de transition entre Login et Signup
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Fonction pour gérer les changements de champs
  const handleChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Fonction pour valider le formulaire
  const validateForm = useCallback(() => {
    let newErrors: { username?: string; email?: string; password?: string; confirmPassword?: string } = {};
    if (isSignUp && !formData.username.trim()) newErrors.username = "Nom d'utilisateur requis";
    if (!formData.email.includes("@")) newErrors.email = "Email invalide";
    if (formData.password.length < 6) newErrors.password = "Mot de passe trop court (min 6 caractères)";
    if (isSignUp && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, isSignUp]);

  // Fonction pour gérer l'authentification
  const handleSubmit = useCallback(() => {
    if (!validateForm()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)/home");
    }, 2000);
  }, [validateForm, router]);

  // Fonction pour alterner entre Login et Signup
  const toggleForm = () => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
      setIsSignUp((prev) => !prev);
      setErrors({});
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    });
  };

  return (
    <ImageBackground
      source={require('@/assets/images/bubbles.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <LinearGradient colors={["rgba(247, 247, 247, 0.8)", "rgba(255, 255, 255, 0.8)"]} style={styles.container}>
        <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>{isSignUp ? "Inscription" : "Connexion"}</Text>

          {/* Affichage conditionnel des champs selon le mode */}
          {isSignUp && (
            <InputField
              placeholder="Nom d'utilisateur"
              value={formData.username}
              onChangeText={(value: string) => handleChange("username", value)}
              error={errors.username}
            />
          )}

          <InputField
            placeholder="Email"
            value={formData.email}
            onChangeText={(value: string) => handleChange("email", value)}
            error={errors.email}
            keyboardType="email-address"
          />

          <PasswordField
            placeholder="Mot de passe"
            value={formData.password}
            onChangeText={(value: string) => handleChange("password", value)}
            error={errors.password}
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword(!showPassword)}
          />

          {isSignUp && (
            <PasswordField
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChangeText={(value: string) => handleChange("confirmPassword", value)}
              error={errors.confirmPassword}
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
            />
          )}

          {/* Loader en cas de chargement */}
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
          ) : (
            <CustomButton title={isSignUp ? "S'inscrire" : "Se connecter"} onPress={handleSubmit} />
          )}

          <TouchableOpacity onPress={toggleForm} activeOpacity={0.7}>
            <Text style={styles.toggleText}>{isSignUp ? "Déjà un compte ? Se connecter" : "Créer un compte"}</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </ImageBackground>
  );
};

/* ✅ Composant réutilisable pour les champs de saisie */
const InputField = ({ placeholder, value, onChangeText, error, keyboardType = "default" }: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  keyboardType?: string;
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholder={placeholder}
      placeholderTextColor="#666"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType as any}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

/* ✅ Composant réutilisable pour le champ mot de passe */
const PasswordField = ({ placeholder, value, onChangeText, error, showPassword, toggleShowPassword }: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  showPassword: boolean;
  toggleShowPassword: () => void;
}) => (
  <View style={styles.inputContainer}>
    <View style={[styles.passwordContainer, error && styles.inputError]}>
      <TextInput
        style={styles.passwordInput}
        placeholder={placeholder}
        placeholderTextColor="#666"
        secureTextEntry={!showPassword}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={toggleShowPassword}>
        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#666" />
      </TouchableOpacity>
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

/* ✅ Style amélioré */
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fond semi-transparent pour améliorer la lisibilité
  },
  formContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  inputContainer: { marginBottom: 15 },
  input: { borderBottomWidth: 1, padding: 12, borderRadius: 5, backgroundColor: "#f1f1f1" },
  inputError: { borderColor: "red", borderWidth: 1 },
  errorText: { color: "red", fontSize: 14, marginTop: 5 },
  passwordContainer: { flexDirection: "row", alignItems: "center", borderBottomWidth: 1, backgroundColor: "#f1f1f1", paddingHorizontal: 10 },
  passwordInput: { flex: 1, paddingVertical: 12 },
  loader: { marginVertical: 20 },
  toggleText: { color: colors.primary, textAlign: "center", marginTop: 15 },
});

export default Login;