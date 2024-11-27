import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { submitInstructor } from '@/services/AssignInstructor';



interface AddInstructor {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    course_id: number;
}


const AddInstructor: React.FC<AddInstructor> = ({ modalVisible, setModalVisible, course_id }) => {

    const [instructor, setInstructor] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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


                        <View>
                            <Text style={[styles.modalText]}>Ingrese el Nombre del Instructor</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setInstructor}
                                value={instructor}
                                placeholder="Nombre del Instructor"
                            />

                            <Text style={[styles.modalText]}>Ingrese el Usuario</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setUsername}
                                value={username}
                                placeholder="Usuario"
                            />

                            <Text style={[styles.modalText]}>Ingrese la Contraseña</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setPassword}
                                value={password}
                                placeholder="Contraseña"
                                secureTextEntry // Esto asegura que el texto se oculte mientras se escribe
                            />

                            <TouchableOpacity
                                style={[styles.button, styles.buttonRegister]}
                                onPress={() => {
                                    submitInstructor(instructor, username, password, course_id);
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={styles.textStyle}>Registrar Instructor</Text>
                            </TouchableOpacity>
                        </View>
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