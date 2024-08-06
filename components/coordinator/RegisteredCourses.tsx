import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import RegisteredCourseDetails from './modals/RegisteredCourseDetails';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';

interface ItemProps {
    id: number;
    fechaRegistro: string;
    departamentoPropone: string;
    coordinador: string;
    nombreCurso: string;
    dirigidoA: string;
    tipoCurso: string;
    enfoqueCurso: string;
    personaImparte: string;
    institucionPertenece: string;
    fechaInicio: string;
    fechaTermino: string;
    numeroHoras: string;
    horario: string;
    lugarImparticion: string;
    requisitos: string;
    justificacion: string;
    objetivo: string;
    contenidoTematico:
    {
        tema: string;
        duracion: string;
        actividades: string;
        competencias: string;
        criterioEvaluacion: string;
        recursosDidacticos: string;
        fuentesInformacion: string;
    }[],
    autorizadoPor: string;
    revisadoPor: string;
}


const RegisteredCourses = () => {

    // Datos de ejemplo para los cursos
    const cursos = [
        {
            id: 0,
            fechaRegistro: '2024-01-15',
            departamentoPropone: 'Ciencias Básicas',
            coordinador: 'Juan Pérez',
            nombreCurso: 'Introducción a la Física Cuántica',
            dirigidoA: 'Ingeniería y Física',
            tipoCurso: 'Formación Docente',
            enfoqueCurso: 'Actualización',
            personaImparte: 'Dra. Ana López',
            institucionPertenece: 'ITA',
            fechaInicio: '2024-02-01',
            fechaTermino: '2024-03-01',
            numeroHoras: '30',
            horario: 'Matutino',
            lugarImparticion: 'Aula 101',
            requisitos: 'Conocimientos básicos de física',
            justificacion: 'Actualizar metodologías de enseñanza',
            objetivo: 'Mejorar competencias docentes en física moderna',
            contenidoTematico: [
                {
                    tema: 'Principios de mecánica cuántica',
                    duracion: '5 horas',
                    actividades: 'Lecturas y ejercicios',
                    competencias: 'Análisis de problemas cuánticos',
                    criterioEvaluacion: 'Pruebas escritas',
                    recursosDidacticos: 'Libros y presentaciones',
                    fuentesInformacion: 'Artículos científicos relevantes'
                },
                // Otros temas/subtemas pueden ser añadidos aquí
            ],
            autorizadoPor: 'Dr. Carlos Ruiz, Coordinador de Ciencias',
            revisadoPor: 'Lic. María González, Director Académico'
        }
        // Otros cursos pueden ser añadidos aquí
    ];


    const [selectId, setSelectId] = useState(0)

    const defaultCourse: ItemProps = {
        id: 0,
        fechaRegistro: '',
        departamentoPropone: '',
        coordinador: '',
        nombreCurso: '',
        dirigidoA: '',
        tipoCurso: '',
        enfoqueCurso: '',
        personaImparte: '',
        institucionPertenece: '',
        fechaInicio: '',
        fechaTermino: '',
        numeroHoras: '',
        horario: '',
        lugarImparticion: '',
        requisitos: '',
        justificacion: '',
        objetivo: '',
        contenidoTematico: [
            {
                tema: '',
                duracion: '',
                actividades: '',
                competencias: '',
                criterioEvaluacion: '',
                recursosDidacticos: '',
                fuentesInformacion: ''
            },
            // Otros temas/subtemas pueden ser añadidos aquí, ahora vacíos
        ],
        autorizadoPor: '',
        revisadoPor: ''
    };

    const [courseSpecific, setCourseSpecific] = useState<ItemProps>({
        ...defaultCourse
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
            console.log("no encontrado :v")
        }
    }

    const Item: React.FC<ItemProps> = ({
        id,
        fechaRegistro,
        departamentoPropone,
        coordinador,
        nombreCurso,
        dirigidoA,
        tipoCurso,
        enfoqueCurso,
        personaImparte,
        institucionPertenece,
        fechaInicio,
        fechaTermino,
        numeroHoras,
        horario,
        lugarImparticion,
        requisitos,
        justificacion,
        objetivo,
        contenidoTematico: [
            {
                tema,
                duracion,
                actividades,
                competencias,
                criterioEvaluacion,
                recursosDidacticos,
                fuentesInformacion
            },
            // Otros temas/subtemas pueden ser añadidos aquí, ahora vacíos
        ],
        autorizadoPor,
        revisadoPor
    }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{departamentoPropone}</Text>
            <Text style={styles.cell}>{nombreCurso}</Text>
            <Text style={styles.cell}>{dirigidoA}</Text>
            <Text style={styles.cell}>{institucionPertenece}</Text>
            <Text style={styles.cell}>{numeroHoras}</Text>
            <Text style={styles.cell}>{horario}</Text>
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
        <ScrollView horizontal style={styles.container}>

            <RegisteredCourseDetails
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                courseData={courseSpecific}//TO DO MODIFICAR ESTOOO ES TEMPORAL
            />


            <View>
                <View style={styles.rowHeader}>
                    <Text style={styles.headerCell}>Departamento Académico</Text>
                    <Text style={styles.headerCell}>Nombre</Text>
                    <Text style={styles.headerCell}>Dirigido a</Text>
                    <Text style={styles.headerCell}>Institucion a la que pertenece</Text>
                    <Text style={styles.headerCell}>Número de Docente que la Requieren</Text>
                    <Text style={styles.headerCell}>Numero de horas</Text>
                    <Text style={styles.headerCell}>Horario</Text>
                    <Text style={styles.headerCell}>Generar Ficha de Registro</Text>
                </View>
                <FlatList
                    data={cursos}
                    renderItem={({ item }) => (
                        <Item
                        id={item.id}
                        fechaRegistro={item.fechaRegistro}
                        departamentoPropone={item.departamentoPropone}
                        coordinador={item.coordinador}
                        nombreCurso={item.nombreCurso}
                        dirigidoA={item.dirigidoA}
                        tipoCurso={item.tipoCurso}
                        enfoqueCurso={item.enfoqueCurso}
                        personaImparte={item.personaImparte}
                        institucionPertenece={item.institucionPertenece}
                        fechaInicio={item.fechaInicio}
                        fechaTermino={item.fechaTermino}
                        numeroHoras={item.numeroHoras}
                        horario={item.horario}
                        lugarImparticion={item.lugarImparticion}
                        requisitos={item.requisitos}
                        justificacion={item.justificacion}
                        objetivo={item.objetivo}
                        contenidoTematico={item.contenidoTematico}
                        autorizadoPor={item.autorizadoPor}
                        revisadoPor={item.revisadoPor}
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

export default RegisteredCourses;
