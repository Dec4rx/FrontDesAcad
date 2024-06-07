import { Stack } from 'expo-router'
import React from 'react';

export default function AcademicDevelopmentLayout() {
    return (
        <Stack>

            <Stack.Screen name="loginAcademicDevelopment" options={{ headerShown: false }} />
            {/* <Stack.Screen name="" options={{ headerShown: false }} /> */}
        </Stack>
    );
}