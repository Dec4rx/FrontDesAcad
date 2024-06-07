import { Stack } from 'expo-router'
import React from 'react';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout1() {
  return (
    <Stack>

      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{headerShown: false}} />


    </Stack>
  );
}
