import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import LottieView from 'lottie-react-native';
import { colors } from '@/constants/Colors';
import { fonts } from '@/constants/fonts';
import { useRouter } from 'expo-router';
import ServiceCard from '@/components/ServiceCard';

// Importez les images localement
import Image1 from '@/assets/images/services/young-smiling-woman-wearing-rubber-gloves-cleaning-stove.jpg';
import Image2 from '@/assets/images/services/woman-holding-rag-detergent-cleaning-cooker.jpg';
import Image3 from '@/assets/images/services/man-polishing-car-inside-car-service.jpg';
import Image4 from '@/assets/images/services/man-polishing-car-inside.jpg';
import Image5 from '@/assets/images/services/professional-industrial-cleaner-protective-uniform-cleaning-floor-food-processing-plant.jpg';
import Image6 from '@/assets/images/services/close-up-mop-cleaning-industrial-plant-floor.jpg';
import Image7 from '@/assets/images/services/people-taking-care-office-cleaning.jpg';
import Image8 from '@/assets/images/services/person-taking-care-office.jpg';

const Services = () => {
  const router = useRouter();
  const services = [
    {
      name: 'Lavage des linges',
      description: 'Nous nettoyons vos vêtements jusqu\'à ce qu\'ils deviennent comme neufs !',
      image: Image1, // Utilisez l'image importée
      hover: Image2,
      like: 5,
      price: 2,
      unit: 'le kilo',
    },
    {
      name: 'Nettoyage des draps, nattes...',
      description: 'Nous nettoyons vos draps et nattes jusqu\'à ce qu\'ils deviennent comme neufs !',
      image: Image3,
      hover: Image4,
      like: 4,
      price: 5,
      unit: 'le kilo',
    },
    {
      name: 'Repassage professionnel',
      description: 'Nous repassons vos vêtements avec soin.',
      image: Image5,
      hover: Image6,
      like: 4,
      price: 5,
      unit: 'le kilo',
    },
    {
      name: 'Service personnalisé',
      description: 'Exprimez ce que vous souhaitez que nous puissions faire pour vous.',
      image: Image5,
      hover: Image6,
      like: 4,
      price: '',
      unit: 'personnalisé',
    },
    {
      name: 'Nettoyage des Tapis',
      description: 'Nous nettoyons vos tapis jusqu\'à ce qu\'ils deviennent comme neufs !',
      image: Image7,
      hover: Image8,
      like: 4,
      price: 5,
      unit: 'le mètre carré',
    },
  ];

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bienvenue sur Namba</Text>
          <Text style={styles.headerSubtitle}>Nous vous offrons les meilleurs services pour répondre à vos besoins.</Text>
        </View>

        {/* Section Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nos Services</Text>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              price={Number(service.price)}
              onPress={() => router.push('/booking')}
            />
          ))}
        </View>

        {/* Animation Lottie */}
        {/* <LottieView
          source={require('@/assets/animations/soap-bubbles.json')}
          autoPlay
          loop
          style={styles.animation}
        /> */}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: fonts.bold,
    color: colors.secondary,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  headerSubtitle: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: colors.secondary,
    opacity: 0.8,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 26,
    fontFamily: fonts.bold,
    color: colors.secondary,
    marginBottom: 20,
  },
  animation: {
    width: '100%',
    height: 150,
    marginTop: 20,
  },
});

export default Services;