import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

interface FormCourseState {
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

interface CourseDetails {
    courseData: FormCourseState;
}

const SmallModalView: React.FC<CourseDetails> = ({ courseData }) => {
    return (
        <View>
            <Text style={[styles.modalText, { fontWeight: 'bold', marginTop: 0 }]}>Departamento Academico: </Text>
            <Text style={styles.modalText}>{courseData.departamentoAcademico}</Text>

            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Fecha de Realización del Diagnóstico: </Text>
            <Text style={styles.modalText}>{courseData.fechaCurso}</Text>

            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Titular del Departamento: </Text>
            <Text style={styles.modalText}>{courseData.titularDepartamento}</Text>

            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Presidente de Academia: </Text>
            <Text style={styles.modalText}>{courseData.presidenteAcademia}</Text>

            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Titular de la Subdirección Académica: </Text>
            <Text style={styles.modalText}>{courseData.titularSubdireccion}</Text>

            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Asignaturas Requeridas: </Text>
            <Text style={styles.modalText}>{courseData.asignaturasRequeridas}</Text>

            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Contenidos Temáticos: </Text>
            <Text style={styles.modalText}>{courseData.contenidosTematicos}</Text>

            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Número de Docente que la Requieren: </Text>
            <Text style={styles.modalText}>{courseData.numeroDocentes}</Text>

            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Tipo de Asignatura: </Text>
            <Text style={styles.modalText}>{courseData.tipoAsignatura}</Text>

            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Actividad o Evento: </Text>
            <Text style={styles.modalText}>{courseData.actividadEvento}</Text>

            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Objetivo: </Text>
            <Text style={styles.modalText}>{courseData.objetivo}</Text>

            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Carreras Atendidas: </Text>
            <Text style={styles.modalText}>{courseData.carrerasAtendidas}</Text>

            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Periodo: </Text>
            <Text style={styles.modalText}>{courseData.periodo}</Text>

            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Fecha del Curso: </Text>
            <Text style={styles.modalText}>{courseData.fechaCurso}</Text>

            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Turno: </Text>
            <Text style={styles.modalText}>{courseData.turno}</Text>

            <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Facilitadores: </Text>
            <Text style={styles.modalText}>{courseData.facilitadores}</Text>
        </View>
    );
};

export default SmallModalView;

const styles = StyleSheet.create({
    modalText: {
        marginBottom: 5,
        fontSize: 16,
    },
});