import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { colors } from '@/constants/Colors';
import { fonts } from '@/constants/fonts';

const { height, width } = Dimensions.get('window');

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour gérer l'ouverture du menu
  const menuAnimation = useState(new Animated.Value(-width))[0]; // Animation pour le menu

  // Fonction pour ouvrir/fermer le menu
  const toggleMenu = () => {
    if (isMenuOpen) {
      // Fermer le menu
      Animated.timing(menuAnimation, {
        toValue: -width, // Déplacer le menu hors de l'écran
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Ouvrir le menu
      Animated.timing(menuAnimation, {
        toValue: 0, // Déplacer le menu dans l'écran
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setIsMenuOpen(!isMenuOpen); // Inverser l'état du menu
  };

  return (
    <View style={styles.container}>
      {/* En-tête : Logo et menu burger */}
      <View style={styles.header}>
        <Text style={styles.logo}>NAMBA</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
      </View>

      {/* Contenu principal */}
      <View style={styles.content}>
        <Text style={styles.mainText}>Rendez-vous la</Text>
        <Text style={styles.highlightedText}>vie Facile</Text>

        {/* Bouton */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Voir Nos Services</Text>
        </TouchableOpacity>
      </View>

      {/* Menu */}
      <Animated.View
        style={[
          styles.menu,
          {
            transform: [{ translateX: menuAnimation }], // Appliquer l'animation de translation
          },
        ]}
      >
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>À propos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Contact</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.75, // 50% de la hauteur de l'écran
    backgroundColor: '#AFC9F0', // Bleu clair
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: width * 0.05, // Ajustement pour les marges
    overflow: 'hidden', // Pour empêcher le menu de déborder
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
  },
  logo: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  menuIcon: {
    fontSize: 44,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: colors.secondary,
  },
  highlightedText: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: colors.yellow, // Jaune
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.secondary,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.7, // Largeur du menu (70% de l'écran)
    height: height,
    backgroundColor: colors.primary, // Couleur de fond du menu
    paddingTop: 100, // Espace pour le header
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  menuText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: colors.secondary,
  },
});

export default Home;