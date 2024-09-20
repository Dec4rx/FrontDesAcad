import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { login } from '@/services/authServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormState {
  email: string;
  password: string;
}

const LoginProfesor: React.FC = () => {
  const [form, setForm] = useState<FormState>({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para el mensaje de error

  // Función para validar el formato del correo electrónico
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Función para manejar el login
  const handleLogin = async () => {
    setErrorMessage(null); // Reinicia el mensaje de error antes de validar

    // Validaciones de campos vacíos
    if (!form.email || !form.password) {
      setErrorMessage('Por favor completa todos los campos.');
      return;
    }

    // Validación de formato del correo electrónico
    if (!validateEmail(form.email)) {
      setErrorMessage('Por favor ingresa un correo electrónico válido.');
      return;
    }

    // Validación de longitud de la contraseña
    if (form.password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Validación de espacios en blanco en la contraseña
    if (/\s/.test(form.password)) {
      setErrorMessage('La contraseña no debe contener espacios.');
      return;
    }

    // Intento de login
    try {
      setIsSubmitting(true);
      const response = await login(form);
      await AsyncStorage.setItem('userData', JSON.stringify(response));
      router.replace('/professor');
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      setErrorMessage('Error al intentar iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navegar a la pantalla de registro
  const handleRegister = () => {
    router.navigate('/registerProfessors');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar backgroundColor="#8B0000" barStyle="light-content" />
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        style={styles.input}
        placeholderTextColor="#666"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />
      {errorMessage && errorMessage.includes('correo') && <Text style={styles.errorText}>{errorMessage}</Text>} {/* Mensaje de error del correo */}

      <TextInput
        placeholder="Contraseña"
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
        style={styles.input}
        placeholderTextColor="#666"
        secureTextEntry={true}
      />
      {errorMessage && errorMessage.includes('contraseña') && <Text style={styles.errorText}>{errorMessage}</Text>} {/* Mensaje de error de la contraseña */}
      {errorMessage && !errorMessage.includes('correo') && !errorMessage.includes('contraseña') && <Text style={styles.errorText}>{errorMessage}</Text>} {/* Mensaje de error general */}

      <TouchableOpacity
        style={styles.buttonIngresar}
        disabled={isSubmitting}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonRegistrarse} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <View>
        <Text>¿No tienes una cuenta?</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#8B0000',
    fontWeight: 'bold',
    marginBottom: 20,
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
    width: '80%',
  },
  buttonIngresar: {
    backgroundColor: '#1B396A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  buttonRegistrarse: {
    backgroundColor: '#4169E1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginProfesor;
