import { Stack } from 'expo-router'
import React from 'react';

export default function AcademicHeadsLayout() {
    return (
        <Stack>

            <Stack.Screen name="loginAcademicHeads" options={{ headerShown: false }} />
            <Stack.Screen name="academicHead" options={{headerShown: false}}/>
            {/* <Stack.Screen name="" options={{ headerShown: false }} /> */}
        </Stack>
    );
}