import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, _ScrollView } from 'react-native';
import { colors } from '@/constants/Colors';
import { fonts } from '@/constants/fonts';
import TeamSection from '@/components/teamSection';
import HelpSection from '@/components/helpSection';
import Testimonials from '@/components/testimonialSection';
import Footer from '@/components/footer';




const { height, width } = Dimensions.get('window');

const Home = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Contenu principal */}
        <View style={styles.content}>
          <Text style={styles.mainText}>Rendez-vous la</Text>
          <Text style={styles.highlightedText}>vie Facile</Text>

          {/* Bouton */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Voir Nos Services</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TeamSection />
      <Testimonials />
      <HelpSection />
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.75,
    backgroundColor: '#AFC9F0',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: width * 0.05,
    overflow: 'hidden',
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
    color: colors.yellow,
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
});

export default Home;
