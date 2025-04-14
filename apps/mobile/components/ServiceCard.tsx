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

const ServiceCard: React.FC<ServiceCardProps> = ({
  image, price, unit, name, description, like, onPress
}) => {
  return (
    <View style={styles.card}>
      <Image
        source={typeof image === 'string' ? { uri: image } : image}
        style={styles.image}
      />

      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>${price.toFixed(2)} <Text style={styles.unit}>/{unit}</Text></Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>{description}</Text>

        <View style={styles.rating}>
          {[1, 2, 3, 4, 5].map((i) => (
            <FontAwesome
              key={i}
              name="star"
              size={16}
              color={i <= like ? colors.secondary : '#ccc'}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Réserver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
  },
  infoContainer: {
    padding: 15,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.text,
  },
  price: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.primary,
  },
  unit: {
    fontSize: 13,
    color: '#888',
  },
  description: {
    marginTop: 6,
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#555',
  },
  rating: {
    flexDirection: 'row',
    marginTop: 8,
  },
  button: {
    marginTop: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: fonts.bold,
    color: '#fff',
    fontSize: 16,
  },
});

export default ServiceCard;
