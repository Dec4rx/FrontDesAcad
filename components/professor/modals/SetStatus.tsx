import { Modal, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { BASE_URL } from '@/constants/Services';

import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Asegúrate de importar la función de fetch o axios
// import axios from 'axios';


interface SetStatusProps {
    modalVisible: boolean;
    onConfirm: (newStatus: string) => void;
    setModalVisible: (visible: boolean) => void;
    professorId: number; // Añade el ID del profesor como prop
}

const SetStatus: React.FC<SetStatusProps> = ({ modalVisible, setModalVisible, onConfirm, professorId }) => {
    const [selectedValue, setSelectedValue] = useState('');

    const updateStatus = async () => {
        try {
            // Aquí se hace la solicitud al backend para actualizar el status
            const response = await fetch(`${BASE_URL}/professor/${professorId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: selectedValue }),

            });


            if (response.ok) {
                const updatedProfessor = await response.json();

                // Obtén los datos existentes del usuario
                const existingUserData = await AsyncStorage.getItem('userData');
                const userData = existingUserData ? JSON.parse(existingUserData) : {};

                // Actualiza solo el status del usuario
                userData.status = updatedProfessor.status;

                // Guarda los datos actualizados en AsyncStorage
                await AsyncStorage.setItem('userData', JSON.stringify(userData));

                onConfirm(updatedProfessor.status); // Actualiza la vista con el nuevo status
                setModalVisible(false); // Cierra el modal
                Alert.alert('Éxito', 'El status ha sido actualizado correctamente.');
            } else {
                // Manejo de errores según la respuesta del servidor
                Alert.alert('Error', 'No se pudo actualizar el status. Inténtalo de nuevo.');
            }
        } catch (error) {
            // Manejo de errores de conexión o petición
            console.error('Error actualizando el status:', error);
            Alert.alert('Error', 'Ocurrió un problema al conectar con el servidor.');
        }
    };

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

                    <Text style={styles.modalText}>Seleccione su estatus</Text>
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.dropdown}
                        onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Tiempo completo 40 hrs." value="Tiempo completo 40 hrs." />
                        <Picker.Item label="30 hrs." value="30 hrs." />
                        <Picker.Item label="20 hrs." value="20 hrs." />
                        <Picker.Item label="Asignatura" value="Asignatura" />
                        <Picker.Item label="Honorarios" value="Honorarios" />
                        <Picker.Item label="Interinato" value="Interinato" />
                    </Picker>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonRegister]}
                            onPress={updateStatus} // Llama a la función para actualizar el status
                        >
                            <Text style={styles.textStyle}>Actualizar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default SetStatus;

// Estilos permanecen igual
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
        padding: 20,
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
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
        backgroundColor: '#8B0000',
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
    dropdown: {
        height: 50,
        width: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
});
