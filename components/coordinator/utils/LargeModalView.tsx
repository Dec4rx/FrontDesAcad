import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
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
    courseData: FormCourseState
}

const LargeModalView: React.FC<CourseDetails> = ({courseData}) => {
    return (
        <View>
            <View style={styles.textRow}>
                <Text style={[styles.modalText, { fontWeight: 'bold', marginTop: 0 }]}>Departamento Academico: </Text>
                <Text style={styles.modalText}>{courseData.departamentoAcademico}</Text>
            </View>

            <View style={styles.textRow}>
                <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Fecha de Realización del Diagnóstico: </Text>
                <Text style={styles.modalText}>{courseData.fechaCurso}</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Titular del Departamento: </Text>
                <Text style={styles.modalText}>{courseData.titularDepartamento}</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Presidente de Academia: </Text>
                <Text style={styles.modalText}>{courseData.presidenteAcademia}</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Titular de la Subdirección Académica: </Text>
                <Text style={styles.modalText}>{courseData.titularSubdireccion}</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Asignaturas Requeridas: </Text>
                <Text style={styles.modalText}>{courseData.asignaturasRequeridas}</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Contenidos Temáticos: </Text>
                <Text style={styles.modalText}>{courseData.contenidosTematicos}</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Número de Docente que la Requieren: </Text>
                <Text style={styles.modalText}>{courseData.numeroDocentes}</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Tipo de Asignatura: </Text>
                <Text style={styles.modalText}>{courseData.tipoAsignatura}</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Actividad o Evento: </Text>
                <Text style={styles.modalText}>{courseData.actividadEvento}</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Objetivo: </Text>
                <Text style={styles.modalText}>{courseData.objetivo}</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Carreras Atendidas: </Text>
                <Text style={styles.modalText}>{courseData.carrerasAtendidas}</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Periodo: </Text>
                <Text style={styles.modalText}>{courseData.periodo}</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Fecha del Curso: </Text>
                <Text style={styles.modalText}>{courseData.fechaCurso}</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Turno: </Text>
                <Text style={styles.modalText}>{courseData.turno}</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Facilitadores: </Text>
                <Text style={styles.modalText}>{courseData.facilitadores}</Text>
            </View>
        </View>
    )
}

export default LargeModalView;

const styles = StyleSheet.create({
    textRow: {
        flexDirection: 'row',
        // justifyContent: 'center',
    },
    modalText: {
        marginBottom: 5,
        // textAlign: 'center',
        fontSize: 16,
    },
});