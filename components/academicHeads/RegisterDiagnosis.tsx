import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import DatePicker from 'react-datepicker'; // Importa react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Importa los estilos de react-datepicker
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { DiagnosisForm, DiagnosisFormString } from '@/services/interfaces/AcademicHead';
import { registerDiagnostic } from '@/services/Diagnosis';
// import { newDate } from 'react-datepicker/dist/date_utils';


const AgregarDiagnostico = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<DiagnosisForm>({
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
    status: 'Autorizado',
    facilitators: '',
    dateDiagnosis: new Date(),
    startDate: new Date(),
    endDate: new Date(),
    numberProfessors: 0,
    shift: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = <K extends keyof DiagnosisForm>(prop: K, value: DiagnosisForm[K]) => {
    setForm({ ...form, [prop]: value });
    setErrors({ ...errors, [prop]: '' }); // Limpiar el error del campo modificado
  };

  const handleSaveDiagnosis = async () => {
    setIsLoading(true);
    setErrors({}); // Limpiar errores antes de enviar
    try {
      const diagnosis = await registerDiagnostic(form);
      console.log('Diagnóstico guardado exitosamente:', diagnosis);
      router.navigate('/academicHead');
    } catch (error: any) {
      // Revisar la estructura del error capturado
      console.error('Error al guardar el diagnóstico:', error);
  
      // Si el error capturado tiene una estructura con errores específicos
      if (error && typeof error === 'object') {
        setErrors(error); // Ajustar la estructura si es necesario según el formato del servidor
      } else {
        setErrors({ general: 'Error al guardar el diagnóstico. Inténtalo de nuevo.' });
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  // Determina los límites de las fechas basados en el periodo seleccionado
  const getDateLimits = (periodo: string) => {
    if (periodo === 'Enero-Junio') {
      // Permitir fechas entre el 18 de junio y el 16 de agosto
      return {
        minDate: new Date(new Date().getFullYear(), 5, 18), // 18 de junio
        maxDate: new Date(new Date().getFullYear(), 7, 16) // 16 de agosto
      };
    } else if (periodo === 'Agosto-Diciembre') {
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

  const { minDate, maxDate } = getDateLimits(form.period);

  if (isLoading) {
    return (
      <div>
        <div>Cargando...</div>
      </div>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Diagnóstico</Text>

      <Text style={styles.label}>Departamento Académico:</Text>
      <TextInput
        placeholder="Departamento Académico"
        value={form.departament}
        onChangeText={text => handleInputChange('departament', text)}
        style={[styles.input, errors.departament ? styles.inputError : null]}
      />
      {errors.departament && <Text style={styles.errorText}>{errors.departament}</Text>}

      <Text style={styles.label}>Fecha del Diagnóstico:</Text>
      <DatePicker
        selected={form.dateDiagnosis}
        onChange={(date: Date | null) => {
          if (date) handleInputChange('dateDiagnosis', date);
        }}
        dateFormat="dd/MM/yyyy"
        className={`date-picker-input ${errors.dateDiagnosis ? 'input-error' : ''}`}
      />
      {errors.dateDiagnosis && <Text style={styles.errorText}>{errors.dateDiagnosis}</Text>}

      <Text style={styles.label}>Titular del Departamento:</Text>
      <TextInput
        placeholder="Titular del Departamento"
        value={form.headDepartment}
        onChangeText={text => handleInputChange('headDepartment', text)}
        style={[styles.input, errors.headDepartment ? styles.inputError : null]}
      />
      {errors.headDepartment && <Text style={styles.errorText}>{errors.headDepartment}</Text>}

      <Text style={styles.label}>Presidente de Academia:</Text>
      <TextInput
        placeholder="Presidente de Academia"
        value={form.presidentAcademy}
        onChangeText={text => handleInputChange('presidentAcademy', text)}
        style={[styles.input, errors.presidentAcademy ? styles.inputError : null]}
      />
      {errors.presidentAcademy && <Text style={styles.errorText}>{errors.presidentAcademy}</Text>}

      <Text style={styles.label}>Titular de la Subdireción:</Text>
      <TextInput
        placeholder="Titular de la Subdireción"
        value={form.titleSubdirectorate}
        onChangeText={text => handleInputChange('titleSubdirectorate', text)}
        style={[styles.input, errors.titleSubdirectorate ? styles.inputError : null]}
      />
      {errors.titleSubdirectorate && <Text style={styles.errorText}>{errors.titleSubdirectorate}</Text>}

      <Text style={styles.label}>Asignaturas Requeridas:</Text>
      <TextInput
        placeholder="Asignaturas Requeridas"
        value={form.requiredSubjects}
        onChangeText={text => handleInputChange('requiredSubjects', text)}
        style={[styles.input, errors.requiredSubjects ? styles.inputError : null]}
      />
      {errors.requiredSubjects && <Text style={styles.errorText}>{errors.requiredSubjects}</Text>}

      <Text style={styles.label}>Contenidos Temáticos:</Text>
      <TextInput
        placeholder="Contenidos Temáticos"
        value={form.thematicContents}
        onChangeText={text => handleInputChange('thematicContents', text)}
        style={[styles.input, errors.thematicContents ? styles.inputError : null]}
      />
      {errors.thematicContents && <Text style={styles.errorText}>{errors.thematicContents}</Text>}

      <Text style={styles.label}>Número de Docentes:</Text>
      <TextInput
        placeholder="Número de Docentes"
        keyboardType="numeric"
        value={form.numberProfessors.toString()}
        onChangeText={text => handleInputChange('numberProfessors', Number(text))}
        style={[styles.input, errors.numberProfessors ? styles.inputError : null]}
      />
      {errors.numberProfessors && <Text style={styles.errorText}>{errors.numberProfessors}</Text>}

      <Text style={styles.label}>Tipo de Asignatura:</Text>
      <Picker
        selectedValue={form.typeSubject}
        style={[styles.picker, errors.typeSubject ? styles.inputError : null]}
        onValueChange={(itemValue) => handleInputChange('typeSubject', itemValue)}
      >
        <Picker.Item label="Seleccione el Tipo" value="" />
        <Picker.Item label="Carrera Genérica" value="generico" />
        <Picker.Item label="Módulo de Especialidad" value="especialidad" />
      </Picker>
      {errors.typeSubject && <Text style={styles.errorText}>{errors.typeSubject}</Text>}

      <Text style={styles.label}>Tipo de Actividad o Evento:</Text>
      <TextInput
        placeholder="Actividad o Evento"
        value={form.activityEvent}
        onChangeText={text => handleInputChange('activityEvent', text)}
        style={[styles.input, errors.activityEvent ? styles.inputError : null]}
      />
      {errors.activityEvent && <Text style={styles.errorText}>{errors.activityEvent}</Text>}

      <Text style={styles.label}>Objetivo:</Text>
      <TextInput
        placeholder="Objetivo"
        value={form.objective}
        onChangeText={text => handleInputChange('objective', text)}
        style={[styles.input, errors.objective ? styles.inputError : null]}
      />
      {errors.objective && <Text style={styles.errorText}>{errors.objective}</Text>}

      <Text style={styles.label}>Carreras Atendidas:</Text>
      <TextInput
        placeholder="Carreras Atendidas"
        value={form.careersAttended}
        onChangeText={text => handleInputChange('careersAttended', text)}
        style={[styles.input, errors.careersAttended ? styles.inputError : null]}
      />
      {errors.careersAttended && <Text style={styles.errorText}>{errors.careersAttended}</Text>}

      <Text style={styles.label}>Periodo:</Text>
      <Picker
        selectedValue={form.period}
        style={[styles.picker, errors.period ? styles.inputError : null]}
        onValueChange={(itemValue) => handleInputChange('period', itemValue)}
      >
        <Picker.Item label="Selecciona un periodo" value="" />
        <Picker.Item label="Enero - Junio" value="Enero-Junio" />
        <Picker.Item label="Agosto - Diciembre" value="Agosto-Diciembre" />
      </Picker>
      {errors.period && <Text style={styles.errorText}>{errors.period}</Text>}

      <Text style={styles.label}>Fecha inicio del Curso:</Text>
      <DatePicker
        selected={form.startDate}
        onChange={(date: Date | null) => {
          if (date) handleInputChange('startDate', date);
        }}
        dateFormat="dd/MM/yyyy"
        className={`date-picker-input ${errors.startDate ? 'input-error' : ''}`}
        minDate={minDate}
        maxDate={maxDate}
      />
      {errors.startDate && <Text style={styles.errorText}>{errors.startDate}</Text>}

      <Text style={styles.label}>Fecha fin del Curso:</Text>
      <DatePicker
        selected={form.endDate}
        onChange={(date: Date | null) => {
          if (date) handleInputChange('endDate', date);
        }}
        dateFormat="dd/MM/yyyy"
        className={`date-picker-input ${errors.endDate ? 'input-error' : ''}`}
        minDate={minDate}
        maxDate={maxDate}
      />
      {errors.endDate&& <Text style={styles.errorText}>{errors.endDate}</Text>}

      <Text style={styles.label}>Turno:</Text>
      <Picker
        selectedValue={form.shift}//TODO: Check this
        style={[styles.picker, errors.shift ? styles.inputError : null]}
        onValueChange={(itemValue) => handleInputChange('shift', itemValue)}
      >
        <Picker.Item label="Selecciona un turno" value="" />
        <Picker.Item label="Matutino" value="Matutino" />
        <Picker.Item label="Vespertino" value="Vespertino" />
      </Picker>
      {errors.shift && <Text style={styles.errorText}>{errors.shift}</Text>}

      <Text style={styles.label}>Facilitadores Propuestos:</Text>
      <TextInput
        placeholder="Facilitadores Propuestos"
        value={form.facilitators}
        onChangeText={text => handleInputChange('facilitators', text)}
        style={[styles.input, errors.facilitators ? styles.inputError : null]}
      />
      {errors.facilitators && <Text style={styles.errorText}>{errors.facilitators}</Text>}

      <Button title="Guardar Diagnóstico" onPress={handleSaveDiagnosis} />
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
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  }
});

export default AgregarDiagnostico;