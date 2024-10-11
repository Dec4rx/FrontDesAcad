import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from 'react';
import { Diagnosis } from '@/services/interfaces/AcademicHead';
import { onAuthorize, onReject } from '@/services/Authorizer'

interface AuthorizeUnauthorize {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    onAuthorize: (id: number, authKey:string) => void;
    onReject: (id: number, feedback: string) => void;
    diagnosisData: Diagnosis;
}

const AuthorizeUnauthorize: React.FC<AuthorizeUnauthorize> = ({ modalVisible, setModalVisible, onAuthorize, onReject, diagnosisData}) => {
    const [feedback, setFeedback] = useState('');
    const [authKey, setAuthKey] = useState('');

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

                    <Text style={styles.modalText}>¿Está seguro de Autorizar este diagnóstico?</Text>
                    {/* Input field for authKey */}
                    <TextInput
                        style={styles.input}
                        onChangeText={setAuthKey}
                        value={authKey}
                        placeholder="Ingrese su clave aquí"
                    />
                    
                    
                        <TouchableOpacity
                            style={[styles.button, styles.buttonRegister]}
                            onPress={() => {
                                onAuthorize(diagnosisData.id, authKey);
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.textStyle}>Autorizar</Text>
                        </TouchableOpacity>
                    
                    {/* Input field for feedback */}
                    <TextInput
                        style={styles.input}
                        onChangeText={setFeedback}
                        value={feedback}
                        placeholder="Ingrese su feedback aquí"
                        multiline
                    />

                    
                        <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonReject]}
                            onPress={() => {
                                onReject(diagnosisData.id, feedback);
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.textStyle}>Rechazar/Retroalimentar</Text>
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

export default AuthorizeUnauthorize;

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
        width: '80%',
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
        marginHorizontal: 5,
        minWidth: 100,
        marginBottom: 15
    },
    buttonRegister: {
        backgroundColor: '#2f64ba',
    },
    buttonReject: {
        backgroundColor: '#ffa500',
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
    input: {
        width: '100%',
        minHeight: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
});
