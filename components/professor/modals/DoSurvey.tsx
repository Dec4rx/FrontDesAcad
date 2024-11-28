import { Modal, View, Text, StyleSheet, TouchableOpacity, Button, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { Diagnosis, DiagnosisForm } from '@/services/interfaces/AcademicHead';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-datepicker';
import { parseISO, set } from 'date-fns';
import { FormCourseRegistration } from '@/services/interfaces/Coordinators';
import { registerCourse } from '@/services/Course';
import { Answers, Questions, SurveyResponse } from '@/services/interfaces/Surveys';
import { submitSurvey } from '@/services/Surveys';
import { BASE_URL } from '@/constants/Services';



interface DiagnosisOfNeedsDetails {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    surveyId: number;
}


const DoSurvey: React.FC<DiagnosisOfNeedsDetails> = ({ modalVisible, setModalVisible, surveyId }) => {



    const [isLoading, setIsLoading] = useState(true);

    const [questions, setQuestions] = useState<Questions[]>([]);

    const [form, setForm] = useState<SurveyResponse>({
        surveyId: surveyId,
        answers: []
    });


    function transformForm(form: SurveyResponse) {
        const updatedAnswers = Object.entries(form.answers).reduce((acc: Record<number, any>, [id, answer]) => {
            // Crear la nueva clave usando questionId
            const questionId = parseInt(id, 10); // Asegura que sea un número (si aplica)
            acc[questionId] = {
                ...answer,
                questionId: questionId, // Cambia id por questionId en los valores internos
            };
            return acc;
        }, {} as Record<number, any>);
    }

    const answersArray: Answers[] = [];
    function transformFormToJSON(form: SurveyResponse): string {
        
        
        // Recorrer las claves del objeto answers
        for (let key in form.answers) {
            // if (form.answers.hasOwnProperty(key)) {
            //     answersArray.push(form.answers[key]);
            // }
            console.log("KEY--->", key);
            answersArray.push(form.answers[key]);
        }
        console.log("ANSWERS ARRAY--->", answersArray);
    
        return JSON.stringify({
            ...form,
            answers: answersArray
        });
    }
    



    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = <K extends keyof FormCourseRegistration>(prop: K, value: FormCourseRegistration[K]) => {
        setForm({ ...form, [prop]: value });
        setErrors({ ...errors, [prop]: '' }); // Limpiar el error del campo modificado
    };

    const handleSaveSurvey = async () => {
        setIsLoading(true);
        setErrors({}); // Limpiar errores antes de enviar
        console.log("DATOS DE LA FORM--->", form);
        transformForm(form);
        console.log("DATOS DE LA FORM TRANSFORMADOS--->", form);
        transformFormToJSON(form);
        console.log("DATOS JSON--->", JSON.stringify(form));
        try {
            const data = await submitSurvey({surveyId:surveyId, answers: answersArray}); // Llamada al servicio para registrar la encuesta
            console.log('Encuesta registrada exitosamente:', data);
            setModalVisible(false); // Cerrar el modal si el registro es exitoso
            setForm({ surveyId: 0, answers: [] }); // Limpiar el formulario
        } catch (error) {
            console.error('Error al guardar el curso:', error);
            setErrors({ general: (error as any).message || 'Error al guardar el curso. Inténtalo de nuevo.' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Función para obtener los cursos desde el backend usando fetch
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${BASE_URL}/questions`);

                if (!response.ok) {
                    throw new Error("Error en la respuesta del servidor");
                }
                const data = await response.json();
                console.log(data)
                setQuestions(data); // Actualiza el estado con los cursos obtenidos
                setIsLoading(false); // Cambia el estado de loading
            } catch (error) {
                console.error("Error fetching courses:", error);
                setIsLoading(false); // Asegura que el estado de loading cambie incluso en caso de error
            }
        };

        // Llamamos a la función fetchCourses
        fetchCourses();
    }, []); // Se ejecuta cuando el professorId cambia



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
                        <Text style={styles.title}>Favor de Responser la Encuesta</Text>
                        {
                            questions.map((question) => (
                                <>
                                    <Text style={styles.label}>{question.text}</Text>
                                    <TextInput
                                        placeholder="Ingrese su Respuesta"
                                        value={form.answers[question.id]?.response || ''}
                                        onChangeText={text => {
                                            const updatedAnswers = { ...form.answers, [question.id]: { questionId: question.id, response: text } };
                                            setForm({ ...form, answers: updatedAnswers });
                                        }}

                                        style={[styles.input]}
                                    />
                                </>
                            ))

                        }

                        <Button title="Crear Registro" onPress={handleSaveSurvey} />

                    </View>
                </View>
            </ScrollView>
        </Modal >
    );
}

export default DoSurvey;

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