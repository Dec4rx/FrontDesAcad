import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
// import CourseDetails from './modals/CourseDetails';
import CourseDetails from './modals/CourseDetails';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { Diagnosis } from '@/services/interfaces/AcademicHead';
import { getDiagnosisAuth } from '@/services/Diagnosis';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import DiagnosisOfNeedsDetails from '../academicHeads/modals/DiagnosisOfNeedsDetails';
import { set } from 'date-fns';
import GenerateRegistrationForm from './modals/GenerateRegistrationForm';




const AuthorizedDiagnosis = () => {
    const [diagnosisSpecific, setDiagnosisSpecific] = useState<Diagnosis>()
    const [diagnostics, setDiagnosis] = useState<Diagnosis[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalRegistrationFormVisible, setModalRegistrationFormVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleGetDiagnosis = async () => {
        try {
            const diagnosis = await getDiagnosisAuth();
            setDiagnosis(diagnosis);
            console.log(diagnosis)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
    useFocusEffect(
        useCallback(() => {
            handleGetDiagnosis();

        }, [])
    );


    const handleSelectCourse = (id: number) => {
        console.log(id)
        const diagnos = diagnostics.find(diagnostics => diagnostics.id === id)
        if (diagnos) {
            setDiagnosisSpecific(diagnos)
            console.log(diagnosisSpecific)
            setModalVisible(!modalVisible)
        }
        else {
            console.log("no encontrado")
        }
    }


    const handleOnRegistrationForm = (id: number) => {
        console.log(id)
        const diagnos = diagnostics.find(diagnostics => diagnostics.id === id)
        if (diagnos) {
            setDiagnosisSpecific(diagnos)
            console.log(diagnosisSpecific)
            setModalRegistrationFormVisible(!modalRegistrationFormVisible)
        }
        else {
            console.log("no encontrado")
        }
    }



    const Item: React.FC<Diagnosis> = ({ id, departament, dateDiagnosis, requiredSubjects, numberProfessors, typeSubject, feedback, status }) => (

        <View style={styles.row}>
            <Text style={styles.cell}>{departament}</Text>
            <Text style={styles.cell}>{dateDiagnosis}</Text>
            <Text style={styles.cell}>{requiredSubjects}</Text>
            <Text style={styles.cell}>{typeSubject}</Text>
            <Text style={styles.cell}>{numberProfessors}</Text>
            <Text style={styles.cell}>{status}</Text>
            <View style={styles.cell}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.centeredView} onPress={() => handleSelectCourse(id)}>
                        <MaterialIcons style={styles.innerText} name="more-horiz" size={35} color="#2f64ba" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.cell}>
                <TouchableOpacity style={styles.buttonGenerateRegistrationForm} onPress={() => handleOnRegistrationForm(id)}>
                    <Ionicons name="create-outline" size={35} color="#2f64ba" />
                </TouchableOpacity>
            </View>
        </View>
    );


    if (isLoading) {
        return (
            <View style={styles.centeredView}>
                <ActivityIndicator size="large" color="#2f64ba" />
            </View>
        );
    }


    return (
        <ScrollView horizontal style={styles.container} centerContent>

            {diagnosisSpecific && (
                <DiagnosisOfNeedsDetails
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    diagnosisData={diagnosisSpecific}
                />
            )}

            {diagnosisSpecific && (
                <GenerateRegistrationForm
                    modalVisible={modalRegistrationFormVisible}
                    setModalVisible={setModalRegistrationFormVisible}
                    diagnosisData={diagnosisSpecific}
                />
            )}

            <View>
                <View style={styles.rowHeader}>
                    <Text style={styles.headerCell}>Departamento Académico</Text>
                    <Text style={styles.headerCell}>Fecha del Diagnóstico</Text>
                    <Text style={styles.headerCell}>Asignaturas Requeridas en la que se requiere formación o actualización</Text>
                    <Text style={styles.headerCell}>Tipo de Asignatura (Génerica o Especialidad)</Text>
                    <Text style={styles.headerCell}>Número de Docente que la Requieren</Text>
                    <Text style={styles.headerCell}>Estado</Text>
                    <Text style={styles.headerCell}>Detalles</Text>
                    <Text style={styles.headerCell}>Generar Ficha de Registro del Curso</Text>
                </View>

                <FlatList
                    data={diagnostics}
                    renderItem={({ item }) => (
                        <Item
                            id={item.id}
                            departament={item.departament}
                            dateDiagnosis={item.dateDiagnosis}
                            headDepartment={item.headDepartment}
                            presidentAcademy={item.presidentAcademy}
                            titleSubdirectorate={item.titleSubdirectorate}
                            requiredSubjects={item.requiredSubjects}
                            thematicContents={item.thematicContents}
                            numberProfessors={item.numberProfessors}
                            typeSubject={item.typeSubject}
                            activityEvent={item.activityEvent}
                            objective={item.objective}
                            careersAttended={item.careersAttended}
                            period={item.period}
                            startDate={item.startDate} //CHECK THIS
                            endDate={item.endDate}
                            shift={item.shift}
                            feedback={item.feedback}
                            status={item.status}
                            facilitators={item.facilitators}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </ScrollView>
    );
}

export default AuthorizedDiagnosis;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    rowHeader: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: '#000',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        padding: 10,
    },
    headerCell: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cell: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        flexWrap: 'wrap', // Permite que el texto pase a la siguiente línea
        overflow: 'hidden', // Asegura que el contenido no se desborde
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center', // Centra horizontalmente
        marginLeft: 0, // Asegura que no haya margen izquierdo
    },
    innerText: {
        borderWidth: 2,
        borderColor: "#2f64ba",
        backgroundColor: "white",
        textAlign: "center",
        borderRadius: 10,
    },
    buttonGenerateRegistrationForm: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    }
});
