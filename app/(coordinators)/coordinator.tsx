import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Alert, Button } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import AuthorizedCourses from '@/components/coordinator/AuthorizedCourses';
import RegisteredCurses from '@/components/coordinator/RegisteredCourses';

export default function Coordinator() {
    const coordinatorInfo = {
        name: 'Juan',
        lastName: 'Rodriguez',
        lastName2: 'Rodriguez',
        department: 'TIC\'s'
    }

    const [selectedOption, setSelectedOption] = useState<'authorizedCourses' | 'registeredCourses' | null>('authorizedCourses');

    const handleButtonPress = (component: 'authorizedCourses' | 'registeredCourses') => {
        setSelectedOption(component);
    }
    return (
        <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Bienvenido Coordinador
        <Text style={{ color: '#8B0000' }}>
          {` ${coordinatorInfo.name} ${coordinatorInfo.lastName} ${coordinatorInfo.lastName2}`}
        </Text>
      </Text>
      <Text style={styles.departmentText}>
        Del Departamento
        <Text style={{ color: '#8B0000' }}>
          {` ${coordinatorInfo.department}`}
        </Text>
      </Text>


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, selectedOption === 'authorizedCourses' && styles.buttonSelected]}
          onPress={() => handleButtonPress('authorizedCourses')}>
          <Text style={styles.buttonText}>Cursos Autorizados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, selectedOption === 'registeredCourses' && styles.buttonSelected]}
          onPress={() => handleButtonPress('registeredCourses')}>
          <Text style={styles.buttonText}>Cursos Registrados</Text>
        </TouchableOpacity>

      </View>

      {selectedOption === 'authorizedCourses' && <AuthorizedCourses />}
      {selectedOption === 'registeredCourses' && <RegisteredCurses />}

    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 20,
    },
    buttonContainer: {
      flexDirection: 'row', // Align items horizontally
      flexWrap: 'wrap', // Allow items to wrap to the next line if they exceed the container's width
      justifyContent: 'center', // Center the buttons horizontally
    },
    title: {
      fontSize: 24,
      color: '#8B0000',
      fontWeight: 'bold',
      marginBottom: 20
    },
    button: {
      backgroundColor: '#1B396A',
      color: 'white',
      padding: 10,
      borderRadius: 10,
      fontSize: 16,
      margin: 5
    },
    buttonSelected: {
      backgroundColor: '#2f64ba', // Color diferente para el botón seleccionado
      borderWidth: 2,
      borderColor: '#2f64ba', // Borde dorado para destacar el botón seleccionado
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    departmentText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });