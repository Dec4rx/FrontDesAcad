import { Stack } from 'expo-router'
import React from 'react';

export default function ProfessorsLayout() {
    return (
        <Stack>

            <Stack.Screen name="loginProfessors" options={{ headerShown: false }} />
            <Stack.Screen name="professor" options={{ headerShown: false }} />
            <Stack.Screen name="registerProfessors" options={{headerShown: false}}/>

        </Stack>
    );
}