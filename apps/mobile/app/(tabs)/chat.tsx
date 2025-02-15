import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/Colors';
import { fonts } from '@/constants/fonts';

const conversations = [
  { id: '1', user: 'Chor S Marie auxiliaire', message: 'Tshimbo: Yomba hajuwe bile', time: '21:10', unread: true, favorite: false },
  { id: '2', user: 'Da Bibi', message: 'Bananiqia mwa tjma 19hrs', time: '21:10', unread: false, favorite: true },
  { id: '3', user: '+243 974 063 626', message: 'depuis samedi', time: '21:06', unread: false, favorite: false },
  { id: '4', user: 'HIMBI2 (L’UNION FAIT LA ...)', message: 'Freddy Mwamiten: 🏆 Sticker', time: '21:02', unread: false, favorite: true },
  { id: '5', user: 'Légendaires', message: 'Numbers Abelo: Joyeux anniversa...', time: '20:55', unread: true, favorite: false },
];

const Chating = () => {
  const [selectedFilter, setSelectedFilter] = useState('Tout');

  // Filtrer les conversations en fonction du filtre sélectionné
  const filteredConversations = conversations.filter((conv) => {
    if (selectedFilter === 'Non lues') return conv.unread;
    if (selectedFilter === 'Favoris') return conv.favorite;
    return true; // Afficher tout par défaut
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discussions</Text>
        <Ionicons name="menu" size={24} color="white" />
      </View>

      {/* Search & Filters */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="gray" style={styles.searchIcon} />
        <TextInput placeholder="Rechercher" placeholderTextColor="gray" style={styles.searchInput} />
      </View>

      <View style={styles.filterContainer}>
        {['Tout', 'Non lues', 'Favoris'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterButton, selectedFilter === filter && styles.activeFilter]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Liste des conversations */}
      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem}>
            <View style={styles.chatDetails}>
              <Text style={styles.chatUser}>{item.user}</Text>
              <Text style={styles.chatMessage}>{item.message}</Text>
            </View>
            <View style={styles.chatTimeContainer}>
              <Text style={styles.chatTime}>{item.time}</Text>
              {item.unread && <View style={styles.unreadDot} />}
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Bouton flottant */}
      <TouchableOpacity style={styles.floatingButton}>
        <Ionicons name="chatbubble" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  filterButton: {
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: '#6a99d8',
  },
  filterText: {
    color: 'white',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#444',
  },
  chatDetails: {
    flex: 1,
  },
  chatUser: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  chatMessage: {
    color: 'gray',
    fontSize: 14,
  },
  chatTimeContainer: {
    alignItems: 'flex-end',
  },
  chatTime: {
    color: 'gray',
    fontSize: 12,
  },
  unreadDot: {
    width: 8,
    height: 8,
    backgroundColor: 'green',
    borderRadius: 4,
    marginTop: 5,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6a99d8',
    padding: 12,
    borderRadius: 30,
    elevation: 5,
  },
});

export default Chating;
