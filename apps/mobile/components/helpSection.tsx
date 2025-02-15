import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HelpSection = () => {
  return (
    <View style={styles.container}>
      {/* Image des employés */}
      <Image 
        source={require('@/assets/images/male-wearing-apron-female-white-t-shirt-smiling-broadly-being-glad-clean.png')} 
        style={styles.image} 
        resizeMode="contain" 
      />

      {/* Boîte bleue contenant le texte et l'icône */}
      <View style={styles.infoBox}>
        <Text style={styles.boldText}>Besoin d’aide ?</Text>
        <Text style={styles.regularText}>Appel nous directement:</Text>
        <View style={styles.phoneRow}>
          <Ionicons name="call" size={20} color="white" />
          <Text style={styles.phoneNumber}>+243 971 736 244</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ffffff', // Fond blanc pur
    paddingBottom: 40, // Plus d'espace sous la boîte bleue
    width: '100%',
  },
  image: {
    width: width * 0.9, // Augmenter la largeur pour mieux s'adapter
    height: 180, // Augmenter la hauteur de l’image
    marginBottom: -30, // Superposer légèrement l’image et la boîte
  },
  infoBox: {
    backgroundColor: '#64a8e4',
    padding: 20,
    borderRadius: 15, // Plus d’arrondi pour un look moderne
    width: width * 0.85, // Ajuster la largeur pour un meilleur rendu
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4, // Ombre pour Android
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  regularText: {
    fontSize: 16,
    color: 'white',
    marginTop: 4,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  phoneNumber: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default HelpSection;