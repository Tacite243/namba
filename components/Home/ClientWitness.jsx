import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ClientWitness ({ clientData }){
  const renderItem = ({ item }) => (
    <View style={styles.testimonialCard}>
      <View style={styles.clientInfo}>
        <Image source={{ uri: item.imageUrl }} style={styles.clientImage} />
        <Text style={styles.clientName}>{item.name}</Text>
      </View>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesome
            key={star}
            name={star <= item.rating ? "star" : "star-o"}
            size={16}
            color="#ffffff"
          />
        ))}
      </View>
      <Text style={styles.testimonialTitle}>{item.title}</Text>
      <Text style={styles.testimonialText}>{item.testimonial}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nos clients témoignent !</Text>
      <FlatList
        data={clientData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#F0F0F0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  testimonialCard: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  clientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  testimonialTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFFFFF',
  },
  testimonialText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
})