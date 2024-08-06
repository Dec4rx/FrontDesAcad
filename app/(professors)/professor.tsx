import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Alert, Button } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import CurrentCourses from '@/components/professor/CurrentCourses';
import CourseRegistration from '@/components/professor/CourseRegistration';
import CompletedCourses from '@/components/professor/CompletedCourses';

const Professor = () => {
  const professorInfo = {
    name: 'Juan',
    lastName: 'Rodriguez',
    lastName2: 'Rodriguez',
    department: 'IDK'
  }

  const { width } = Dimensions.get('window'); // Get the width of the device window

  const [selectedOption, setSelectedOption] = useState<'currentCourses' | 'courseRegistration' | 'completedCourses' | null>('currentCourses');

  const handleButtonPress = (component: 'currentCourses' | 'courseRegistration' | 'completedCourses') => {
    setSelectedOption(component);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Bienvenido Profesor
        <Text style={{ color: '#8B0000' }}>
          {` ${professorInfo.name} ${professorInfo.lastName} ${professorInfo.lastName2}`}
        </Text>
      </Text>
      <Text style={styles.departmentText}>
        Del Departamento
        <Text style={{ color: '#8B0000' }}>
          {` ${professorInfo.department}`}
        </Text>
      </Text>

      <Text style={styles.departmentText}>
        Estatus:
        <Text style={{ color: '#8B0000' }}>
          {` Tiempo completo 40hrs `}
          <TouchableOpacity style={styles.gearButton}>
            <FontAwesome6 name='gear' size={20} color={"#1B396A"} />
          </TouchableOpacity>
        </Text>
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, selectedOption === 'currentCourses' && styles.buttonSelected]}
          onPress={() => handleButtonPress('currentCourses')}>
          <Text style={styles.buttonText}>Cursos Actuales</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, selectedOption === 'courseRegistration' && styles.buttonSelected]}
          onPress={() => handleButtonPress('courseRegistration')}>
          <Text style={styles.buttonText}>Inscripción</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, selectedOption === 'completedCourses' && styles.buttonSelected]}
          onPress={() => handleButtonPress('completedCourses')}>
          <Text style={styles.buttonText}>Cursos Terminados</Text>
        </TouchableOpacity>
      </View>

      {selectedOption === 'currentCourses' && <CurrentCourses />}
      {selectedOption === 'courseRegistration' && <CourseRegistration />}
      {selectedOption === 'completedCourses' && <CompletedCourses />}

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
  gearButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default Professor