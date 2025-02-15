import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Données des témoignages
const testimonials = [
  {
    id: '1',
    name: 'Marie',
    image: require('@/assets/images/avatar/happy-customer-01.jpg'),
    rating: 3,
    comment: 'Best Cleaning Service Provider ipsum dolor sit consectetur kengan',
  },
  {
    id: '2',
    name: 'Nana',
    image: require('@/assets/images/avatar/happy-customer-02.jpg'),
    rating: 2,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
  },
  {
    id: '3',
    name: 'Elon',
    image: require('@/assets/images/avatar/happy-customer-03.jpg'),
    rating: 5,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
  },
];

// Composant pour afficher chaque témoignage
const TestimonialCard = ({ item }: { item: { id: string; name: string; image: any; rating: number; comment: string } }) => {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.stars}>
          {[...Array(5)].map((_, index) => (
            <Ionicons
              key={index}
              name={index < item.rating ? 'star' : 'star-outline'}
              size={16}
              color="#FFD700"
            />
          ))}
        </View>
        <Text style={styles.comment}>{item.comment}</Text>
      </View>
    </View>
  );
};

// Composant principal
const Testimonials = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nos clients témoignent !</Text>
      <FlatList
        data={testimonials}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TestimonialCard item={item} />}
        showsVerticalScrollIndicator={false}
      />
      {/* Icône flottante en bas à droite */}
      <View style={styles.floatingIcon}>
        <Ionicons name="chatbubbles" size={24} color="white" />
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e8f1fd', // Bleu clair du fond
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a3c63',
    textAlign: 'center',
    marginBottom: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#a4c8f0', // Bleu des cartes
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  stars: {
    flexDirection: 'row',
    marginTop: 3,
  },
  comment: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  floatingIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6a99d8',
    padding: 12,
    borderRadius: 30,
    elevation: 5, // Ombre pour Android
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
  },
});

export default Testimonials;