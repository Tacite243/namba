import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '@/constants/Colors';
import { fonts } from '@/constants/fonts';

interface ServiceCardProps {
  image: string | any; // Accepte une URL (string) ou une image locale (any)
  price: number;
  unit: string;
  name: string;
  description: string;
  like: number;
  onPress: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image, price, unit, name, description, like, onPress }) => {
  return (
    <View style={styles.card}>
      {/* Image du service */}
      <Image
        source={typeof image === 'string' ? { uri: image } : image} // Gère les deux cas
        style={styles.image}
      />

      {/* Prix et unité */}
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>

      {/* Nom et description du service */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>

      {/* Avis utilisateurs en étoiles */}
      <View style={styles.likeContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <FontAwesome key={i} name="star" size={18} color={i <= like ? colors.primary : colors.background} />
        ))}
      </View>

      {/* Bouton de réservation */}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Réserver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  price: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  unit: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.background,
  },
  name: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.primary,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.text,
    marginTop: 5,
  },
  likeContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: colors.secondary,
    fontFamily: fonts.bold,
    fontSize: 16,
  },
});

export default ServiceCard;