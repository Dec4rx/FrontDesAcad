import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { sing_up } from '@/services/authServices';
import { Sing_up } from '@/services/interfaces/AuthInterfaces';

const RegistroProfesores = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gender, setGender] = useState<string>('');
  const [form, setForm] = useState<Sing_up>({
    lastName: '',
    middleName: '',
    name: '',
    email: '',
    password: '',
    gender: '',
    rfc: '',
    curp: '',
    status: 'Pendiente'
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Estado para los errores

  const prepareFormForSubmission = () => {
    return {
      ...form,
      rfc: form.rfc.toUpperCase(),
      curp: form.curp.toUpperCase(),
      gender: gender
    };
  };

  const handleOnRegister = async () => {
    try {
      setIsSubmitting(true);

      const preparedForm = prepareFormForSubmission();

      // Llamada a la función sing_up
      const response = await sing_up(preparedForm);

      // Manejo de una respuesta exitosa
      await AsyncStorage.setItem('userData', JSON.stringify(response));
      router.replace('/professor');
    } catch (error) {
      console.error('Error en la solicitud:', error);

      // Verifica si el error es un objeto con una propiedad `message`
      if (error instanceof Error && error.message) {
        try {
          // Intenta parsear el mensaje de error si es un JSON string
          const parsedError = JSON.parse(error.message);
          setErrors(parsedError); // Asigna los errores al estado 'errors' para mostrarlos en el formulario
        } catch (parseError) {
          // Si no se puede parsear el error, muestra un mensaje genérico
          Alert.alert('Error', 'Ocurrió un problema al registrar el profesor.');
        }
      } else {
        // Muestra un mensaje genérico si `error` no tiene la forma esperada
        Alert.alert('Error', 'Ocurrió un problema desconocido.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar backgroundColor="#8B0000" barStyle="light-content" />
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Registro</Text>
        
        <TextInput
          placeholder="Primer Apellido"
          value={form.middleName}
          onChangeText={(text) => setForm({ ...form, middleName: text })}
          style={[styles.input, errors.middleName ? styles.inputError : null]}
        />
        {errors.middleName && <Text style={styles.errorText}>{errors.middleName}</Text>}
        
        <TextInput
          placeholder="Segundo Apellido"
          value={form.lastName}
          onChangeText={(text) => setForm({ ...form, lastName: text })}
          style={[styles.input, errors.lastName ? styles.inputError : null]}
        />
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
        
        <TextInput
          placeholder="Nombre(s)"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
          style={[styles.input, errors.name ? styles.inputError : null]}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        
        <Text style={styles.label}>Género</Text>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Femenino" value="femenino" />
          <Picker.Item label="Masculino" value="masculino" />
          <Picker.Item label="Otro" value="otro" />
        </Picker>

        <TextInput
          placeholder="RFC"
          value={form.rfc}
          onChangeText={(itemValue) => setForm({ ...form, rfc: itemValue })}
          style={[styles.input, errors.rfc ? styles.inputError : null]}
        />
        {errors.rfc && <Text style={styles.errorText}>{errors.rfc}</Text>}

        <TextInput
          placeholder="CURP"
          value={form.curp}
          onChangeText={(itemValue) => setForm({ ...form, curp: itemValue })}
          style={[styles.input, errors.curp ? styles.inputError : null]}
        />
        {errors.curp && <Text style={styles.errorText}>{errors.curp}</Text>}

        <TextInput
          placeholder="Email"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          style={[styles.input, errors.email ? styles.inputError : null]}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          placeholder="Password"
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
          style={[styles.input, errors.password ? styles.inputError : null]}
          secureTextEntry={true}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <TouchableOpacity
          disabled={isSubmitting}
          style={styles.button}
          onPress={handleOnRegister}
        >
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20
  },
  scrollContainer: {
    width: '100%'
  },
  title: {
    fontSize: 24,
    color: '#8B0000',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    height: 50,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center'
  },
  inputError: {
    borderColor: 'red'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'center',
    marginBottom: 10
  },
  picker: {
    height: 50,
    width: '90%',
    color: '#333',
    marginBottom: 20,
    alignSelf: 'center'
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#4169E1',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default RegistroProfesores;
