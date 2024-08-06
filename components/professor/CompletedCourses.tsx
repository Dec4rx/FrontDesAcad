import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import React from 'react';

interface ItemProps {
    nombreCurso: string,
    fechaInicio: string,
    fechaFin: string,
    turno: string,
    horario: string,
    requerimientos: string
}

const CompletedCourses = () => {
    const cursos = [
        {
            id: 1,
            nombreCurso: "Introducción a React",
            fechaInicio: "2024-09-01",
            fechaFin: "2024-10-01",
            turno: "Matutino",
            horario: "08:00 - 10:00 AM",
            requerimientos: "Conocimientos básicos de JavaScript"
        },
        {
            id: 2,
            nombreCurso: "Desarrollo Avanzado con Node.js",
            fechaInicio: "2024-10-15",
            fechaFin: "2024-12-15",
            turno: "Vespertino",
            horario: "03:00 - 05:00 PM",
            requerimientos: "Experiencia previa con Node.js y bases de datos"
        },

        // Más cursos pueden ser añadidos aquí
    ];
    const handleDownloadCertificate = () => {
        // Lógica para inscribir el curso
        console.log('Curso inscrito');
      };

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
                            nombreCurso={item.nombreCurso}
                            fechaInicio={item.fechaInicio}
                            fechaFin={item.fechaFin}
                            turno={item.turno}
                            horario={item.horario}
                            requerimientos={item.requerimientos}
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
