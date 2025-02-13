import { useState } from 'react';
import { useRouter } from 'expo-router';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const login = (email: string, password: string) => {
    // Simuler une connexion
    setIsAuthenticated(true);
    // router.replace('/(tabs)/home');
  };

  const logout = () => {
    setIsAuthenticated(false);
    // router.replace('/(auth)/login');
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;