import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/Colors';
import NavMenu from '@/components/navMenu';

export default function TabsLayout() {
  return (
    <>
      {/* <NavMenu /> */}
      <Tabs
        screenOptions={{
          headerShown: false, // Cache le header si non nécessaire
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text,
          tabBarStyle: {
            backgroundColor: colors.secondary,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Accueil',
            tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="services"
          options={{
            title: 'Services',
            tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: 'Chat',
            tabBarIcon: ({ color }) => <Ionicons name="chatbubbles" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Paramètres',
            tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
