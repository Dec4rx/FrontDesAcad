import { Modal, View, Text, StyleSheet, TouchableOpacity, Button, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { Diagnosis, DiagnosisForm } from '@/services/interfaces/AcademicHead';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-datepicker';
import { parseISO, set } from 'date-fns';
import { FormCourseRegistration } from '@/services/interfaces/Coordinators';
import { registerCourse } from '@/services/Course';



interface DiagnosisOfNeedsDetails {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    diagnosisData: Diagnosis;
}


const GenerateRegistrationForm: React.FC<DiagnosisOfNeedsDetails> = ({ modalVisible, setModalVisible, diagnosisData }) => {



    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState<FormCourseRegistration>({
        diagnosisId: diagnosisData.id,
        //coordinator_id: 1,TO DO: Check this and changue for the real id
        dateRegistration: parseISO(new Date().toISOString()),
        departament: diagnosisData.departament,
        courseName: '',
        aimedAt: '',
        type: '',
        approach: '',
        personToTeach: '',
        institutionOrAcademic: '',
        startDate: parseISO(diagnosisData.startDate),
        endDate: parseISO(diagnosisData.endDate),
        numberHours: 0,
        shift: diagnosisData.shift,
        place: '',
        requirements: diagnosisData.requiredSubjects,
        justification: '',
        objective: diagnosisData.objective,
        thematicContents: diagnosisData.thematicContents,
        resources: '',
        informationSources: '',
        authorization: '',
        review: '',
        capacity: diagnosisData.numberProfessors
    });


    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = <K extends keyof FormCourseRegistration>(prop: K, value: FormCourseRegistration[K]) => {
        setForm({ ...form, [prop]: value });
        setErrors({ ...errors, [prop]: '' }); // Limpiar el error del campo modificado
    };

    const handleSaveRegister = async () => {
        setIsLoading(true);
        setErrors({}); // Limpiar errores antes de enviar

        // Validación básica
        if (!form.courseName.trim() || !form.type) {
            setErrors({
                ...errors,
                name: form.courseName ? '' : 'El nombre del curso es necesario',
                type: form.type ? '' : 'Selecciona un tipo de curso',
            });
            setIsLoading(false);
            return;
        }

        try {
            const data = await registerCourse(form); // Llamada al servicio para registrar el curso
            console.log('Curso registrado exitosamente:', data);
            setModalVisible(false); // Cerrar el modal si el registro es exitoso
        } catch (error) {
            console.error('Error al guardar el curso:', error);
            setErrors({ general: (error as any).message || 'Error al guardar el curso. Inténtalo de nuevo.' });
        } finally {
            setIsLoading(false);
        }
    };



    if (isLoading) {
        return (
            <View style={styles.centeredView}>
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
                        <Text style={styles.title}>Registro de Curso</Text>

                        <Text style={styles.label}>Nombre del curso:</Text>
                        <TextInput
                            placeholder="Nombre del curso"
                            value={form.courseName}
                            onChangeText={text => handleInputChange('courseName', text)}
                            style={[styles.input, errors.name ? styles.inputError : null]}
                        />
                        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                        <Text style={styles.label}>Dirigido a:</Text>
                        <TextInput
                            placeholder="Dirigido a"
                            value={form.aimedAt}
                            onChangeText={text => handleInputChange('aimedAt', text)}
                            style={[styles.input, errors.aimedAt ? styles.inputError : null]}
                        />
                        {errors.aimedAt && <Text style={styles.errorText}>{errors.aimedAt}</Text>}

                        <Text style={styles.label}>Tipo de Curso:</Text>
                        <Picker
                            selectedValue={form.type}
                            style={[styles.picker, errors.type ? styles.inputError : null]}
                            onValueChange={(itemValue) => handleInputChange('type', itemValue)}
                        >
                            <Picker.Item label="Seleccione el Tipo" value="" />
                            <Picker.Item label="Formación Docente" value="Formación Docente" />
                            <Picker.Item label="Desarrollo Profesional" value="Desarrollo Profesional" />
                            <Picker.Item label="Superación Personal" value="Superación Personal" />
                        </Picker>
                        {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}


                        <Text style={styles.label}>Enfoque del Curso:</Text>
                        <Picker
                            selectedValue={form.approach}
                            style={[styles.picker, errors.approach ? styles.inputError : null]}
                            onValueChange={(itemValue) => handleInputChange('approach', itemValue)}
                        >
                            <Picker.Item label="Seleccione el Enfoque" value="" />
                            <Picker.Item label="Reforzamiento" value="Reforzamiento" />
                            <Picker.Item label="Nivel" value="Nivel" />
                            <Picker.Item label="Actualización" value="Actualización" />
                        </Picker>
                        {errors.approach && <Text style={styles.errorText}>{errors.approach}</Text>}


                        <Text style={styles.label}>Persona a Impartir el Curso:</Text>
                        <TextInput
                            placeholder="Persona a Impartir el Curso"
                            value={form.personToTeach}
                            onChangeText={text => handleInputChange('personToTeach', text)}
                            style={[styles.input, errors.titleSubdirectorate ? styles.inputError : null]}
                        />
                        {errors.personToTeach && <Text style={styles.errorText}>{errors.personToTeach}</Text>}

                        <Text style={styles.label}>Institución o Academia a la que pertenece:</Text>
                        <TextInput
                            placeholder="Institución o Academia"
                            value={form.institutionOrAcademic}
                            onChangeText={text => handleInputChange('institutionOrAcademic', text)}
                            style={[styles.input, errors.institutionOrAcademic ? styles.inputError : null]}
                        />
                        {errors.institutionOrAcademic && <Text style={styles.errorText}>{errors.institutionOrAcademic}</Text>}

                        <Text style={styles.label}>Numero de horas:</Text>
                        <TextInput
                            placeholder="Número de horas"
                            keyboardType="numeric"
                            value={form.numberHours.toString()}
                            onChangeText={text => handleInputChange('numberHours', Number(text))}
                            style={[styles.input, errors.numberProfessors ? styles.inputError : null]}
                        />
                        {errors.numberHours && <Text style={styles.errorText}>{errors.numberHours}</Text>}

                        <Text style={styles.label}>Justificación:</Text>
                        <TextInput
                            placeholder="Justificación"
                            multiline
                            value={form.justification}
                            onChangeText={text => handleInputChange('justification', text)}
                            style={[styles.input, errors.justification ? styles.inputError : null, styles.largeInput]}
                        />
                        {errors.justification && <Text style={styles.errorText}>{errors.justification}</Text>}

                        <Text style={styles.label}>Recursos Didácticos:</Text>
                        <TextInput
                            placeholder="Recursos Didácticos"
                            multiline
                            value={form.resources}
                            onChangeText={text => handleInputChange('resources', text)}
                            style={[styles.input, errors.resources ? styles.inputError : null, styles.largeInput]}
                        />
                        {errors.resources && <Text style={styles.errorText}>{errors.resources}</Text>}

                        <Text style={styles.label}>Fuentes de Información:</Text>
                        <TextInput
                            placeholder="Fuentes de Información"
                            multiline
                            value={form.informationSources}
                            onChangeText={text => handleInputChange('informationSources', text)}
                            style={[styles.input, errors.informationSources ? styles.inputError : null, styles.largeInput]}
                        />
                        {errors.informationSources && <Text style={styles.errorText}>{errors.informationSources}</Text>}

                        <Text style={styles.label}>Lugar:</Text>
                        <TextInput
                            placeholder="Lugar donde se impartirá el curso"
                            value={form.place}
                            onChangeText={text => handleInputChange('place', text)}
                            style={[styles.input, errors.place ? styles.inputError : null]}
                        />
                        {errors.place && <Text style={styles.errorText}>{errors.place}</Text>}

                        <Text style={styles.label}>Autorizó:</Text>
                        <TextInput
                            placeholder="Nombre de quien autorizó"
                            value={form.authorization}
                            onChangeText={text => handleInputChange('authorization', text)}
                            style={[styles.input, errors.authorizedBy ? styles.inputError : null]}
                        />
                        {errors.authorizedBy && <Text style={styles.errorText}>{errors.authorizedBy}</Text>}

                        <Text style={styles.label}>Revisó:</Text>
                        <TextInput
                            placeholder="Nombre de quien revisó"
                            value={form.review}
                            onChangeText={text => handleInputChange('review', text)}
                            style={[styles.input, errors.reviewedBy ? styles.inputError : null]}
                        />
                        {errors.reviewedBy && <Text style={styles.errorText}>{errors.reviewedBy}</Text>}



                        <Button title="Crear Registro" onPress={handleSaveRegister} />

                    </View>
                </View>
            </ScrollView>
        </Modal >
    );
}

export default GenerateRegistrationForm;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 22,
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