import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/authSlice';

export default function Acceuil() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenue sur l'écran d'accueil !</Text>
      <Button title="Déconnexion" onPress={handleLogout} />
    </View>
  );
}