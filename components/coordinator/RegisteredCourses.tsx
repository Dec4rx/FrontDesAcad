import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import RegisteredCourseDetails from './modals/RegisteredCourseDetails';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { CourseRegistered } from '@/services/interfaces/Coordinators';



const RegisteredCourses = () => {

    // Datos de ejemplo para los cursos
    const cursos: CourseRegistered[] = [{
        "id": 1,
        "diagnosis_id": 12345,
        "coordinator_id": 1,
        "dateRegistration": new Date(),
        "departament": "Computer Science",
        "name": "Intro to AI Workshop",
        "aimedAt": "Students",
        "type": "Workshop",
        "approach": "Hands-on",
        "personToTeach": "Dr. John Doe",
        "institutionOrAcademic": "Tech University",
        "startDate": new Date(),
        "endDate": new Date(),
        "numberHours": 40,
        "shift": "Morning",
        "place": "Room 202, Main Building",
        "requirements": "Basic programming knowledge",
        "justification": "Increase AI literacy among students",
        "objective": "Teach the fundamentals of AI and machine learning",
        "thematicContents": "Introduction to AI, Machine Learning Algorithms, Neural Networks",
        "resources": "Computers, Projector, Notebooks",
        "informationSources": "AI Textbook, Research Papers",
        "autoriazation": "Juan Pérez",
        "review": "María González"
    },
    {
        "id": 2,
        "diagnosis_id": 12346,
        "coordinator_id": 2,
        "dateRegistration": new Date(),
        "departament": "Data Science",
        "name": "Advanced Data Analysis Seminar",
        "aimedAt": "Graduate Students",
        "type": "Seminar",
        "approach": "Lecture",
        "personToTeach": "Dr. Jane Smith",
        "institutionOrAcademic": "Data Science Institute",
        "startDate": new Date(),
        "endDate": new Date(),
        "numberHours": 30,
        "shift": "Afternoon",
        "place": "Room 305, Data Science Building",
        "requirements": "Basic knowledge of statistics",
        "justification": "Enhance data analysis skills",
        "objective": "Teach advanced data analysis techniques using Python and R",
        "thematicContents": "Data Cleaning, Statistical Models, Machine Learning",
        "resources": "Laptops, Statistical Software",
        "informationSources": "Data Science Journals, Online Courses",
        "autoriazation": "Carlos Rodríguez",
        "review": "Ana Martínez"
    },
    {
        "id": 3,
        "diagnosis_id": 12347,
        "coordinator_id": 3,
        "dateRegistration": new Date(),
        "departament": "Software Engineering",
        "name": "Agile Methodologies Workshop",
        "aimedAt": "Developers",
        "type": "Workshop",
        "approach": "Interactive",
        "personToTeach": "Eng. Michael Brown",
        "institutionOrAcademic": "Software Development Academy",
        "startDate": new Date(),
        "endDate": new Date(),
        "numberHours": 20,
        "shift": "Evening",
        "place": "Room 101, Engineering Building",
        "requirements": "Basic programming skills",
        "justification": "Improve project management skills",
        "objective": "Teach the fundamentals of Agile and Scrum methodologies",
        "thematicContents": "Agile Principles, Scrum Framework, Project Management",
        "resources": "Whiteboards, Markers, Laptops",
        "informationSources": "Agile Manifesto, Scrum Guide",
        "autoriazation": "Laura Sánchez",
        "review": "Pedro Hernández"
    }
    ];


    const [selectId, setSelectId] = useState(0)



    const [courseSpecific, setCourseSpecific] = useState<CourseRegistered>()

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

    const Item: React.FC<CourseRegistered> = ({
        id,
        diagnosis_id,
        dateRegistration,
        departament,
        coordinator_id,
        name,
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
        autoriazation,
        review
    }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{name}</Text>
            <Text style={styles.cell}>{departament}</Text>
            <Text style={styles.cell}>{type}</Text>
            <Text style={styles.cell}>{approach}</Text>
            <Text style={styles.cell}>{aimedAt}</Text>
            <Text style={styles.cell}>{shift}</Text>
            <Text style={styles.cell}>{startDate.toISOString().split('T')[0]}</Text>
            <Text style={styles.cell}>{endDate.toISOString().split('T')[0]}</Text>
            <View style={styles.cell}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.centeredView} onPress={() => handleSelectCourse(id)}>
                        <MaterialIcons style={styles.innerText} name="more-horiz" size={35} color="#2f64ba" />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );


    return (
        <ScrollView horizontal style={styles.container} centerContent>

            {courseSpecific && <RegisteredCourseDetails
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                courseData={courseSpecific}//TO DO MODIFICAR ESTOOO ES TEMPORAL
            />}


            <View>
                <View style={styles.rowHeader}>
                    <Text style={styles.headerCell}>Nombre del curso</Text>
                    <Text style={styles.headerCell}>Departamento o Academia que Propone</Text>
                    <Text style={styles.headerCell}>Tipo de Curso</Text>
                    <Text style={styles.headerCell}>Enfoque del Curso</Text>
                    <Text style={styles.headerCell}>Dirigido a</Text>
                    <Text style={styles.headerCell}>Horario</Text>
                    <Text style={styles.headerCell}>Fecha de Inicio</Text>
                    <Text style={styles.headerCell}>Fecha de Término</Text>
                    <Text style={styles.headerCell}>Detalles</Text>
                </View>
                <FlatList
                    data={cursos}
                    renderItem={({ item }) => (
                        <Item
                            id={item.id}
                            diagnosis_id={item.diagnosis_id}
                            dateRegistration={item.dateRegistration}
                            departament={item.departament}
                            coordinator_id={item.coordinator_id}
                            name={item.name}
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
                            autoriazation={item.autoriazation}
                            review={item.review}
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

export default RegisteredCourses;
