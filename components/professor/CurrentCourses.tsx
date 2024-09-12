import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { UserData } from '@/services/interfaces/UserInterface';

import React from 'react';

interface ItemProps {
    id: number,
    courseName: string,
    startDate: string,
    endDate: string,
    shift: string,
    schedule: string,
    capacity: number,
    requirements: string
}

const CurrentCourses = (props: UserData) => {
    const [cursos, setCursos] = useState<ItemProps[]>([]);
    const [loading, setLoading] = useState(true);

    const professorId = props.id;
    


    useEffect(() => {
        // Función para obtener los cursos desde el backend usando fetch
        const fetchCourses = async () => {
            try {
                const response = await fetch(`http://localhost:4000/professor-course/${professorId}`);
                
                if (!response.ok) {
                    throw new Error("Error en la respuesta del servidor");
                }
                const data = await response.json();
                console.log(data)
                setCursos(data); // Actualiza el estado con los cursos obtenidos
                setLoading(false); // Cambia el estado de loading
            } catch (error) {
                console.error("Error fetching courses:", error);
                setLoading(false); // Asegura que el estado de loading cambie incluso en caso de error
            }
        };
    
        // Llamamos a la función fetchCourses
        fetchCourses();
    }, [professorId]); // Se ejecuta cuando el professorId cambia
    

    

    const Item: React.FC<ItemProps> = ({ courseName, startDate, endDate, shift, schedule, capacity, requirements }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{courseName}</Text>
            <Text style={styles.cell}>{startDate}</Text>
            <Text style={styles.cell}>{endDate}</Text>
            <Text style={styles.cell}>{shift}</Text>
            <Text style={styles.cell}>{schedule}</Text>
            <Text style={styles.cell}>{capacity}</Text>
            <Text style={styles.cell}>{requirements}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Cargando cursos...</Text>
            </View>
        );
    }

    return (
        <ScrollView horizontal style={styles.container}>
            <View>
                <View style={styles.rowHeader}>
                    <Text style={styles.headerCell}>Nombre del Curso</Text>
                    <Text style={styles.headerCell}>Fecha de Inicio</Text>
                    <Text style={styles.headerCell}>Fecha de Fin</Text>
                    <Text style={styles.headerCell}>Turno</Text>
                    <Text style={styles.headerCell}>Horario</Text>
                    <Text style={styles.headerCell}>Cupo</Text>
                    <Text style={styles.headerCell}>Requerimientos</Text>
                </View>
                <FlatList
                    data={cursos}
                    renderItem={({ item }) => (
                        <Item
                        id={item.id}
                        courseName={item.courseName}
                        startDate={item.startDate}
                        endDate={item.endDate}
                        shift={item.shift}
                        schedule={item.schedule}
                        capacity={item.capacity}
                        requirements={item.requirements}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CurrentCourses;
