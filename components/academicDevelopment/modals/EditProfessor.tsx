import { Modal, View, Text, StyleSheet, TouchableOpacity, Button, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { router, Href } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-datepicker';
import { parseISO, parseJSON, set } from 'date-fns';
import { updateDiagnosis } from '@/services/Diagnosis';
import GenericModal from '@/components/utils/GenericModal';
import { Professor, ProfessorForm } from '@/services/interfaces/Professors';



interface ProfessorDetails {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    professorData: Professor;
}


const EditDiagnosis: React.FC<ProfessorDetails> = ({ modalVisible, setModalVisible, professorData }) => {

    // const [modalVisibleAuthUnauth, setModalVisibleAuthUnauth] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    console.log(professorData)
    const [form, setForm] = useState<ProfessorForm>({
        name: professorData.name,
        middleName: professorData.middleName,
        lastName: professorData.lastName,
        email: professorData.email,
        gender: professorData.gender,
        rfc: professorData.rfc,
        curp: professorData.curp,
        status: professorData.status,
        department: professorData.department
    });
    // console.log(form.dateDiagnosis)

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = <K extends keyof ProfessorForm>(prop: K, value: ProfessorForm[K]) => {
        setForm({ ...form, [prop]: value });
        setErrors({ ...errors, [prop]: '' }); // Limpiar el error del campo modificado
    };

    const handleOnUpdateProfessor = async () => {
        setIsLoading(true);
        setErrors({}); // Limpiar errores antes de enviar
        // console.log(diagnosisDataFormattedDate)

        // console.log(fieldsToUpdate)

        // console.log(tempJson);
        try {
            //TO DO CAMBIAR A UPDATEPROFESSOR
            const diagnosis = await updateDiagnosis(professorData.id, JSON.parse(JSON.stringify(form))); // TO DO: Implementar función de UPDATE
            console.log('Professor guardado exitosamente:', diagnosis);
            setModalVisible(false);
            // router.replace('/academicHead');
        } catch (error: any) {
            // Revisar la estructura del error capturado
            console.error('Error al guardar el Professor:', error);

            // Si el error capturado tiene una estructura con errores específicos
            if (error && typeof error === 'object') {
                setErrors(error); // Ajustar la estructura si es necesario según el formato del servidor
            } else {
                setErrors({ general: 'Error al guardar el Professor. Inténtalo de nuevo.' });
            }
        } finally {
            setIsLoading(false);
        }
    };




    if (isLoading) {
        return (
            <View style={styles.centeredLoading}>
                <ActivityIndicator size="large" color="#2f64ba" />
            </View>
        );
    }

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
                        <Text style={styles.title}>Actualizar Professor</Text>

                        <Text style={styles.label}>Nombre:</Text>
                        <TextInput
                            placeholder="Nombre"
                            value={form.name}
                            onChangeText={text => handleInputChange('name', text)}
                            style={[styles.input, errors.name ? styles.inputError : null]}
                        />
                        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                        <Text style={styles.label}>Apellido Paterno:</Text>
                        <TextInput
                            placeholder="Apellido Paterno"
                            value={form.middleName}
                            onChangeText={text => handleInputChange('middleName', text)}
                            style={[styles.input, errors.middleName ? styles.inputError : null]}
                        />
                        {errors.middleName && <Text style={styles.errorText}>{errors.middleName}</Text>}

                        <Text style={styles.label}>Apellido Materno:</Text>
                        <TextInput
                            placeholder="Presidente de Academia"
                            value={form.lastName}
                            onChangeText={text => handleInputChange('lastName', text)}
                            style={[styles.input, errors.lastName ? styles.inputError : null]}
                        />
                        {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

                        <Text style={styles.label}>Emali:</Text>
                        <TextInput
                            placeholder="Email"
                            value={form.email}
                            onChangeText={text => handleInputChange('email', text)}
                            style={[styles.input, errors.email ? styles.inputError : null]}
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                        <Text style={styles.label}>Género:</Text>
                        <Picker
                            selectedValue={form.gender}
                            style={[styles.picker, errors.gender ? styles.inputError : null]}
                            onValueChange={(itemValue) => handleInputChange('gender', itemValue)}
                        >
                            <Picker.Item label="Seleccione el género (en caso de desear modificarlo)" value="" />
                            <Picker.Item label="Femenino" value="femenino" />
                            <Picker.Item label="Masculino" value="masculino" />
                            <Picker.Item label="Otro" value="otro" />
                        </Picker>
                        {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

                        <Text style={styles.label}>RFC:</Text>
                        <TextInput
                            placeholder="RFC"
                            value={form.rfc}
                            onChangeText={text => handleInputChange('rfc', text)}
                            style={[styles.input, errors.rfc ? styles.inputError : null]}
                        />
                        {errors.rfc && <Text style={styles.errorText}>{errors.rfc}</Text>}

                        <Text style={styles.label}>CURP:</Text>
                        <TextInput
                            placeholder="CURP"
                            value={form.curp}
                            onChangeText={text => handleInputChange('curp', text)}
                            style={[styles.input, errors.curp ? styles.inputError : null]}
                        />
                        {errors.curp && <Text style={styles.errorText}>{errors.curp}</Text>}

                        <Text style={styles.label}>Departamento:</Text>
                        <TextInput
                            placeholder="Departamento"
                            value={form.department}
                            onChangeText={text => handleInputChange('department', text)}
                            style={[styles.input, errors.department ? styles.inputError : null]}
                        />
                        {errors.department && <Text style={styles.errorText}>{errors.department}</Text>}



                        <Button title="Actualizar Profesor" onPress={handleOnUpdateProfessor} />

                    </View>
                </View>
            </ScrollView>
        </Modal >
    );
}

export default EditDiagnosis;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
    },
    centeredLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
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
        fontSize: 16,
    },


    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        height: 50,
        backgroundColor: '#F0F0F0',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 10,
    },
    largeInput: {
        minHeight: 100
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    }
});