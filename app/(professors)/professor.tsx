import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React, { useCallback, useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import CurrentCourses from '@/components/professor/CurrentCourses';
import CourseRegistration from '@/components/professor/CourseRegistration';
import CompletedCourses from '@/components/professor/CompletedCourses';
import SetStatus from '@/components/professor/modals/SetStatus';
import { useFocusEffect } from 'expo-router/build/useFocusEffect';
import { UserData } from '@/services/interfaces/UserInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Professor = () => {
  const professorInfo = {
    name: 'Juan',
    lastName: 'Rodriguez',
    lastName2: 'Rodriguez',
    department: 'IDK'
  }
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    lastName: '',
    middleName: '',
    name: '',
    gender: '',
    status: ''
  });

  const getUserData = async () => {
    try {
      const jsonUser = await AsyncStorage.getItem('userData');
      if (jsonUser != null) {
        console.log(jsonUser);
        const parsedUser: UserData = JSON.parse(jsonUser);
        setUserData(parsedUser);
        console.log("USER INFO:", userData)
      }
    } catch (e) {
      console.error('Error reading value:', e);
    }
  };

  
  useFocusEffect(
    useCallback(() => {
      getUserData(); // Esta función se ejecutaría cuando la pantalla esté enfocada
    }, [])
  );

  const handleStatus = () => {
    console.log('Status changed');
  }


  const [modalVisible, setModalVisible] = useState(false);

  const [selectedOption, setSelectedOption] = useState<'currentCourses' | 'courseRegistration' | 'completedCourses' | null>('currentCourses');

  const handleButtonPress = (component: 'currentCourses' | 'courseRegistration' | 'completedCourses') => {
    setSelectedOption(component);
  }

  return (
    <SafeAreaView style={styles.container}>

      <SetStatus modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onConfirm={handleStatus} />

      <Text style={styles.welcomeText}>
        Bienvenido Profesor
        <Text style={{ color: '#8B0000' }}>
          {` ${userData.name} ${userData.middleName} ${userData.lastName}`}
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
          <TouchableOpacity style={styles.gearButton} onPress={() => setModalVisible(!modalVisible)}>
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

      <View style={styles.contentContainer}>
        {selectedOption === 'currentCourses' && <CurrentCourses {...userData} />}
        {selectedOption === 'courseRegistration' && <CourseRegistration {...userData} />}
        {selectedOption === 'completedCourses' && <CompletedCourses{...userData} />}
      </View>
    </SafeAreaView>
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
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%', // Ensure the content container takes up the full width
    backgroundColor: '#fff', // Ensure the background is white
  },
});

export default Professor;

export interface CourseRegistrationProps {
  props: UserData;
}