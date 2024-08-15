import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';

interface SetStatus {
    modalVisible: boolean;
    onConfirm: () => void;
    setModalVisible: (visible: boolean) => void;
}


const SetStatus: React.FC<SetStatus> = ({ modalVisible, setModalVisible, onConfirm }) => {
    const [selectedValue, setSelectedValue] = useState('');
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
                        
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Option 1" value="option1" />
                        <Picker.Item label="Option 2" value="option2" />
                        <Picker.Item label="Option 3" value="option3" />
                    </Picker>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonRegister]}
                            onPress={() => {
                                onConfirm();
                                setModalVisible(!modalVisible);
                            }}>
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
}

export default SetStatus;

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