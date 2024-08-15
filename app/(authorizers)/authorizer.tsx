import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import CoursesToAuthorize from '@/components/authorizer/CoursesToAuthorize'

const Authorizer = () => {
    const coordinatorInfo = {
        name: 'Juan',
        lastName: 'Rodriguez',
        lastName2: 'Rodriguez',
        department: 'TIC\'s'
    }
    const cursos = [
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
            tipoAsignatura: "Carrera Genérica",
            actividadEvento: "Curso de Actualización",
            objetivo: "Actualizar los conocimientos en física cuántica",
            carrerasAtendidas: "Ingeniería Física, Ingeniería Matemática",
            periodo: "E-J",
            fechaCurso: "2024-06-15",
            turno: "Matutino",
            facilitadores: "Dr. Carlos Sánchez, Dra. María García"
        },

        // Más cursos pueden ser añadidos aquí
    ];
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.welcomeText}>
                    Bienvenido Autorizador
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
                <Text style={styles.subtitleText}>
                    Cursos por Autorizar
                </Text>
            </View>

            <View style={styles.contentContainer}>
                <CoursesToAuthorize courseData={cursos} />
            </View>
        </SafeAreaView>
    )
}

export default Authorizer;

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