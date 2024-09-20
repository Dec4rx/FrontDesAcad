import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import DatePicker from 'react-datepicker'; // Importa react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Importa los estilos de react-datepicker
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

interface FormState {
  departamento: string;
  fechaDiagnostico: Date;
  titular: string;
  presidente: string;
  subdirector: string;
  asignaturas: string;
  contenidos: string;
  numDocentes: string;
  tipoAsignatura: string;
  evento: string;
  objetivo: string;
  carreras: string;
  periodo: string;
  fechaInicio: Date;
  fechaFin: Date;
  turno: string;
  facilitadores: string;
}

const AgregarDiagnostico = () => {
  const [form, setForm] = useState<FormState>({
    departamento: '',
    fechaDiagnostico: new Date(),
    titular: '',
    presidente: '',
    subdirector: '',
    asignaturas: '',
    contenidos: '',
    numDocentes: '',
    tipoAsignatura: '',
    evento: '',
    objetivo: '',
    carreras: '',
    periodo: '',
    fechaInicio: new Date(),
    fechaFin: new Date(),
    turno: '',
    facilitadores: ''
  });

  const handleInputChange = <K extends keyof FormState>(prop: K, value: FormState[K]) => {
    setForm({ ...form, [prop]: value });
  };

  const handleSave = () => {
    console.log('Datos del diagnóstico guardados', form);
    router.navigate('/academicHead');
  };

  // Determina los límites de las fechas basados en el periodo seleccionado
  const getDateLimits = (periodo: string) => {
    if (periodo === 'E-J') {
      // Permitir fechas entre el 18 de junio y el 16 de agosto
      return {
        minDate: new Date(new Date().getFullYear(), 5, 18), // 18 de junio
        maxDate: new Date(new Date().getFullYear(), 7, 16) // 16 de agosto
      };
    } else if (periodo === 'A-D') {
      // Permitir fechas entre el 10 de diciembre y el 10 de enero del siguiente año
      return {
        minDate: new Date(new Date().getFullYear(), 11, 10), // 10 de diciembre
        maxDate: new Date(new Date().getFullYear() + 1, 0, 10) // 10 de enero
      };
    }
    // Si no hay periodo seleccionado, no limitar fechas
    return {
      minDate: undefined,
      maxDate: undefined
    };
  };

  const { minDate, maxDate } = getDateLimits(form.periodo);


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Diagnóstico</Text>

      <Text style={styles.label}>Departamento Académico:</Text>
      <TextInput
        placeholder="Departamento Académico"
        value={form.departamento}
        onChangeText={text => handleInputChange('departamento', text)}
        style={styles.input}
      />

      <Text style={styles.label}>Fecha del Diagnóstico:</Text>
      <DatePicker
        selected={form.fechaDiagnostico}
        onChange={(date: Date | null) => {
          if (date) handleInputChange('fechaDiagnostico', date);
        }}
        dateFormat="dd/MM/yyyy"
        className="date-picker-input"
      />

      <Text style={styles.label}>Titular del Departamento:</Text>
      <TextInput
        placeholder="Titular del Departamento"
        value={form.titular}
        onChangeText={text => handleInputChange('titular', text)}
        style={styles.input}
      />

      <Text style={styles.label}>Presidente de Academia:</Text>
      <TextInput
        placeholder="Presidente de Academia"
        value={form.presidente}
        onChangeText={text => handleInputChange('presidente', text)}
        style={styles.input}
      />

      <Text style={styles.label}>Asignaturas Requeridas:</Text>
      <TextInput
        placeholder="Asignaturas Requeridas"
        value={form.asignaturas}
        onChangeText={text => handleInputChange('asignaturas', text)}
        style={styles.input}
      />

      <Text style={styles.label}>Contenidos Temáticos:</Text>
      <TextInput
        placeholder="Contenidos Temáticos"
        value={form.contenidos}
        onChangeText={text => handleInputChange('contenidos', text)}
        style={styles.input}
      />

      <Text style={styles.label}>Número de Docentes:</Text>
      <TextInput
        placeholder="Número de Docentes"
        keyboardType="numeric"
        value={form.numDocentes}
        onChangeText={text => handleInputChange('numDocentes', text)}
        style={styles.input}
      />

      <Text style={styles.label}>Tipo de Asignatura:</Text>
      <Picker
        selectedValue={form.tipoAsignatura}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange('tipoAsignatura', itemValue)}
      >
        <Picker.Item label="Carrera Genérica" value="generico" />
        <Picker.Item label="Módulo de Especialidad" value="especialidad" />
      </Picker>

      <Text style={styles.label}>Tipo de Actividad o Evento:</Text>
      <TextInput
        placeholder="Actividad o Evento"
        value={form.evento}
        onChangeText={text => handleInputChange('evento', text)}
        style={styles.input}
      />

      <Text style={styles.label}>Objetivo:</Text>
      <TextInput
        placeholder="Objetivo"
        value={form.objetivo}
        onChangeText={text => handleInputChange('objetivo', text)}
        style={styles.input}
      />

      <Text style={styles.label}>Carreras Atendidas:</Text>
      <TextInput
        placeholder="Carreras Atendidas"
        value={form.carreras}
        onChangeText={text => handleInputChange('carreras', text)}
        style={styles.input}
      />

      <Text style={styles.label}>Periodo:</Text>
      <Picker
        selectedValue={form.periodo}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange('periodo', itemValue)}
      >
        <Picker.Item label="Selecciona un periodo" value="" />
        <Picker.Item label="Enero - Junio" value="E-J" />
        <Picker.Item label="Agosto - Diciembre" value="A-D" />
      </Picker>

      <Text style={styles.label}>Fecha inicio del Curso:</Text>
      <DatePicker
        selected={form.fechaInicio}
        onChange={(date: Date | null) => {
          if (date) handleInputChange('fechaInicio', date);
        }}
        dateFormat="dd/MM/yyyy"
        className="date-picker-input"
        minDate={minDate}
        maxDate={maxDate}
      />

      <Text style={styles.label}>Fecha fin del Curso:</Text>
      <DatePicker
        selected={form.fechaFin}
        onChange={(date: Date | null) => {
          if (date) handleInputChange('fechaFin', date);
        }}
        dateFormat="dd/MM/yyyy"
        className="date-picker-input"
        minDate={minDate}
        maxDate={maxDate}
      />

      <Text style={styles.label}>Turno:</Text>
      <Picker
        selectedValue={form.turno}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange('turno', itemValue)}
      >
        <Picker.Item label="Matutino" value="M" />
        <Picker.Item label="Vespertino" value="V" />
      </Picker>

      <Text style={styles.label}>Facilitadores Propuestos:</Text>
      <TextInput
        placeholder="Facilitadores Propuestos"
        value={form.facilitadores}
        onChangeText={text => handleInputChange('facilitadores', text)}
        style={styles.input}
      />

      <Button title="Guardar Diagnóstico" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    height: 50,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20
  },
});

export default AgregarDiagnostico;
