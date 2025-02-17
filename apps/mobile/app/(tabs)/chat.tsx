import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/Colors';
import { fonts } from '@/constants/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chating = () => {
  const [messages, setMessages] = useState([
    { id: '1', user: 'admin', message: 'Bonjour, comment puis-je vous aider avec votre commande ?', time: '10:00', type: 'received' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [height, setHeight] = useState(new Animated.Value(40));  // Pour l'animation de la hauteur

  // Fonction pour charger les messages depuis AsyncStorage
  const loadMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem('messages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error('Error loading messages', error);
    }
  };

  // Fonction pour sauvegarder les messages dans AsyncStorage
  const saveMessages = async (newMessages: { id: string; user: string; message: string; time: string; type: string; }[]) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(newMessages));
    } catch (error) {
      console.error('Error saving messages', error);
    }
  };

  // Charger les messages lors de la première exécution
  useEffect(() => {
    loadMessages();
  }, []);

  // Fonction pour envoyer un message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: String(messages.length + 1),
        user: 'user',
        message: newMessage,
        time: new Date().toLocaleTimeString().slice(0, 5),
        type: 'sent',
      };

      // Ajouter le message envoyé par l'utilisateur
      const updatedMessages = [...messages, newMsg];
      setMessages(updatedMessages);

      // Sauvegarder les messages
      saveMessages(updatedMessages);

      // Réponse automatique de l'administrateur après un délai simulé
      setTimeout(() => {
        const adminResponse = {
          id: String(messages.length + 2),
          user: 'admin',
          message: 'Nous avons bien reçu votre message. Votre commande est en cours de préparation.',
          time: new Date().toLocaleTimeString().slice(0, 5),
          type: 'received',
        };
        const updatedMessagesWithResponse = [...updatedMessages, adminResponse];
        setMessages(updatedMessagesWithResponse);
        saveMessages(updatedMessagesWithResponse);
      }, 1500); // Délai de 1,5 secondes avant la réponse
    }
    setNewMessage('');
  };

  // Gérer la hauteur du champ de saisie du message
  const handleTextChange = (text: string) => {
    setNewMessage(text);

    // Dynamique : ajuster la hauteur du champ en fonction du texte
    Animated.timing(height, {
      toValue: text.length > 50 ? 80 : 40, // Si le texte est long, augmenter la hauteur
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // Affichage dynamique des messages (envoi ou réception)
  const renderMessage = ({ item }: { item: { id: string; user: string; message: string; time: string; type: string; } }) => (
    <View style={[styles.messageContainer, item.type === 'sent' ? styles.sentMessage : styles.receivedMessage]}>
      <Text style={styles.messageText}>{item.message}</Text>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Support Administrateur</Text>
        <Ionicons name="menu" size={24} color={colors.secondary} />
      </View>

      {/* Liste des messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
      />

      {/* Zone de saisie du message */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { height: height }]} // Hauteur dynamique
          value={newMessage}
          onChangeText={handleTextChange}
          placeholder="Écrire un message"
          placeholderTextColor={colors.text}
          returnKeyType="send"
          onSubmitEditing={handleSendMessage}
          multiline // Permet de saisir plusieurs lignes
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    color: colors.secondary,
  },
  messagesList: {
    paddingBottom: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 15,
    padding: 10,
    borderRadius: 15,
  },
  sentMessage: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: colors.tertiary,
    alignSelf: 'flex-start',
  },
  messageText: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  timeText: {
    color: colors.text,
    fontSize: 12,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: colors.text,
  },
  input: {
    flex: 1,
    backgroundColor: colors.secondary,
    color: colors.text,
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    textAlignVertical: 'top', // Texte aligné en haut
  },
  sendButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 30,
  },
});

export default Chating;
