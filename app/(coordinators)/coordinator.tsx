import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Alert, Button, SafeAreaView } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import RegisteredDiagnosis from '@/components/coordinator/RegisteredCourses';
import RegisteredCourses from '@/components/coordinator/RegisteredCourses';
import AuthorizedDiagnosis from '@/components/coordinator/AuthorizedDiagnosis';


const Coordinator = () => {
  const coordinatorInfo = {
    name: 'Juan',
    lastName: 'Rodriguez',
    lastName2: 'Rodriguez',
    department: 'TIC\'s'
  }

  const [selectedOption, setSelectedOption] = useState<'authorizedCourses' | 'registeredDiagnosis' | null>('authorizedCourses');

  const handleButtonPress = (component: 'authorizedCourses' | 'registeredDiagnosis') => {
    setSelectedOption(component);
  }
  return (
    <SafeAreaView style={styles.container}>

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
          <Text style={styles.buttonText}>Diagnosticos Autorizados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, selectedOption === 'registeredDiagnosis' && styles.buttonSelected]}
          onPress={() => handleButtonPress('registeredDiagnosis')}>
          <Text style={styles.buttonText}>Cursos Registrados</Text>
        </TouchableOpacity>

      </View>


      <View style={styles.contentContainer}>
        {selectedOption === 'authorizedCourses' && <AuthorizedDiagnosis />}
        {selectedOption === 'registeredDiagnosis' && <RegisteredDiagnosis />}
      </View>
    </SafeAreaView>
  )
}

export default Coordinator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  gearButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '100%', // Ensure the content container takes up the full width
    backgroundColor: '#fff', // Ensure the background is white
  },  
});