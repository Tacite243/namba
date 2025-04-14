import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchServices } from '@/redux/slices/serviceSlices';
import ServiceCard from '@/components/ServiceCard';
import { colors } from '@/constants/Colors';
import { fonts } from '@/constants/fonts';

const Services = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { services, loading, error } = useSelector((state: RootState) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.feedbackContainer}>
          <ActivityIndicator size="large" color={colors.yellow} />
          <Text style={styles.feedbackText}>Chargement des services...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={[styles.feedbackContainer, styles.errorContainer]}>
          <Text style={[styles.feedbackText, styles.errorText]}>
            Une erreur est survenue : {error}
          </Text>
        </View>
      );
    }

    if (!services.length) {
      return (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackText}>Aucun service disponible pour le moment.</Text>
        </View>
      );
    }

    return services.map((service: any) => (
      <ServiceCard
        key={service.id}
        {...service}
        price={Number(service.price)}
        onPress={() =>
          router.push({
            pathname: "/reservation",
            params: {
              serviceId: service.id,
              name: service.name,
              description: service.description,
              price: service.price,
              unit: service.unit,
              image: service.image,
            },
          })
        }
      />
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      {/* En-tête (désactivé pour l’instant, mais prêt à l’usage) */}
      {/* 
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bienvenue chez NAMBA</Text>
        <Text style={styles.headerSubtitle}>
          Des services fiables, rapides et adaptés à vos besoins.
        </Text>
      </View> 
      */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nos Services</Text>
        {renderContent()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: colors.primary,
    marginBottom: 20,
  },
  feedbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 16,
  },
  feedbackText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.text || '#FFF',
    fontFamily: fonts.medium,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    padding: 16,
  },
  errorText: {
    color: colors.error || '#D32F2F',
  },
  // header désactivé mais prêt
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: '#F0F0F0',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default Services;
