import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { fonts } from '@/constants/fonts';

const { width } = Dimensions.get('window');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const translateX = useRef(new Animated.Value(0)).current;

  const handleLogin = () => {
    // Logique de connexion
    router.replace('/(tabs)/home');
  };

  const handleSignUp = () => {
    // Logique d'inscription
    router.replace('/(tabs)/home');
  };

  const toggleForm = () => {
    Animated.timing(translateX, {
      toValue: isSignUp ? 0 : width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsSignUp(!isSignUp));
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bubbles.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.9)']}
        style={styles.overlay}
      >
        <Animated.View
          style={[
            styles.formContainer,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <Text style={styles.title}>{isSignUp ? 'Inscription' : 'Connexion'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#666"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {isSignUp && (
            <TextInput
              style={styles.input}
              placeholder="Confirmer le mot de passe"
              placeholderTextColor="#666"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          )}
          <CustomButton
            title={isSignUp ? "S'inscrire" : 'Se connecter'}
            onPress={isSignUp ? handleSignUp : handleLogin}
          />
          <TouchableOpacity onPress={toggleForm}>
            <Text style={styles.toggleText}>
              {isSignUp ? 'Déjà un compte ? Se connecter' : 'Créer un compte'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  toggleText: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    fontFamily: fonts.regular,
  },
});

export default Login;