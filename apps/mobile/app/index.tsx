import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/Colors';


const Index = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/(auth)/login');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Namba</Text>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  logo: {
    fontSize: 32,
    fontFamily: 'Roboto-Bold',
    color: colors.primary,
  },
});

export default Index;