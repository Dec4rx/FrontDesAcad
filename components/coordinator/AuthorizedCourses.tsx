import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import CourseDetails from './modals/CourseDetails';
import CourseDetails from './modals/CourseDetails';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';

interface ItemProps {
    id: number;
    departamentoAcademico: string;
    fechaRealizacionDiagnostico: string;
    titularDepartamento: string;
    presidenteAcademia: string;
    titularSubdireccion: string;
    asignaturasRequeridas: string;
    contenidosTematicos: string;
    numeroDocentes: number;
    tipoAsignatura: string;
    actividadEvento: string;
    objetivo: string;
    carrerasAtendidas: string;
    periodo: string;
    fechaCurso: string;
    turno: string;
    facilitadores: string;
}


const AuthorizedCourses = () => {

    // Datos de ejemplo para los cursos
    const cursos = [
        {
            id: 1,
            departamentoAcademico: "Ciencias de la Computación",
            fechaRealizacionDiagnostico: "2024-01-10",
            titularDepartamento: "Dr. Elena Torres",
            presidenteAcademia: "Dr. Marco Ruiz",
            titularSubdireccion: "Lic. Ana Gómez",
            asignaturasRequeridas: "Programación Avanzada, Algoritmos",
            contenidosTematicos: "Estructuras de datos, Complejidad computacional",
            numeroDocentes: 3,
            tipoAsignatura: "Carrera Genérica",
            actividadEvento: "Taller de Algoritmos",
            objetivo: "Actualizar y profundizar en algoritmos complejos",
            carrerasAtendidas: "Ingeniería en Sistemas Computacionales",
            periodo: "E-J",
            fechaCurso: "2024-03-15",
            turno: "Vespertino",
            facilitadores: "Dr. Carlos Sánchez, Dra. María Pérez"
        },
        // Más cursos pueden ser añadidos aquí
    ];

    const [selectId, setSelectId] = useState(0)

    const defaultCourse: ItemProps = {
        id: 0,
        departamentoAcademico: '',
        fechaRealizacionDiagnostico: '',
        titularDepartamento: '',
        presidenteAcademia: '',
        titularSubdireccion: '',
        asignaturasRequeridas: '',
        contenidosTematicos: '',
        numeroDocentes: 0,
        tipoAsignatura: '',
        actividadEvento: '',
        objetivo: '',
        carrerasAtendidas: '',
        periodo: '',
        fechaCurso: '',
        turno: '',
        facilitadores: ''
    };

    const [courseSpecific, setCourseSpecific] = useState<ItemProps>({
        id: 0,
        departamentoAcademico: "",
        fechaRealizacionDiagnostico: "",
        titularDepartamento: "",
        presidenteAcademia: "",
        titularSubdireccion: "",
        asignaturasRequeridas: "",
        contenidosTematicos: "",
        numeroDocentes: 0,
        tipoAsignatura: "",
        actividadEvento: "",
        objetivo: "",
        carrerasAtendidas: "",
        periodo: "",
        fechaCurso: "",
        turno: "",
        facilitadores: ""
    })

    const [modalVisible, setModalVisible] = useState(false);

    const handleSelectCourse = (id: number) => {

        console.log(id)
        setSelectId(id)

        const curso = cursos.find(curso => curso.id === id)
        if (curso) {
            setCourseSpecific(curso)
            console.log(courseSpecific)
            setModalVisible(!modalVisible)
        }
        else {
            console.log("no encontrado")
        }
    }

    const Item: React.FC<ItemProps> = ({
        id,
        departamentoAcademico,
        fechaRealizacionDiagnostico,
        titularDepartamento,
        presidenteAcademia,
        titularSubdireccion,
        asignaturasRequeridas,
        contenidosTematicos,
        numeroDocentes,
        tipoAsignatura,
        actividadEvento,
        objetivo,
        carrerasAtendidas,
        periodo,
        fechaCurso,
        turno,
        facilitadores
    }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{departamentoAcademico}</Text>
            <Text style={styles.cell}>{fechaRealizacionDiagnostico}</Text>
            <Text style={styles.cell}>{asignaturasRequeridas}</Text>
            <Text style={styles.cell}>{tipoAsignatura}</Text>
            <Text style={styles.cell}>{numeroDocentes}</Text>
            <Text style={styles.cell}>{turno}</Text>
            <View style={styles.cell}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.centeredView} onPress={() => handleSelectCourse(id)}>
                        <MaterialIcons style={styles.innerText} name="more-horiz" size={35} color="#2f64ba" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.cell}>
                <TouchableOpacity style={styles.buttonGenerateRegistrationForm} onPress={() => (console.log("Descargar"))}>
                    <Ionicons name="create-outline" size={35} color="#2f64ba" />
                </TouchableOpacity>
            </View>

        </View>
    );


    return (
        <ScrollView style={styles.container}>

            <CourseDetails
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                courseData={courseSpecific}
            />


            <View>
                <View style={styles.rowHeader}>
                    <Text style={styles.headerCell}>Departamento Académico</Text>
                    <Text style={styles.headerCell}>Fecha de Realización del Diagnóstico</Text>
                    <Text style={styles.headerCell}>Asignaturas Requeridas</Text>
                    <Text style={styles.headerCell}>Tipo de Asignatura</Text>
                    <Text style={styles.headerCell}>Número de Docente que la Requieren</Text>
                    <Text style={styles.headerCell}>Turno</Text>
                    <Text style={styles.headerCell}>Detalles</Text>
                    <Text style={styles.headerCell}>Generar Ficha de Registro</Text>
                </View>
                <FlatList
                    data={cursos}
                    renderItem={({ item }) => (
                        <Item
                            id={item.id}
                            departamentoAcademico={item.departamentoAcademico}
                            fechaRealizacionDiagnostico={item.fechaRealizacionDiagnostico}
                            titularDepartamento={item.titularDepartamento}
                            presidenteAcademia={item.presidenteAcademia}
                            titularSubdireccion={item.titularSubdireccion}
                            asignaturasRequeridas={item.asignaturasRequeridas}
                            contenidosTematicos={item.contenidosTematicos}
                            numeroDocentes={item.numeroDocentes}
                            tipoAsignatura={item.tipoAsignatura}
                            actividadEvento={item.actividadEvento}
                            objetivo={item.objetivo}
                            carrerasAtendidas={item.carrerasAtendidas}
                            periodo={item.periodo}
                            fechaCurso={item.fechaCurso}
                            turno={item.turno}
                            facilitadores={item.facilitadores}
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

export default AuthorizedCourses;
