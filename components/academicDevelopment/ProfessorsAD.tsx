import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import RegisteredCourseDetails from '../coordinator/modals/RegisteredCourseDetails';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';
import { CourseRegistered } from '@/services/interfaces/Coordinators';
import AddFolio from './modals/AddFolio';
import AddInstructor from './modals/AddInstructor';
import { Professor } from '@/services/interfaces/Professors';
import Feather from '@expo/vector-icons/Feather';
import EditProfessor from './modals/EditProfessor';



const ProfessorsAD = () => {

    // Datos de ejemplo para los Profesores

    const professors: Professor[] = [
        {
            id: 1,
            name: 'John',
            middleName: 'A.',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            gender: 'Male',
            rfc: 'DOEJ123456XXX',
            curp: 'DOEJ123456HDFXXX01',
            status: 'Active',
            department: 'Computer Science'
        },
        {
            id: 2,
            name: 'Jane',
            middleName: 'Basdasdad.',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            gender: 'Female',
            rfc: 'SMIJ123456XXX',
            curp: 'SMIJ123456MDFXXX02',
            status: 'Active',
            department: 'Mathematics'
        },
        {
            id: 3,
            name: 'Alice',
            middleName: 'C.',
            lastName: 'Johnson',
            email: 'alice.johnson@example.com',
            gender: 'Female',
            rfc: 'JOHA123456XXX',
            curp: 'JOHA123456HDFXXX03',
            status: 'Inactive',
            department: 'Physics'
        }
    ];


    const [selectId, setSelectId] = useState(0)



    const [professorSpecific, setProfessorSpecific] = useState<Professor>()

    const [modalVisible, setModalVisible] = useState(false);

    const handleEditCourse = (id: number) => {

        console.log(id)
        setSelectId(id)
        const professor = professors.find(professor => professor.id === id)
        if (professor) {
            setProfessorSpecific(professor)
            console.log(professorSpecific)
            setModalVisible(!modalVisible)
        }
        else {
            console.log("no encontrado :v")
        }
    }

    const Item: React.FC<Professor> = ({
        id,
        name,
        middleName,
        lastName,
        email,
        gender,
        rfc,
        curp,
        status,
        department

    }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{name}</Text>
            <Text style={styles.cell}>{middleName}</Text>
            <Text style={styles.cell}>{lastName}</Text>
            <Text style={styles.cell}>{email}</Text>
            <Text style={styles.cell}>{gender}</Text>
            <Text style={styles.cell}>{rfc}</Text>
            <Text style={styles.cell}>{curp}</Text>
            <Text style={styles.cell}>{status}</Text>
            <Text style={styles.cell}>{department}</Text>
            <View style={styles.cell}>
                <TouchableOpacity
                    style={[styles.buttonGenerateRegistrationForm]}
                    onPress={() => handleEditCourse(id)}
                >
                    <Feather name="edit" size={35} color={"#2f64ba"} />
                </TouchableOpacity>
            </View>
            {/* <View style={styles.cell}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.centeredView} onPress={() => { setModalVisibleFolio(!modalVisibleFolio); setCourse_id(id) }}>
                        <AntDesign style={styles.innerText} name="tagso" size={35} color="#2f64ba" />
                    </TouchableOpacity>
                </View>
            </View> */}

        </View>
    );


    return (
        <ScrollView horizontal style={styles.container} centerContent>

            {
                professorSpecific && (
                    <EditProfessor
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        professorData={professorSpecific}
                    />
                )
            }


            <View>
                <View style={styles.rowHeader}>
                    <Text style={styles.headerCell}>Nombre(s)</Text>
                    <Text style={styles.headerCell}>Apellido Paterno</Text>
                    <Text style={styles.headerCell}>Apellido Materno</Text>
                    <Text style={styles.headerCell}>Email</Text>
                    <Text style={styles.headerCell}>Genero</Text>
                    <Text style={styles.headerCell}>RFC</Text>
                    <Text style={styles.headerCell}>CURP</Text>
                    <Text style={styles.headerCell}>Estatus</Text>
                    <Text style={styles.headerCell}>Departamento</Text>
                    <Text style={styles.headerCell}>Editar</Text>
                </View>
                <FlatList
                    data={professors}
                    renderItem={({ item }) => (
                        <Item
                            id={item.id}
                            name={item.name}
                            middleName={item.middleName}
                            lastName={item.lastName}
                            email={item.email}
                            gender={item.gender}
                            rfc={item.rfc}
                            curp={item.curp}
                            status={item.status}
                            department={item.department}
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

export default ProfessorsAD;
