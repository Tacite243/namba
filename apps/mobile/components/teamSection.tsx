import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/constants/Colors';
import { fonts } from '@/constants/fonts';

const { width } = Dimensions.get('window');

const TeamSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.boldText}>Une équipe Heureuse et prête à vous Servir !</Text>
      </Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis corporis facere impedit. Optio natus a est rem quod mollitia vitae, porro ullam incidunt, quidem magnam ab eius voluptate accusamus ea.
      </Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nobis assumenda iste rerum eligendi quo maxime.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9, // Éviter que le texte touche les bords
    marginTop: 40,
    alignSelf: 'center',
    alignItems: 'center', // Centrer les enfants horizontalement
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.primary,
    textAlign: 'center', // Centrer le texte
  },
  boldText: {
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: '#555',
    marginTop: 10,
    textAlign: 'center', // Centrer le texte
  },
});

export default TeamSection;