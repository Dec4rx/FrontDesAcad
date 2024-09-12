import { Alert, Modal, View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NewCourseRegistration from './modals/NewCourseRegistration';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router/build/useFocusEffect';
import { UserData } from '@/services/interfaces/UserInterface';

interface ItemProps {
    id: number,
    nombreCurso: string,
    fechaInicio: string,
    fechaFin: string,
    turno: string,
    horario: string,
    cupo: number,
    requerimientos: string
}


interface ModalProps {
    id: number,
    nombreCurso: string,
}

const CourseRegistration = (props: UserData) => {
    
    const cursos = [
        {
            id: 1,
            nombreCurso: "Introducción a React",
            fechaInicio: "2024-09-01",
            fechaFin: "2024-10-01",
            turno: "Matutino",
            horario: "08:00 - 10:00 AM",
            cupo: 20,
            requerimientos: "Conocimientos básicos de JavaScript"
        },
        {
            id: 2,
            nombreCurso: "Desarrollo Avanzado con Node.js",
            fechaInicio: "2024-10-15",
            fechaFin: "2024-12-15",
            turno: "Vespertino",
            horario: "03:00 - 05:00 PM",
            cupo: 15,
            requerimientos: "Experiencia previa con Node.js y bases de datos"
        },

        // Más cursos pueden ser añadidos aquí
    ];

    const [modalVisible, setModalVisible] = useState(false);

    const handleConfirm = () => {
        // Lógica para inscribir el curso
        console.log('Curso inscrito');
    };

    const Item: React.FC<ItemProps> = ({ id, nombreCurso, fechaInicio, fechaFin, turno, horario, cupo, requerimientos }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{nombreCurso}</Text>
            <Text style={styles.cell}>{fechaInicio}</Text>
            <Text style={styles.cell}>{fechaFin}</Text>
            <Text style={styles.cell}>{turno}</Text>
            <Text style={styles.cell}>{horario}</Text>
            <Text style={styles.cell}>{cupo}</Text>
            <Text style={styles.cell}>{requerimientos}</Text>
            <View style={styles.cell}>
                {/* <TouchableOpacity style={styles.buttonInscribir} onPress={() => ModalRegister(id, nombreCurso)}> */}
                <TouchableOpacity style={styles.buttonInscribir} onPress={() => setModalVisible(!modalVisible)}>
                    <Ionicons name='add-circle-outline' size={35} color="#2f64ba" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ScrollView horizontal style={styles.container}>

            <NewCourseRegistration
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                onConfirm={handleConfirm}
            />

            <View>
                <View style={styles.rowHeader}>
                    <Text style={styles.headerCell}>Nombre del Curso</Text>
                    <Text style={styles.headerCell}>Fecha de Inicio</Text>
                    <Text style={styles.headerCell}>Fecha de Fin</Text>
                    <Text style={styles.headerCell}>Turno</Text>
                    <Text style={styles.headerCell}>Horario</Text>
                    <Text style={styles.headerCell}>Cupo</Text>
                    <Text style={styles.headerCell}>Requerimientos</Text>
                    <Text style={styles.headerCell}>Inscribir</Text>
                </View>
                <FlatList
                    data={cursos}
                    renderItem={({ item }) => (
                        <Item
                            id={item.id}
                            nombreCurso={item.nombreCurso}
                            fechaInicio={item.fechaInicio}
                            fechaFin={item.fechaFin}
                            turno={item.turno}
                            horario={item.horario}
                            cupo={item.cupo}
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
    buttonCross: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 10,
        padding: 13,
        elevation: 2,
        margin: 5,
    },
    buttonRegister: {
        backgroundColor: '#1B396A',
    },
    buttonClose: {
        backgroundColor: '#8B0000'
    },
    textStyle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Distribuye el espacio entre los botones
        marginTop: 15,
    },


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
    buttonInscribir: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    }
});

export default CourseRegistration;
