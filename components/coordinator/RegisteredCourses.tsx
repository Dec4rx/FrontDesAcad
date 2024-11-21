import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import RegisteredCourseDetails from './modals/RegisteredCourseDetails';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState, useEffect } from 'react';
import { CourseRegistered } from '@/services/interfaces/Coordinators';

const RegisteredCourses = () => {
    const [courses, setCourses] = useState<CourseRegistered[]>([]); // Para almacenar los cursos de la API
    const [loading, setLoading] = useState(true); // Para indicar si los datos están cargando
    const [error, setError] = useState<string | null>(null); // Para manejar errores
    const [selectedCourse, setSelectedCourse] = useState<CourseRegistered | null>(null); // Curso seleccionado para mostrar detalles
    const [modalVisible, setModalVisible] = useState(false);

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

    const handleFileUpload = async (courseId: number, files: FileList | null) => {
        if (!files || files.length < 2) {
            alert('Debes seleccionar al menos dos archivos.');
            return;
        }

        const formData = new FormData();
        formData.append('file1', files[0]);
        formData.append('file2', files[1]);

        try {
            const response = await fetch(`http://localhost:4000/course/${courseId}/upload-files`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al subir los archivos');
            }

            alert('Archivos subidos exitosamente');
        } catch (error) {
            console.error(error);
            alert('Hubo un error al subir los archivos');
        }
    };

    const Item: React.FC<CourseRegistered> = ({
        id,
        courseName,
        departament,
        type,
        approach,
        aimedAt,
        shift,
        startDate,
        endDate,
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
        
        return (
            <View style={styles.row}>
                <Text style={styles.cell}>{courseName}</Text>
                <Text style={styles.cell}>{departament}</Text>
                <Text style={styles.cell}>{type}</Text>
                <Text style={styles.cell}>{aimedAt}</Text>
                <Text style={styles.cell}>{shift}</Text>
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
                        {/* Botón para mostrar detalles */}
                        <TouchableOpacity style={styles.centeredView} onPress={() => handleSelectCourse(id)}>
                            <MaterialIcons style={styles.innerText} name="more-horiz" size={35} color="#2f64ba" />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Input para seleccionar y subir archivos */}
                <View style={styles.centeredView}>
                    <label htmlFor={`upload-${id}`} style={{ cursor: 'pointer' }}>
                        <Ionicons name="cloud-upload-outline" size={35} color="#4caf50" />
                    </label>
                    <input
                        id={`upload-${id}`}
                        type="file"
                        multiple
                        accept="application/pdf"
                        style={{
                            position: 'absolute',
                            opacity: 0,
                            width: '1px',
                            height: '1px',
                            overflow: 'hidden',
                        }}
                        onChange={(e) => {
                            if (e.target.files) {
                                handleFileUpload(id, e.target.files);
                            }
                        }}
                    />
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

            <View>
                <View style={styles.rowHeader}>
                    <Text style={styles.headerCell}>Nombre del curso</Text>
                    <Text style={styles.headerCell}>Departamento o Academia que Propone</Text>
                    <Text style={styles.headerCell}>Tipo de Curso</Text>
                    <Text style={styles.headerCell}>Dirigido a</Text>
                    <Text style={styles.headerCell}>Horario</Text>
                    <Text style={styles.headerCell}>Fecha de Inicio</Text>
                    <Text style={styles.headerCell}>Fecha de Término</Text>
                    <Text style={styles.headerCell}>Archivo 1</Text>
                    <Text style={styles.headerCell}>Archivo 2</Text>
                    <Text style={styles.headerCell}>Detalles</Text>
                    <Text style={styles.headerCell}>Carga de C.V. y Criterios de evaluación</Text>
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
};

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
        flexWrap: 'wrap',
        overflow: 'hidden',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 0,
    },
    innerText: {
        borderWidth: 2,
        borderColor: '#2f64ba',
        backgroundColor: 'white',
        textAlign: 'center',
        borderRadius: 10,
    },
    fileText: {
        fontSize: 12,
        color: '#4caf50',
        textAlign: 'center',
        marginTop: 5,
    },
});

export default RegisteredCourses;
