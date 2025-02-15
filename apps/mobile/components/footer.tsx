import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/bubbles.png')} style={styles.logo} />

      {/* Menu */}
      <View style={styles.menu}>
        <TouchableOpacity>
          <Text style={styles.menuText}>À propos de nous</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.menuText}>Contacts</Text>
        </TouchableOpacity>
      </View>

      {/* Nos Services */}
      <Text style={styles.sectionTitle}>Nos Services</Text>
      <View style={styles.services}>
        <Text style={styles.serviceItem}>➤ Lavage de vêtements</Text>
        <Text style={styles.serviceItem}>➤ Nettoyage des Tapis</Text>
        <Text style={styles.serviceItem}>➤ Nettoyage des draps, couvertures...</Text>
        <Text style={styles.serviceItem}>➤ Repassage professionnel</Text>
        <Text style={styles.serviceItem}>➤ Services personnalisés</Text>
      </View>

      {/* Adresse Physique */}
      <Text style={styles.sectionTitle}>Adresse physique</Text>
      <View style={styles.contactInfo}>
        <Text style={styles.contactItem}>
          <Ionicons name="location" size={16} color="white" /> Goma 20, Av. du lac, Q.Himbi
        </Text>
        <Text style={styles.contactItem}>
          <Ionicons name="call" size={16} color="white" /> +243 971-736-244
        </Text>
        <Text style={styles.contactItem}>
          <Ionicons name="mail" size={16} color="white" /> info@namba.com
        </Text>
      </View>

      {/* Réseaux sociaux */}
      <View style={styles.socialIcons}>
        <FontAwesome name="facebook" size={20} color="white" style={styles.icon} />
        <FontAwesome name="twitter" size={20} color="white" style={styles.icon} />
        <FontAwesome name="instagram" size={20} color="white" style={styles.icon} />
      </View>

      {/* Horaire de Service */}
      <Text style={styles.sectionTitle}>Horaire de Service</Text>
      <Text style={styles.schedule}>Lundi - Lundi</Text>
      <Text style={styles.schedule}>24h/24</Text>

      {/* Bouton flottant */}
      <TouchableOpacity style={styles.floatingIcon}>
        <Ionicons name="chatbubbles" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#a4c8f0',
    flex: 1,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  menuText: {
    color: 'white',
    fontSize: 16,
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 15,
  },
  services: {
    marginBottom: 15,
  },
  serviceItem: {
    color: 'white',
    fontSize: 14,
    marginVertical: 2,
  },
  contactInfo: {
    marginBottom: 15,
  },
  contactItem: {
    color: 'white',
    fontSize: 14,
    marginVertical: 2,
  },
  socialIcons: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  schedule: {
    color: 'white',
    fontSize: 14,
  },
  floatingIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6a99d8',
    padding: 12,
    borderRadius: 30,
    elevation: 5,
  },
});

export default Footer;