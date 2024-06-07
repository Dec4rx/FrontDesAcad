import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { useColorScheme } from '@/hooks/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const headerOptions: NativeStackNavigationOptions = {
    headerStyle: { backgroundColor: '#621132' },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: 24,
    },
    headerTitleAlign: 'center' as 'center',
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>

        <Stack.Screen name="index" options={{
          title: 'Cursos Intersemestrales',
          ...headerOptions
        }} />

        <Stack.Screen name="(academicDevelopment)" options={{
          title: 'Desarrollo Académico',
          ...headerOptions
        }} />

        <Stack.Screen name="(academicHeads)" options={{
          title: 'Jefes Académicos',
          ...headerOptions
        }} />

        <Stack.Screen name="(coordinators)" options={{
          title: 'Coordinadores',
          ...headerOptions
        }} />

        <Stack.Screen name="(professors)" options={{
          title: 'Profesores',
          ...headerOptions
        }} />
        <Stack.Screen name="(authorizers)" options={{
          title: 'Autorizadores',
          ...headerOptions
        }} />

        <Stack.Screen name="+not-found" />

        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

      </Stack>
    </ThemeProvider>
  );
}
