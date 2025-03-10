import { Stack } from 'expo-router';
import { colors } from '@/constants/Colors';
import { Provider } from 'react-redux';
// import { store } from '@/redux/store';



export default function RootLayout() {
  return (
    // <Provider store={store}>
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
    // </Provider>
  );
}