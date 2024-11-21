import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import RegisteredCourseDetails from '../coordinator/modals/RegisteredCourseDetails';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState, useEffect } from 'react';
import { CourseRegistered } from '@/services/interfaces/Coordinators';
import AddFolio from './modals/AddFolio';
import AddInstructor from './modals/AddInstructor';



const RegisteredCoursesAD = () => {

    const [courses, setCourses] = useState<CourseRegistered[]>([]); // Para almacenar los cursos de la API
    const [loading, setLoading] = useState(true); // Para indicar si los datos están cargando
    const [error, setError] = useState<string | null>(null); // Para manejar errores
    const [selectedCourse, setSelectedCourse] = useState<CourseRegistered | null>(null); // Curso seleccionado para mostrar detalles // Curso seleccionado para mostrar detalles
    const [modalVisible, setModalVisible] = useState(false);
    const [selectId, setSelectId] = useState(0)
    const [courseSpecific, setCourseSpecific] = useState<CourseRegistered>()
    const [course_id, setCourse_id] = useState(0)
    const [modalVisibleFolio, setModalVisibleFolio] = useState(false);
    const [modalVisibleInstructor, setModalVisibleInstructor] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:4000/course');
                if (!response.ok) {
                    throw new Error(`Error al obtener los cursos: ${response.statusText}`);
                }
                const data: CourseRegistered[] = await response.json();
                setCourses(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error inesperado');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);


    

    const handleSelectCourse = (id: number) => {
        const course = courses.find((c) => c.id === id);
        if (course) {
            setSelectedCourse(course);
            setModalVisible(!modalVisible);
        }
    };

    const Item: React.FC<CourseRegistered> = ({
        id,
        diagnosis_id,
        dateRegistration,
        departament,
        courseName,
        aimedAt,
        type,
        approach,
        personToTeach,
        institutionOrAcademic,
        startDate,
        endDate,
        numberHours,
        shift,
        place,
        requirements,
        justification,
        objective,
        thematicContents,
        resources,
        informationSources,
        authorization,
        review,
        file1Path,
        file2Path
    }) => {
        const handleOpenFile = (path: String) => {
            if (path) {
                window.open(`http://localhost:4000${path}`, "_blank");
            } else {
                alert("Archivo no disponible");
            }
        };

        return(
        <View style={styles.row}>
            <Text style={styles.cell}>{courseName}</Text>
            <Text style={styles.cell}>{departament}</Text>
            <Text style={styles.cell}>{type}</Text>
            <Text style={styles.cell}>{approach}</Text>
            <Text style={styles.cell}>
                    {startDate ? new Date(startDate).toLocaleDateString() : 'Fecha no válida'}
                </Text>
                <Text style={styles.cell}>
                    {endDate ? new Date(endDate).toLocaleDateString() : 'Fecha no válida'}
                </Text>
                {/* Botón para abrir el primer archivo */}
                <TouchableOpacity style={styles.cell} onPress={() => handleOpenFile(file1Path)}>
                    <Ionicons name="document-outline" size={25} color="#4caf50" />
                    <Text style={styles.fileText}>Abrir Archivo 1</Text>
                </TouchableOpacity>

                {/* Botón para abrir el segundo archivo */}
                <TouchableOpacity style={styles.cell} onPress={() => handleOpenFile(file2Path)}>
                    <Ionicons name="document-outline" size={25} color="#4caf50" />
                    <Text style={styles.fileText}>Abrir Archivo 2</Text>
                </TouchableOpacity>
            <View style={styles.cell}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.centeredView} onPress={() => handleSelectCourse(id)}>
                        <MaterialIcons style={styles.innerText} name="more-horiz" size={35} color="#2f64ba" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.cell}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.centeredView} onPress={() => { setModalVisibleFolio(!modalVisibleFolio); setCourse_id(id) }}>
                        <AntDesign style={styles.innerText} name="tagso" size={35} color="#2f64ba" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.cell}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.centeredView} onPress={() => { setModalVisibleInstructor(!modalVisibleInstructor); setCourse_id(id) }}>
                        <AntDesign style={styles.innerText} name="adduser" size={35} color="#2f64ba" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


    return (
        <ScrollView horizontal style={styles.container} centerContent>
            {selectedCourse && (
                <RegisteredCourseDetails
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    courseData={selectedCourse} // Datos del curso seleccionado
                />
            )}

            {courseSpecific && <RegisteredCourseDetails
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                courseData={courseSpecific}//TO DO MODIFICAR ESTOOO ES TEMPORAL
            />}

            {
                <AddFolio
                    modalVisible={modalVisibleFolio}
                    setModalVisible={setModalVisibleFolio}
                    course_id={course_id}
                />
            }

            {
                <AddInstructor
                    modalVisible={modalVisibleInstructor}
                    setModalVisible={setModalVisibleInstructor}
                    course_id={course_id}
                />
            }



            <View>
                <View style={styles.rowHeader}>
                    <Text style={styles.headerCell}>Nombre del curso</Text>
                    <Text style={styles.headerCell}>Departamento o Academia que Propone</Text>
                    <Text style={styles.headerCell}>Tipo de Curso</Text>
                    <Text style={styles.headerCell}>Enfoque del Curso</Text>
                    <Text style={styles.headerCell}>Fecha de Inicio</Text>
                    <Text style={styles.headerCell}>Fecha de Término</Text>
                    <Text style={styles.headerCell}>Archivo 1</Text>
                    <Text style={styles.headerCell}>Archivo 2</Text>
                    <Text style={styles.headerCell}>Detalles</Text>
                    <Text style={styles.headerCell}>Agregar Folio</Text>
                    <Text style={styles.headerCell}>Asignar Instructor</Text>
                </View>
                <FlatList
                    data={courses}
                    renderItem={({ item }) => (
                        <Item
                            id={item.id}
                            diagnosis_id={item.diagnosis_id}
                            dateRegistration={item.dateRegistration}
                            departament={item.departament}
                            courseName={item.courseName}
                            aimedAt={item.aimedAt}
                            type={item.type}
                            approach={item.approach}
                            personToTeach={item.personToTeach}
                            institutionOrAcademic={item.institutionOrAcademic}
                            startDate={item.startDate}
                            endDate={item.endDate}
                            numberHours={item.numberHours}
                            shift={item.shift}
                            place={item.place}
                            requirements={item.requirements}
                            justification={item.justification}
                            objective={item.objective}
                            thematicContents={item.thematicContents}
                            resources={item.resources}
                            informationSources={item.informationSources}
                            authorization={item.authorization}
                            review={item.review}
                            capacity={item.capacity}
                            file1Path={item.file1Path}
                            file2Path={item.file2Path}
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
    },
    fileText: {
        fontSize: 12,
        color: '#4caf50',
        textAlign: 'center',
        marginTop: 5,
    },
});

export default RegisteredCoursesAD;
