import { View, Modal, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import DiagnosisOfNeedsDetails from './modals/DiagnosisOfNeedsDetails';

interface ItemProps{
    id: number;
    departamentoAcademico: string;
    fechaDiagnostico: string;
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
    estado: string;
    facilitadores: string;
}

interface ModalProps {
    id: number,
}

const DiagnosisOfNeeds = () => {
const diagnosis = [
    {
        id: 1,
        departamentoAcademico: "Ciencias Exactas",
        fechaDiagnostico: "2024-05-01",
        titularDepartamento: "Dr. Juan Pérez",
        presidenteAcademia: "Dra. Ana López",
        titularSubdireccion: "Lic. Roberto Hernández",
        asignaturasRequeridas: "Matemáticas Avanzadas, Física Cuántica",
        contenidosTematicos: "Cálculo Integral, Mecánica Cuántica",
        numeroDocentes: 10,
        tipoAsignatura: "Asignatura Genérica",
        actividadEvento: "Curso de Actualización",
        objetivo: "Actualizar los conocimientos en física cuántica",
        carrerasAtendidas: "Ingeniería Física, Ingeniería Matemática",
        periodo: "E-J",
        fechaCurso: "2024-06-15",
        turno: "Matutino",
        estado: "Aprobado",
        facilitadores: "Dr. Carlos Sánchez, Dra. María García"
    },


    // Más cursos pueden ser añadidos aquí
];

const [diagnosisSpecific, setDiagnosisSpecific] = useState<ItemProps>({
    id: 0,
    departamentoAcademico: "",
    fechaDiagnostico: "",
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
    estado: "",
    facilitadores: ""
})

const handleSelectCourse = (id: number) => {

    console.log(id)

    const diagnos = diagnosis.find(diagnosis => diagnosis.id === id)
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

const Item: React.FC<ItemProps> = ({ id,departamentoAcademico, fechaDiagnostico,asignaturasRequeridas, numeroDocentes, tipoAsignatura, turno, estado }) => (
    <View style={styles.row}>
            <Text style={styles.cell}>{departamentoAcademico}</Text>
            <Text style={styles.cell}>{fechaDiagnostico}</Text>
            <Text style={styles.cell}>{asignaturasRequeridas}</Text>
            <Text style={styles.cell}>{tipoAsignatura}</Text>
            <Text style={styles.cell}>{numeroDocentes}</Text>
            <Text style={styles.cell}>{turno}</Text>
            <Text style={styles.cell}>{estado}</Text>
            <View style={styles.cell}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.centeredView} onPress={() => handleSelectCourse(id)}>
                        <MaterialIcons style={styles.buttonDetails} name="more-horiz" size={35} color="#2f64ba" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
);

return(
<ScrollView horizontal style={styles.container}>

<DiagnosisOfNeedsDetails
    modalVisible={modalVisible}
    setModalVisible={setModalVisible}
    diagnosisData={diagnosisSpecific}
/>

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
        data={diagnosis}
        renderItem={({ item }) => (
            <Item
                id={item.id}
                departamentoAcademico={item.departamentoAcademico}
                fechaDiagnostico={item.fechaDiagnostico}
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
                estado={item.estado}
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
    buttonDetails: {
        borderWidth: 2,
        borderColor: "#2f64ba",
        backgroundColor: "white",
        textAlign: "center",
        borderRadius: 10,
    }
});

export default DiagnosisOfNeeds;