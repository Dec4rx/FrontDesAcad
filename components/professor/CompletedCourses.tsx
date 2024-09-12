import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getCompletedCourses } from '@/services/CompletedCourses';

import React, { useCallback, useState } from 'react';
import { UserData } from '@/services/interfaces/UserInterface';
import { useFocusEffect } from 'expo-router';

interface courseData {
    id: number;
    courseName: string;
    startDate: string;
    endDate: string;
    shift: string;
    schedule: string;
    capacity: number;
    requirements: string;
    enabler: boolean;
}

interface ItemProps {
    nombreCurso: string;
    fechaInicio: string;
    fechaFin: string;
    turno: string;
    horario: string;
    requerimientos: string;
}

const CompletedCourses = (props: UserData) => {

    const handleDownloadCertificate = () => {
        // Lógica para inscribir el curso
        console.log('Curso inscrito');
    };

    const [cursos, setCourseData] = useState<courseData[]>([]);
    const handleGetCourses = async () => {
        try {
            console.log(props.id);
            const courses = await getCompletedCourses(props.id);
            console.log(courses);
            setCourseData(courses);
        } catch (error) {
            console.error(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            handleGetCourses();
        }, [])
    );

    

    const Item: React.FC<ItemProps> = ({ nombreCurso, fechaInicio, fechaFin, turno, horario, requerimientos }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{nombreCurso}</Text>
            <Text style={styles.cell}>{fechaInicio}</Text>
            <Text style={styles.cell}>{fechaFin}</Text>
            <Text style={styles.cell}>{turno}</Text>
            <Text style={styles.cell}>{horario}</Text>
            <Text style={styles.cell}>{requerimientos}</Text>
            <View style={styles.cell}>
                <TouchableOpacity style={styles.buttonDownload} onPress={() => handleDownloadCertificate()}>
                    <Ionicons name="download" size={35} color="#2f64ba" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ScrollView horizontal style={styles.container}>
            <View>
                <View style={styles.rowHeader}>
                    <Text style={styles.headerCell}>Nombre del Curso</Text>
                    <Text style={styles.headerCell}>Fecha de Inicio</Text>
                    <Text style={styles.headerCell}>Fecha de Fin</Text>
                    <Text style={styles.headerCell}>Turno</Text>
                    <Text style={styles.headerCell}>Horario</Text>
                    <Text style={styles.headerCell}>Requerimientos</Text>
                    <Text style={styles.headerCell}>Constancia</Text>
                </View>
                <FlatList
                    data={cursos}
                    renderItem={({ item }) => (
                        <Item
                            nombreCurso={item.courseName}
                            fechaInicio={item.startDate}
                            fechaFin={item.endDate}
                            turno={item.shift}
                            horario={item.schedule}
                            requerimientos={item.requirements}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff', // Asegúrate de que el fondo sea blanco
    },
    rowHeader: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: '#000',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        padding: 10,
    },
    headerCell: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cell: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
    },
    buttonDownload: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    }
});

export default CompletedCourses;
