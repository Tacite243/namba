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
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopColor: colors.border,
            borderTopWidth: 1,
            paddingBottom: 6,
            height: 60,
            elevation: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
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
