import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
interface RegisteredCourseDetails {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    courseData: FormCourseState
}

interface FormCourseState {
    id: number;
    fechaRegistro: string;
    departamentoPropone: string;
    coordinador: string;
    nombreCurso: string;
    dirigidoA: string;
    tipoCurso: string;
    enfoqueCurso: string;
    personaImparte: string;
    institucionPertenece: string;
    fechaInicio: string;
    fechaTermino: string;
    numeroHoras: string;
    horario: string;
    lugarImparticion: string;
    requisitos: string;
    justificacion: string;
    objetivo: string;
    contenidoTematico:
    {
        tema: string;
        duracion: string;
        actividades: string;
        competencias: string;
        criterioEvaluacion: string;
        recursosDidacticos: string;
        fuentesInformacion: string;
    }[],
    autorizadoPor: string;
    revisadoPor: string;
}


const RegisteredCourseDetails: React.FC<RegisteredCourseDetails> = ({ modalVisible, setModalVisible, courseData }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>

                <View style={styles.modalView}>
                    <TouchableOpacity
                        style={{ alignSelf: 'flex-end' }}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Entypo name="cross" size={35} color="black" />
                    </TouchableOpacity>

                    <View style={styles.textRow}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', marginTop: 0}]}>Nombre del Curso: </Text>
                        <Text style={styles.modalText}>xd</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', marginTop: 0}]}>Departamento Academico: </Text>
                        <Text style={styles.modalText}>{}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Fecha de Realización del Diagnóstico: </Text>
                        <Text style={styles.modalText}>{}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Titular del Departamento: </Text>
                        <Text style={styles.modalText}>{}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Presidente de Academia: </Text>
                        <Text style={styles.modalText}>{}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Titular de la Subdirección Académica: </Text>
                        <Text style={styles.modalText}>{}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Asignaturas Requeridas: </Text>
                        <Text style={styles.modalText}>{}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Contenidos Temáticos: </Text>
                        <Text style={styles.modalText}>{}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Número de Docente que la Requieren: </Text>
                        <Text style={styles.modalText}>{}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Tipo de Asignatura: </Text>
                        <Text style={styles.modalText}>{}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Actividad o Evento: </Text>
                        <Text style={styles.modalText}>{}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Objetivo: </Text>
                        <Text style={styles.modalText}>{}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Carreras Atendidas: </Text>
                        <Text style={styles.modalText}>{}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Periodo: </Text>
                        <Text style={styles.modalText}>{}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Fecha del Curso: </Text>
                        <Text style={styles.modalText}>{}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Turno: </Text>
                        <Text style={styles.modalText}>{}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Facilitadores: </Text>
                        <Text style={styles.modalText}>{}</Text>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

export default RegisteredCourseDetails;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
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
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 10,
    },
    buttonRegister: {
        backgroundColor: '#2196F3',
    },
    buttonClose: {
        backgroundColor: '#f44336',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        // textAlign: 'center',
        fontSize: 16,
    },
});