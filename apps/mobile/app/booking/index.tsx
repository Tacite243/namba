import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import DatePicker from 'react-native-date-picker';
import { colors } from '@/constants/Colors';
import { fonts } from '@/constants/fonts';
import { ArrowLeft, Calendar, CheckCircle, MapPin, Phone, User } from 'lucide-react-native';

const Booking = () => {
  const navigation = useNavigation();
  const { service, description, price, unit } = useLocalSearchParams();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const animatedScale = new Animated.Value(1);

  // Fonction d'animation au clic
  const handlePressIn = () => {
    Animated.spring(animatedScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const onSubmit = () => {
    Alert.alert("Réservation confirmée", `Votre réservation pour ${service || "le service"} a été envoyée.`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Bouton retour */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <ArrowLeft color={colors.primary} size={24} />
      </TouchableOpacity>

      <Text style={styles.title}>Réservez votre service</Text>
      <Text style={styles.subtitle}>{service ? `🛠️ ${service}` : "Sélectionnez un service"}</Text>
      {description && <Text style={styles.detailText}>📌 {description}</Text>}
      {price && <Text style={styles.detailText}>💰 {price} {unit}</Text>}

      {/* Nom */}
      <View style={styles.inputContainer}>
        <User color={colors.primary} size={20} style={styles.icon} />
        <Controller
          control={control}
          name="name"
          rules={{ required: "Le nom est requis" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.input, errors.name && styles.inputError]}
              placeholder="Votre nom"
              placeholderTextColor={colors.text}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      {/* {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>} */}

      {/* Téléphone */}
      <View style={styles.inputContainer}>
        <Phone color={colors.primary} size={20} style={styles.icon} />
        <Controller
          control={control}
          name="whatsappNumber"
          rules={{
            required: "Numéro WhatsApp requis",
            pattern: { value: /^[0-9]{9,12}$/, message: "Numéro invalide" }
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.input, errors.whatsappNumber && styles.inputError]}
              placeholder="Numéro WhatsApp"
              keyboardType="phone-pad"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      {/* {errors.whatsappNumber && <Text style={styles.errorText}>{errors.whatsappNumber.message}</Text>} */}

      {/* Adresse */}
      <View style={styles.inputContainer}>
        <MapPin color={colors.primary} size={20} style={styles.icon} />
        <Controller
          control={control}
          name="pickupAddress"
          rules={{ required: "Adresse requise" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.input, errors.pickupAddress && styles.inputError]}
              placeholder="Adresse de collecte"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      {/* {errors.pickupAddress && <Text style={styles.errorText}>{errors.pickupAddress.message}</Text>} */}

      {/* Email */}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email requis",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email invalide" }
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.input, errors.email && styles.inputError]}
              placeholder="Votre email"
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      {/* {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>} */}

      {/* Sélecteur de Date */}
      <TouchableOpacity style={styles.dateInput} onPress={() => setOpen(true)}>
        <Calendar color={colors.primary} size={20} style={styles.icon} />
        <Text style={styles.dateText}>{date.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>
      <DatePicker modal open={open} date={date} mode="date"
        onConfirm={(selectedDate) => { setDate(selectedDate); setOpen(false); }}
        onCancel={() => setOpen(false)}
      />

      {/* Bouton Réserver */}
      <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}
          onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <CheckCircle color={colors.secondary} size={20} style={styles.icon} />
          <Text style={styles.buttonText}>Réserver</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontFamily: fonts.bold,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginBottom: 10,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    elevation: 3,
  },
  buttonText: {
    color: colors.secondary,
    fontSize: 18,
    fontFamily: fonts.bold,
    marginLeft: 10,
  },
});

export default Booking;