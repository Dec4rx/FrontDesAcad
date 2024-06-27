// LoginDesarrolloAcademico.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { RouteProp } from '@react-navigation/native';
import { isLoading } from 'expo-font';

interface LoginParams {
  // title: string;
  navigate: string;
}

interface FormState {
  email: string;
  password: string;
}


interface LoginBaseProps {
  route: string;
}
const Login_Base: React.FC<LoginBaseProps> = ({ route }) => {
  const [form, setForm] = useState<FormState>({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields')
    } else if (form.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters')
    }

    try {
      // const logIn = await log_in(form)

      //Save the data (id, fullName, email)
      // await AsyncStorage.setItem('userData', JSON.stringify(logIn));

      //Por ahora a Profesores 
      router.replace(route)
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >

      <StatusBar backgroundColor="#8B0000" barStyle="light-content" />
      <Text style={styles.title}>Bienvenido</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={form.email}
          onChangeText={(e) => setForm({ ...form, password: e })}
          style={styles.input}
          placeholderTextColor="#666"
          autoCapitalize="none" // Desactivar capitalización automática
          autoCorrect={false} // Desactivar corrección automática
        />
        <TextInput
          placeholder="Contraseña"
          value={form.password}
          onChangeText={(e) => setForm({ ...form, password: e })}
          style={styles.input}
          placeholderTextColor="#666"
          secureTextEntry={true} // Ocultar texto de contraseña
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonIngresar} disabled={isSubmitting} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text>¿No tienes una cuenta?</Text>
        <Link href="/sign-up" >Sign Up</Link>
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
  inputContainer: {
    width: '75%',
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
  },
  buttonContainer: {
    width: '75%',
  },
  buttonEntrar: {
    backgroundColor: '#4169E1', // Azul
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonIngresar: {
    backgroundColor: '#1B396A', // Azul
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});

export default Login_Base;