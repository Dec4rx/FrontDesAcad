import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Alert, Button ,SafeAreaView} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import DiagnosisOfNeeds from '@/components/academicHeads/DiagnosisOfNeeds';
import RegisterDiagnosis from '@/components/academicHeads/DiagnosisOfNeeds';

const AcademicHead = () => {
  const academicHeadInfo = {
    name: 'Juan',
    lastName: 'Rodriguez',
    lastName2: 'Rodriguez',
    department: 'TIC\'s'
  }
  const diagnosis = [
    {
        id: 1,
        departamentoAcademico: "Ciencias Exactas",
        fechaDiagnostico: "2024-05-01",
        titularDepartamento: "Dr. Juan Pérez",
        presidenteAcademia: "Dra. Ana López",
        titularSubdireccion: "Lic. Roberto Hernández",
        asignaturasRequeridas: "Matemáticas Avanzadas, Física Cuántica",
        contenidosTematicos: "Cálculo Integral, Mecánica Cuántica",
        numeroDocentes: 10,
        tipoAsignatura: "Asignatura Genérica",
        actividadEvento: "Curso de Actualización",
        objetivo: "Actualizar los conocimientos en física cuántica",
        carrerasAtendidas: "Ingeniería Física, Ingeniería Matemática",
        periodo: "E-J",
        fechaCurso: "2024-06-15",
        turno: "Matutino",
        estado: "Aprobado",
        facilitadores: "Dr. Carlos Sánchez, Dra. María García"
    },

    // Más cursos pueden ser añadidos aquí
];
return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>
                Bienvenido Jefe Académico
                <Text style={{ color: '#8B0000' }}>
                    {` ${academicHeadInfo.name} ${academicHeadInfo.lastName} ${academicHeadInfo.lastName2}`}
                </Text>
            </Text>
            <Text style={styles.departmentText}>
                Del Departamento
                <Text style={{ color: '#8B0000' }}>
                    {` ${academicHeadInfo.department}`}
                </Text>
            </Text>
            <Text style={styles.subtitleText}>
                Diagnósticos de necesidades
            </Text>
        </View>

        <View style={styles.contentContainer}>
            <DiagnosisOfNeeds diagnosisData={diagnosis} />
        </View>
    </SafeAreaView>
)
}

export default AcademicHead;

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
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
contentContainer: {
    flex: 1,
    width: '100%', // Ensure the content container takes up the full width
    backgroundColor: '#fff', // Ensure the background is white
  },
});