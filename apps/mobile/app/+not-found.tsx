import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/Colors';
import { fonts } from '@/constants/fonts';



const NotFound = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 - Page non trouvée</Text>
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
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.text,
  },
});

export default NotFound;