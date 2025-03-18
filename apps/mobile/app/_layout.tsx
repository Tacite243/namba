import { Stack } from 'expo-router';
import { colors } from '@/constants/Colors';
import ReduxProvider from '@/components/provider';



export default function RootLayout() {
  return (
    <ReduxProvider>
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
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="booking/index" options={{ title: 'Réservation' }} />
        <Stack.Screen name="+not-found" options={{ title: '404' }} />
      </Stack>
    </ReduxProvider>
  );
}