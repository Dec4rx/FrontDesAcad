import { Modal, View, Text, StyleSheet, TouchableOpacity, Button, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { Diagnosis, DiagnosisForm } from '@/services/interfaces/AcademicHead';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-datepicker';
import { parseISO, set } from 'date-fns';



interface DiagnosisOfNeedsDetails {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}


const GenerateRegistrationForm: React.FC<DiagnosisOfNeedsDetails> = ({ modalVisible, setModalVisible }) => {

    // const [modalVisibleAuthUnauth, setModalVisibleAuthUnauth] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState<RegistrationForm>({
        dateRegistration: new Date(),
        departament: '',
        coordinator: '',
        name: '',
        aimedAt: '',
        type: '',
        approach: '',
        personToTeach: '',
        institutionOrAcademic: '',
        startDate: new Date(),
        endDate: new Date(),
        numberHours: 0,
        shift: '',
        place: '',
        requirements: '',
        justification: '',
        objective: '',
        thematicContents: '',
        resources: '',
        informationSources: '',
        autoriazation: '',
        review: ''
    });


    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = <K extends keyof RegistrationForm>(prop: K, value: RegistrationForm[K]) => {
        setForm({ ...form, [prop]: value });
        setErrors({ ...errors, [prop]: '' }); // Limpiar el error del campo modificado
    };

    const handleSaveRegister = async () => {
        setIsLoading(true);
        setErrors({}); // Limpiar errores antes de enviar
        try {
            // const diagnosis = await registerDiagnostic(form); // TO DO: Implementar función de UPDATE
            // console.log('Diagnóstico guardado exitosamente:', diagnosis);
            setModalVisible(false);
        } catch (error: any) {
            // Revisar la estructura del error capturado
            console.error('Error al guardar el diagnóstico:', error);

            // Si el error capturado tiene una estructura con errores específicos
            if (error && typeof error === 'object') {
                setErrors(error); // Ajustar la estructura si es necesario según el formato del servidor
            } else {
                setErrors({ general: 'Error al guardar el diagnóstico. Inténtalo de nuevo.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div>
                <div>Cargando...</div>
            </div>
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

                        <Text style={styles.label}>Departamento Académico:</Text>
                        <TextInput
                            placeholder="Departamento Académico"
                            value={form.departament}
                            onChangeText={text => handleInputChange('departament', text)}
                            style={[styles.input, errors.departament ? styles.inputError : null]}
                        />
                        {errors.departament && <Text style={styles.errorText}>{errors.departament}</Text>}

                        <Text style={styles.label}>Fecha de Registro:</Text>
                        <DatePicker
                            selected={form.dateRegistration}
                            onChange={(date: Date | null) => {
                                if (date) handleInputChange('dateRegistration', date);
                            }}
                            dateFormat="dd/MM/yyyy"
                            className={`date-picker-input ${errors.dateDiagnosis ? 'input-error' : ''}`}
                        />
                        {errors.dateDiagnosis && <Text style={styles.errorText}>{errors.dateDiagnosis}</Text>}

                        <Text style={styles.label}>Coordinador del Curso o Academia:</Text>
                        <TextInput
                            placeholder="Coordinador"
                            value={form.coordinator}
                            onChangeText={text => handleInputChange('coordinator', text)}
                            style={[styles.input, errors.headDepartment ? styles.inputError : null]}
                        />
                        {errors.headDepartment && <Text style={styles.errorText}>{errors.headDepartment}</Text>}

                        <Text style={styles.label}>Dirigido a:</Text>
                        <TextInput
                            placeholder="Dirigido a"
                            value={form.aimedAt}
                            onChangeText={text => handleInputChange('aimedAt', text)}
                            style={[styles.input, errors.presidentAcademy ? styles.inputError : null]}
                        />
                        {errors.presidentAcademy && <Text style={styles.errorText}>{errors.presidentAcademy}</Text>}

                        <Text style={styles.label}>Tipo de Curso:</Text>
                        <Picker
                            selectedValue={form.type}
                            style={[styles.picker, errors.typeSubject ? styles.inputError : null]}
                            onValueChange={(itemValue) => handleInputChange('type', itemValue)}
                        >
                            <Picker.Item label="Seleccione el Tipo" value="" />
                            <Picker.Item label="Formación Docente" value="Formación Docente" />
                            <Picker.Item label="Desarrollo Profesional" value="Desarrollo Profesional" />
                            <Picker.Item label="Superación Personal" value="Superación Personal" />
                        </Picker>
                        {errors.typeSubject && <Text style={styles.errorText}>{errors.typeSubject}</Text>}


                        <Text style={styles.label}>Enfoque del Curso:</Text>
                        <Picker
                            selectedValue={form.type}
                            style={[styles.picker, errors.typeSubject ? styles.inputError : null]}
                            onValueChange={(itemValue) => handleInputChange('type', itemValue)}
                        >
                            <Picker.Item label="Seleccione el Enfoque" value="" />
                            <Picker.Item label="Reforzamiento" value="Reforzamiento" />
                            <Picker.Item label="Nivel" value="Nivel" />
                            <Picker.Item label="Actualización" value="Actualización" />
                        </Picker>
                        {errors.typeSubject && <Text style={styles.errorText}>{errors.typeSubject}</Text>}


                        <Text style={styles.label}>Persona a Impartir el Curso:</Text>
                        <TextInput
                            placeholder="Persona a Impartir el Curso"
                            value={form.personToTeach}
                            onChangeText={text => handleInputChange('personToTeach', text)}
                            style={[styles.input, errors.titleSubdirectorate ? styles.inputError : null]}
                        />
                        {errors.titleSubdirectorate && <Text style={styles.errorText}>{errors.titleSubdirectorate}</Text>}

                        <Text style={styles.label}>Institución o Academia a la que pertenece:</Text>
                        <TextInput
                            placeholder="Institución o Academia"
                            value={form.institutionOrAcademic}
                            onChangeText={text => handleInputChange('institutionOrAcademic', text)}
                            style={[styles.input, errors.requiredSubjects ? styles.inputError : null]}
                        />
                        {errors.requiredSubjects && <Text style={styles.errorText}>{errors.requiredSubjects}</Text>}

                        <Text style={styles.label}>Fecha inicio del Curso: {form.startDate.toLocaleDateString('es-ES')}</Text>
                        <DatePicker
                            selected={form.startDate}
                            onChange={(date: Date | null) => {
                                if (date) handleInputChange('startDate', date);
                            }}
                            dateFormat="dd/MM/yyyy"
                            className={`date-picker-input ${errors.startDate ? 'input-error' : ''}`}
                            minDate={new Date(new Date().getFullYear(), 5, 18)}//TO DO: Check this
                            maxDate={new Date(new Date().getFullYear() + 1, 0, 10)}
                        />
                        {errors.startDate && <Text style={styles.errorText}>{errors.startDate}</Text>}

                        <Text style={styles.label}>Fecha fin del Curso:</Text>
                        <DatePicker
                            selected={form.endDate}
                            onChange={(date: Date | null) => {
                                if (date) handleInputChange('endDate', date);
                            }}
                            dateFormat="dd/MM/yyyy"
                            className={`date-picker-input ${errors.endDate ? 'input-error' : ''}`}
                            minDate={new Date(new Date().getFullYear(), 5, 18)}//TO DO: Check this
                            maxDate={new Date(new Date().getFullYear() + 1, 0, 10)}
                            // placeholderText={form.endDate ? form.endDate.toLocaleDateString('es-ES') : 'Selecciona una fecha'}
                        />
                        {errors.endDate && <Text style={styles.errorText}>{errors.endDate}</Text>}

                        <Text style={styles.label}>Numero de horas:</Text>
                        <TextInput
                            placeholder="Número de horas"
                            keyboardType="numeric"
                            value={form.numberHours.toString()}
                            onChangeText={text => handleInputChange('numberHours', Number(text))}
                            style={[styles.input, errors.numberProfessors ? styles.inputError : null]}
                        />
                        {errors.numberProfessors && <Text style={styles.errorText}>{errors.numberProfessors}</Text>}

                       
                        <Text style={styles.label}>Horario:</Text>
                        <TextInput
                            placeholder="Horario"
                            value={form.shift}
                            onChangeText={text => handleInputChange('shift', text)} //TO DO: Check this
                            style={[styles.input, errors.activityEvent ? styles.inputError : null]}
                        />
                        {errors.activityEvent && <Text style={styles.errorText}>{errors.activityEvent}</Text>}

                        <Text style={styles.label}>Justificación:</Text>
                        <TextInput
                            placeholder="Justificación"
                            value={form.justification}
                            onChangeText={text => handleInputChange('justification', text)}
                            style={[styles.input, errors.objective ? styles.inputError : null]}
                        />
                        {errors.objective && <Text style={styles.errorText}>{errors.objective}</Text>}

                        <Text style={styles.label}>Objetivo:</Text>
                        <TextInput
                            placeholder="Objetivo"
                            value={form.objective}
                            onChangeText={text => handleInputChange('objective', text)}
                            style={[styles.input, errors.objective ? styles.inputError : null]}
                        />
                        {errors.objective && <Text style={styles.errorText}>{errors.objective}</Text>}

                        <Text style={styles.label}>Contenidos Temáticos:</Text>
                        <TextInput
                            placeholder="Contenidos Temáticos"
                            value={form.thematicContents}
                            onChangeText={text => handleInputChange('thematicContents', text)}
                            style={[styles.input, errors.thematicContents ? styles.inputError : null]}
                        />
                        {errors.thematicContents && <Text style={styles.errorText}>{errors.thematicContents}</Text>}
                        
                        <Text style={styles.label}>Recursos Didácticos:</Text>
                        <TextInput
                            placeholder="Recursos Didácticos"
                            value={form.resources}
                            onChangeText={text => handleInputChange('resources', text)}
                            style={[styles.input, errors.thematicContents ? styles.inputError : null]}
                        />
                        {errors.thematicContents && <Text style={styles.errorText}>{errors.thematicContents}</Text>}

                        <Text style={styles.label}>Fuentes de Información:</Text>
                        <TextInput
                            placeholder="Facilitadores Propuestos"
                            value={form.informationSources}
                            onChangeText={text => handleInputChange('informationSources', text)}
                            style={[styles.input, errors.facilitators ? styles.inputError : null]}
                        />
                        {errors.facilitators && <Text style={styles.errorText}>{errors.facilitators}</Text>}

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