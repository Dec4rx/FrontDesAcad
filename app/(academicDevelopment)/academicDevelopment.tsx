import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Alert, Button, SafeAreaView } from 'react-native';
import React, { useEffect, useState, useCallback, Component } from 'react';
import DiagnosisOfNeeds from '@/components/academicHeads/DiagnosisOfNeeds';
import RegisteredDiagnosis from '@/components/coordinator/RegisteredCourses';
import AcademicDevelopmentLayout from './_layout';
import RegisteredCoursesAD from '@/components/academicDevelopment/RegisteredCoursesAD';
import DiagnosisAD from '@/components/academicDevelopment/DiagnosisAD';
import ProfessorsAD from '@/components/academicDevelopment/ProfessorsAD';

const AcademicDevelopment = () => {
    const academicDevelopmentInfo =
    {
        name: 'Juan',
        lastName: 'Rodriguez',
        lastName2: 'Rodriguez',
        department: 'TIC\'s'
    }

    const handleStatus = () => {
        console.log('Status changed');
    }

    const [modalVisible, setModalVisible] = useState(false);

    const [selectedOption, setSelectedOption] = useState<'diagnosisOfNeeds' | 'registeredCourses' | 'professors' | null>('diagnosisOfNeeds');

    const handleButtonPress = (component: 'diagnosisOfNeeds' | 'registeredCourses' | 'professors') => {
        setSelectedOption(component);
    }


    return (
        <SafeAreaView style={styles.container}>


            <Text style={styles.welcomeText}>
                Bienvenido Jefe Académico
                <Text style={{ color: '#8B0000' }}>
                    {` ${academicDevelopmentInfo.name} ${academicDevelopmentInfo.lastName} ${academicDevelopmentInfo.lastName2}`}
                </Text>
            </Text>
            <Text style={styles.departmentText}>
                Del Departamento
                <Text style={{ color: '#8B0000' }}>
                    {` ${academicDevelopmentInfo.department}`}
                </Text>
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, selectedOption === 'diagnosisOfNeeds' && styles.buttonSelected]}
                    onPress={() => handleButtonPress('diagnosisOfNeeds')}>
                    <Text style={styles.buttonText}>Diágnosticos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, selectedOption === 'registeredCourses' && styles.buttonSelected]}
                    onPress={() => handleButtonPress('registeredCourses')}>
                    <Text style={styles.buttonText}>Cursos Registrados</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, selectedOption === 'professors' && styles.buttonSelected]}
                    onPress={() => handleButtonPress('professors')}>
                    <Text style={styles.buttonText}>Profesores</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
                {selectedOption === 'diagnosisOfNeeds' && <DiagnosisAD />}
                {selectedOption === 'registeredCourses' && <RegisteredCoursesAD />}
                {selectedOption === 'professors' && <ProfessorsAD />}
                {/* {selectedOption === 'RegisterDiagnosis' && <RegisterDiagnosis />} */}
            </View>
        </SafeAreaView>
    )
}

export default AcademicDevelopment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#1B396A',
        color: 'white',
        padding: 10,
        borderRadius: 10,
        fontSize: 16,
        margin: 5
    },
    title: {
        fontSize: 24,
        color: '#8B0000',
        fontWeight: 'bold',
        marginBottom: 20
    },
    buttonSelected: {
        backgroundColor: '#2f64ba', // Color diferente para el botón seleccionado
        borderWidth: 2,
        borderColor: '#2f64ba', // Borde dorado para destacar el botón seleccionado
    },
    buttonContainer: {
        flexDirection: 'row', // Align items horizontally
        flexWrap: 'wrap', // Allow items to wrap to the next line if they exceed the container's width
        justifyContent: 'center', // Center the buttons horizontally
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
    headerContainer: {
        borderBottomWidth: 2,
        borderColor: '#1B396A',
        width: '90%', // Asegura que el borde abarque todo el ancho del contenedor principal
        paddingTop: 20, // Opcional: para dar espacio vertical adicional
        paddingBottom: 3,
    },
    subtitleText: {
        fontSize: 24,
        color: '#1B396A',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    contentContainer: {
        flex: 1,
        width: '100%', // Ensure the content container takes up the full width
        backgroundColor: '#fff', // Ensure the background is white
    },
});