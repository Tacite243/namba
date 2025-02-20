import { Stack } from 'expo-router';
import { colors } from '@/constants/Colors';



export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.secondary,
        headerTitleStyle: {
          fontFamily: 'Roboto-Bold',
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="booking/index" options={{ title: 'Réservation' }} />
      <Stack.Screen name="+not-found" options={{ title: '404' }} />
    </Stack>
  );
}