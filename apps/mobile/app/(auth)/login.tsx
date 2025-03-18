import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  KeyboardTypeOptions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";
import { colors } from "@/constants/Colors";
import { loginUser, registerUser } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";


interface FormData {
  name?: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword?: string;
}

interface Errors {
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // Animation pour la transition entre Login et Signup
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Fonction pour gérer les changements de champs
  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Fonction pour valider le formulaire
  const validateForm = useCallback((): boolean => {
    let newErrors: Errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isSignUp && !formData.name?.trim()) newErrors.name = "Nom d'utilisateur requis";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Numéro de téléphone requis";
    if (isSignUp && !emailRegex.test(formData.email)) newErrors.email = "Email invalide";
    if (formData.password.length < 6) newErrors.password = "Mot de passe trop court (min 6 caractères)";
    if (isSignUp && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, isSignUp]);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/home");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      if (isSignUp) {
        await dispatch(registerUser(formData)).unwrap();
      } else {
        await dispatch(loginUser({ phoneNumber: formData.phoneNumber, password: formData.password })).unwrap();
      }
    } catch (error) {
      console.error("Erreur d'authentification :", error);
    }
  };

  // Fonction pour alterner entre Login et Signup
  const toggleForm = () => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
      setIsSignUp((prev) => {
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        });
        return !prev;
      });
      setErrors({});
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    });
  };

  return (
    <ImageBackground source={require('@/assets/images/LOGO_NAMBA .png')} style={styles.backgroundImage} resizeMode="cover">
      <LinearGradient colors={["rgba(247, 247, 247, 0.8)", "rgba(255, 255, 255, 0.8)"]} style={styles.container}>
        <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>{isSignUp ? "Inscription" : "Connexion"}</Text>

          {isSignUp && (
            <InputField
              placeholder="Nom d'utilisateur"
              value={formData.name || ""}
              onChangeText={(value) => handleChange("name", value)}
              error={errors.name}
            />
          )}

          <InputField
            placeholder="Numéro de téléphone"
            value={formData.phoneNumber}
            onChangeText={(value) => handleChange("phoneNumber", value)}
            error={errors.phoneNumber}
            keyboardType="phone-pad"
          />

          {isSignUp && (
            <InputField
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              error={errors.email}
              keyboardType="email-address"
            />
          )}

          <PasswordField
            placeholder="Mot de passe"
            value={formData.password}
            onChangeText={(value) => handleChange("password", value)}
            error={errors.password}
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword(!showPassword)}
          />

          {isSignUp && (
            <PasswordField
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword || ""}
              onChangeText={(value) => handleChange("confirmPassword", value)}
              error={errors.confirmPassword}
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
            />
          )}

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

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, value, onChangeText, error, keyboardType = "default" }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholder={placeholder}
      placeholderTextColor="#666"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

interface PasswordFieldProps extends InputFieldProps {
  showPassword: boolean;
  toggleShowPassword: () => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ placeholder, value, onChangeText, error, showPassword, toggleShowPassword }) => (
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
    width: '96%',
    height: '80%',
    margin: '2%',
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