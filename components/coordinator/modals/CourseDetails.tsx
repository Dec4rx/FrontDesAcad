import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';
import LargeModalView from '../utils/LargeModalView';
import Entypo from '@expo/vector-icons/Entypo';
import SmallModalView from '../utils/SmallModalView';


interface CourseDetails {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    courseData: FormCourseState
}

interface FormCourseState {
    id: number;
    departamentoAcademico: string;
    fechaRealizacionDiagnostico: string;
    titularDepartamento: string;
    presidenteAcademia: string;
    titularSubdireccion: string;
    asignaturasRequeridas: string;
    contenidosTematicos: string;
    numeroDocentes: number;
    tipoAsignatura: string;
    actividadEvento: string;
    objetivo: string;
    carrerasAtendidas: string;
    periodo: string;
    fechaCurso: string;
    turno: string;
    facilitadores: string;
}
const { width } = Dimensions.get('window');
const CourseDetails: React.FC<CourseDetails> = ({ modalVisible, setModalVisible, courseData }) => {
    const isLargeScreen = width > 600;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <ScrollView>
                        <View style={styles.modalView}>

                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Entypo name="cross" size={35} color="black" />
                        </TouchableOpacity>

                        {isLargeScreen ?
                            <LargeModalView courseData={courseData} /> :
                            <SmallModalView courseData={courseData} />
                        }

                        </View>
                </ScrollView>
            </View>
        </Modal>
    );
}

export default CourseDetails;

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