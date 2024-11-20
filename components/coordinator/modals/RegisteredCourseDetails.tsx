import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { CourseRegistered } from '@/services/interfaces/Coordinators';
import { ScrollView } from 'react-native-gesture-handler';
interface RegisteredCourseDetails {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    courseData: CourseRegistered;
}


const RegisteredCourseDetails: React.FC<RegisteredCourseDetails> = ({ modalVisible, setModalVisible, courseData }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <ScrollView>
                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Entypo name="cross" size={35} color="black" />
                        </TouchableOpacity>

                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', marginTop: 0 }]}>Nombre del Curso: </Text>
                            <Text style={styles.modalText}>{courseData.name}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', marginTop: 0 }]}>Departamento o Academia que Propone: </Text>
                            <Text style={styles.modalText}>{courseData.departament}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Coordinador del Curso o Academia: </Text>
                            <Text style={styles.modalText}>{courseData.coordinator_id}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Dirigido a: </Text>
                            <Text style={styles.modalText}>{courseData.aimedAt}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Tipo de Curso: </Text>
                            <Text style={styles.modalText}>{courseData.type}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Enfoque del Curso: </Text>
                            <Text style={styles.modalText}>{courseData.approach}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Persona a Impartir el curso: </Text>
                            <Text style={styles.modalText}>{courseData.personToTeach}</Text>
                            <Text style={styles.modalText}>({courseData.institutionOrAcademic})</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Fecha de Inicio: </Text>
                            <Text style={styles.modalText}>{courseData.startDate.toISOString().split('T')[0]}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Fecha de Término: </Text>
                            <Text style={styles.modalText}>{courseData.endDate.toISOString().split('T')[0]}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Lugar donde se Impartirá el Curso: </Text>
                            <Text style={styles.modalText}>{courseData.place}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Requisitos a Considerar: </Text>
                            <Text style={styles.modalText}>{courseData.requirements}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Justificación: </Text>
                            <Text style={styles.modalText}>{courseData.justification}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Objetivo: </Text>
                            <Text style={styles.modalText}>{courseData.objective}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Contenido Temático: </Text>
                            <Text style={styles.modalText}>{courseData.thematicContents}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Recursos Didácticos: </Text>
                            <Text style={styles.modalText}>{courseData.resources}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Fuentes de Información: </Text>
                            <Text style={styles.modalText}>{courseData.resources}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Fecha de Registro: </Text>
                            <Text style={styles.modalText}>{courseData.dateRegistration.toISOString().split('T')[0]}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Capacidad: </Text>
                            <Text style={styles.modalText}>{courseData.capacity}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Revisó: </Text>
                            <Text style={styles.modalText}>{courseData.review}</Text>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Autorizó: </Text>
                            <Text style={styles.modalText}>{courseData.authorization}</Text>
                        </View>

                    </View>
                </View>
            </ScrollView>
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
        margin: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        // alignItems: 'flex-start',
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
        flexWrap: 'wrap', // Permite que el texto pase a la siguiente línea
        overflow: 'hidden', // Asegura que el contenido no se desborde
        // justifyContent: 'center',
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
        marginBottom: 5,
        // textAlign: 'center',
        fontSize: 16,
    },
});