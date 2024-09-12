import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, KeyboardAvoidingView, Platform, Alert } from 'react-native';
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


  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields');
    } else if (form.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
    } else {
      try {
        setIsSubmitting(true);
        // Simulated login function
        console.log(form)
        const response = await login(form);
        console.log('Login success');
        await AsyncStorage.setItem('userData', JSON.stringify(response));
        router.replace('/professor')
        // navigation.replace('HomeScreen'); // Navigate to home screen after login
      } catch (error) {
        console.error('Login failed:', error);
        Alert.alert('Login Error', 'Failed to login');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleRegister = () => {
    // Navigation to the Register screen
    router.navigate("/registerProfessors");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar backgroundColor="#8B0000" barStyle="light-content" />
      <Text style={styles.title}>Login </Text>

      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        style={styles.input}
        placeholderTextColor="#666"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        placeholder="Contraseña"
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
        style={styles.input}
        placeholderTextColor="#666"
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={styles.buttonIngresar}
        disabled={isSubmitting}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonRegistrarse}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <View>
        <Text>¿No tienes una cuenta?</Text>
        {/* <Link href="sign-up" >Sign Up</Link> */}
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
    padding: 20
  },
  title: {
    fontSize: 24,
    color: '#8B0000',
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
    color: '#333',
    marginBottom: 10,
    width: '45%'
  },
  buttonIngresar: {
    backgroundColor: '#1B396A', // Azul oscuro
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '15%',
    marginBottom: 10
  },
  buttonRegistrarse: {
    backgroundColor: '#4169E1', // Azul más claro
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '15%'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default LoginProfesor;
