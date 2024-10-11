import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Diagnosis } from '@/services/interfaces/AcademicHead';

// Definiendo un tipo para las props
interface EditarDiagnosticoModalProps {
    visible: boolean;
    onClose: () => void;
    diagnosis: Diagnosis | null; // Suponiendo que tienes un tipo 'Diagnosis' definido
    onSave: (diagnosis: Diagnosis) => void;
}

const EditarDiagnosticoModal: React.FC<EditarDiagnosticoModalProps> = ({ visible, onClose, diagnosis, onSave }) => {
    const [form, setForm] = useState<Diagnosis>({
        id: 0,
        departament: '',
        headDepartment: '',
        presidentAcademy: '',
        titleSubdirectorate: '',
        requiredSubjects: '',
        thematicContents: '',
        typeSubject: '',
        activityEvent: '',
        objective: '',
        careersAttended: '',
        period: '',
        status: '',
        facilitators: '',
        dateDiagnosis: '',
        startDate: '',
        endDate: '',
        numberProfessors: 0,
        feedback: '',
        shift: '',
    });

    // Cargar los datos iniciales cuando el componente recibe un diagnóstico para editar
    useEffect(() => {
        if (diagnosis) {
            setForm({ ...diagnosis });
        }
    }, [diagnosis]);

    const handleChange = (name: keyof Diagnosis, value: any) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSave(form);
        onClose();  // Cierra el modal después de guardar
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Editar Diagnóstico</Text>
                    {/* Campos del formulario */}
                    <TextInput
                        style={styles.input}
                        value={form.departament}
                        onChangeText={(text) => handleChange('departament', text)}
                        placeholder="Departamento Académico"
                    />
                    
                    
                    
                    <Button title="Guardar Cambios" onPress={handleSubmit} />
                    <Button title="Cerrar" onPress={onClose} color="red" />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 300,
    }
});

export default EditarDiagnosticoModal;
