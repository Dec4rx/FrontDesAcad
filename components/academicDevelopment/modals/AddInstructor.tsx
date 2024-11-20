import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { Diagnosis } from '@/services/interfaces/AcademicHead';



interface AddInstructor {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    course_id: number;
}


const AddInstructor: React.FC<AddInstructor> = ({ modalVisible, setModalVisible, course_id }) => {

    const [instructor, setInstructor] = useState('');

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


                        <View>


                            <Text style={[styles.modalText]}>Ingrese el Nombre del Instructor</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setInstructor}
                                value={instructor}
                                placeholder="Ingrese el instructor Nombre del Instructor Aquí"
                                multiline
                            />

                            <TouchableOpacity
                                style={[styles.button, styles.buttonRegister]}
                                onPress={() => {
                                    // onAuthorize(diagnosisData.id, authKey); TO DO AGREAGAR FUNCIONALIDAD
                                    console.log('Instructor: ', instructor);
                                    console.log('Course ID: ', course_id);
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={styles.textStyle}>Registrar Instructor</Text>
                            </TouchableOpacity>


                        </View>
                    </View>
                </View>
        </Modal >
    );
}

export default AddInstructor;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: '30%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
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
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 10,
    },
    buttonRegister: {
        backgroundColor: '#2f64ba',
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
        textAlign: 'center',
        fontSize: 18,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        minHeight: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
});