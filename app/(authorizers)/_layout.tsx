import { Stack } from 'expo-router'
import React from 'react';

export default function AuthorizersLayout() {
    return (
        <Stack>

            <Stack.Screen name="loginAuthorizers" options={{ headerShown: false }} />
            <Stack.Screen name="authorizer" options={{ headerShown: false }} />
            {/* <Stack.Screen name="" options={{ headerShown: false }} /> */}
        </Stack>
    );
}