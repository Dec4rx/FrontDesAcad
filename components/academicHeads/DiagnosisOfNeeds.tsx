import { View, Modal, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useCallback, useState } from 'react';
import DiagnosisOfNeedsDetails from './modals/DiagnosisOfNeedsDetails';
import Feather from '@expo/vector-icons/Feather';
import { Diagnosis } from '@/services/interfaces/AcademicHead';
import { router, useFocusEffect } from 'expo-router';
import { getDiagnosis } from '@/services/Diagnosis';
import { useNavigation } from '@react-navigation/native';
import { set } from 'date-fns';
import EditDiagnosis from './modals/EditDiagnosis';



const DiagnosisOfNeeds = () => {
    const navigation = useNavigation();
    const [diagnosisSpecific, setDiagnosisSpecific] = useState<Diagnosis>()
    const [diagnostics, setDiagnosis] = useState<Diagnosis[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalEditVisible, setModalEditVisible] = useState(false);

    const handleGetDiagnosis = async () => {
        try {
            const diagnosis = await getDiagnosis();
            const modifiedDiagnosis = diagnosis.map((d: { is_authorized_by_first: number; is_authorized_by_second: number; }) => ({
                ...d,
                is_authorized_by_first: d.is_authorized_by_first === 1,
                is_authorized_by_second: d.is_authorized_by_second === 1
            }));
            setDiagnosis(modifiedDiagnosis);
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

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Rechazado':
                return { backgroundColor: '#ffcccb', color: '#d8000c' }; // rojo
            case 'Parcialmente Autorizado':
                return { backgroundColor: '#ffeb3b', color: '#cddc39' }; // amarillo
            case 'Totalmente Autorizado':
                return { backgroundColor: '#c8e6c9', color: '#388e3c' }; // verde
            default:
                return { backgroundColor: '#fff', color: '#000' }; // blanco por defecto
        }
    };


    const handleSelectCourse = (id: number) => {

        console.log(id)

        const diagnos = diagnostics.find(diagnostics => diagnostics.id === id)
        if (diagnos) {
            setDiagnosisSpecific(diagnos)
            console.log("los diagnosticos son->")
            console.log(diagnosisSpecific)
            setModalVisible(!modalVisible)
        }
        else {
            console.log("no encontrado")
        }
    }

    const handleEditCourse = (id: number) => {
        console.log(id)

        const diagnos = diagnostics.find(diagnostics => diagnostics.id === id)
        if (diagnos) {
            setDiagnosisSpecific(diagnos)
            console.log("los diagnosticos son->")
            console.log(diagnosisSpecific)
            setModalEditVisible(!modalEditVisible)
        }
        else {
            console.log("no encontrado")
        }
    }

    const Item: React.FC<Diagnosis> = ({ id, departament, dateDiagnosis, requiredSubjects, numberProfessors, typeSubject, feedback, status }) => {
        const isEditable = status !== 'Totalmente Autorizado' && status !== 'Parcialmente Autorizado';
        const statusStyle = getStatusStyle(status);
        return(
        <View style={styles.row}>
            <Text style={styles.cell}>{departament}</Text>
            <Text style={styles.cell}>{dateDiagnosis}</Text>
            <Text style={styles.cell}>{requiredSubjects}</Text>
            <Text style={styles.cell}>{typeSubject}</Text>
            <Text style={styles.cell}>{numberProfessors}</Text>
            <Text style={styles.cell}>{feedback}</Text>
            <Text style={[styles.cell, statusStyle]}>{status}</Text>
            <View style={styles.cell}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.centeredView} onPress={() => handleSelectCourse(id)}>
                        <MaterialIcons style={styles.buttonDetails} name="more-horiz" size={35} color="#2f64ba" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.cell}>
                <TouchableOpacity 
                    style={[styles.buttonGenerateRegistrationForm, { opacity: isEditable ? 1 : 0.5 }]} 
                    onPress={isEditable ? () =>  handleEditCourse(id) : undefined}
                    disabled={!isEditable}>
                    <Feather name="edit" size={35} color={isEditable ? "#2f64ba" : "#ccc"} />
                </TouchableOpacity>
            </View>
        </View>
    );
};



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
                <EditDiagnosis
                    modalVisible={modalEditVisible}
                    setModalVisible={setModalEditVisible}
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
                    <Text style={styles.headerCell}>Feedback</Text>
                    <Text style={styles.headerCell}>Estado</Text>
                    <Text style={styles.headerCell}>Detalles</Text>
                    <Text style={styles.headerCell}>Editar</Text>
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
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
    buttonDetails: {
        borderWidth: 2,
        borderColor: "#2f64ba",
        backgroundColor: "white",
        textAlign: "center",
        borderRadius: 10,
    },
    buttonEdit: {
        backgroundColor: "white",
        textAlign: "center",
    },
    buttonGenerateRegistrationForm: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderColor: "#2f64ba",
        backgroundColor: "white", // Fondo blanco para estado habilitado
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center', // Centra horizontalmente
    },
});

export default DiagnosisOfNeeds;