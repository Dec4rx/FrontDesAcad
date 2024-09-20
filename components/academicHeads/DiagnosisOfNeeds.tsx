import { View, Modal, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useCallback, useState } from 'react';
import DiagnosisOfNeedsDetails from './modals/DiagnosisOfNeedsDetails';
import { Diagnosis } from '@/services/interfaces/AcademicHead';
import { useFocusEffect } from 'expo-router';
import { getDiagnosis } from '@/services/Diagnosis';



const DiagnosisOfNeeds = () => {
    const [diagnosisSpecific, setDiagnosisSpecific] = useState<Diagnosis>()
    const [diagnostics, setDiagnosis] = useState<Diagnosis[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleGetDiagnosis = async () => {
        try {
            const diagnosis = await getDiagnosis();
            setDiagnosis(diagnosis);
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

    const [modalVisible, setModalVisible] = useState(false);

    const Item: React.FC<Diagnosis> = ({ id, departament, dateDiagnosis, requiredSubjects, numberProfessors, typeSubject, shift, status }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{departament}</Text>
            <Text style={styles.cell}>{dateDiagnosis}</Text>
            <Text style={styles.cell}>{requiredSubjects}</Text>
            <Text style={styles.cell}>{typeSubject}</Text>
            <Text style={styles.cell}>{numberProfessors}</Text>
            <Text style={styles.cell}>{shift}</Text>
            <Text style={styles.cell}>{status}</Text>
            <View style={styles.cell}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.centeredView} onPress={() => handleSelectCourse(id)}>
                        <MaterialIcons style={styles.buttonDetails} name="more-horiz" size={35} color="#2f64ba" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    if (isLoading) {
        return (
            <div>
                <div>Cargando...</div>
            </div>
        );
    }

    return (
        <ScrollView horizontal style={styles.container}>

            {diagnosisSpecific && (
                <DiagnosisOfNeedsDetails
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    diagnosisData={diagnosisSpecific}
                />
            )}

            <View>
                <View style={styles.rowHeader}>
                    <Text style={styles.headerCell}>Departamento Académico</Text>
                    <Text style={styles.headerCell}>Fecha del Diagnóstico</Text>
                    <Text style={styles.headerCell}>Asignaturas Requeridas</Text>
                    <Text style={styles.headerCell}>Tipo de Asignatura</Text>
                    <Text style={styles.headerCell}>Número de Docente que la Requieren</Text>
                    <Text style={styles.headerCell}>Turno</Text>
                    <Text style={styles.headerCell}>Estado</Text>
                    <Text style={styles.headerCell}>Detalles</Text>
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center', // Centra horizontalmente
        marginLeft: 0, // Asegura que no haya margen izquierdo
    },
    buttonDetails: {
        borderWidth: 2,
        borderColor: "#2f64ba",
        backgroundColor: "white",
        textAlign: "center",
        borderRadius: 10,
    }
});

export default DiagnosisOfNeeds;