import { Stack } from 'expo-router'
import React from 'react';

export default function CoordinatorsLayout() {
    return (
        <Stack>

            <Stack.Screen name="loginCoordinators" options={{ headerShown: false }} />
            <Stack.Screen name="coordinator" options={{ headerShown: false }} />
            {/* <Stack.Screen name="" options={{ headerShown: false }} /> */}
        </Stack>
    );
}