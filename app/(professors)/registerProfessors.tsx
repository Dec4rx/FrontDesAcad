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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { sing_up } from '@/services/authServices';
import { Sing_up } from '@/services/interfaces/AuthInterfaces';

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

// interface FormValues {
//   name: string;
//   middleName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   gender: string;
//   rfc: string;
//   curp: string;
// }

const RegistroProfesores: React.FC<Props> = ({ navigation }) => {

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

  // Función para convertir los valores a mayúsculas
  const prepareFormForSubmission = () => {
    return {
      ...form,
      rfc: form.rfc.toUpperCase(),
      curp: form.curp.toUpperCase(),
      gender: gender
    };
  };

  const handleUpperCaseInput = (text: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(text.replace(/[^a-zA-Z0-9]/g, '').toUpperCase());
  };

  const handleOnRegister = async () => {
    if (!form.email || !form.password || !form.lastName || !form.middleName || !form.name || !form.gender || !form.rfc || !form.curp) {
      Alert.alert('Error', 'Please fill all fields')
    } else if (form.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters')
    }

     // Antes de enviar, convertimos RFC y CURP a mayúsculas
     const preparedForm = prepareFormForSubmission();

    try {
      console.log(preparedForm)
      const singUp = await sing_up(preparedForm)

      //Save the data (id, fullName, email)
      await AsyncStorage.setItem('userData', JSON.stringify(singUp));
      console.log('Registradooooooooooooooooo');
      router.replace('/professor')
    } catch (error: any) {
      console.error(error)
      Alert.alert('Error', error.message)
    } 
  }

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
          style={styles.input}
        />
        <TextInput
          placeholder="Segundo Apellido"
          value={form.lastName}
          onChangeText={(text) => setForm({ ...form, lastName: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Nombre(s)"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
          style={styles.input}
        />
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
          style={styles.input}
        />
        <TextInput
          placeholder="CURP"
          value={form.curp}
          onChangeText={(itemValue) => setForm({ ...form, curp: itemValue })}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
          style={styles.input}
          secureTextEntry={true}
        />

        <TouchableOpacity
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
    justifyContent: 'center', // Alinea el contenido verticalmente
    alignItems: 'center',     // Alinea el contenido horizontalmente
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
    textAlign: 'center' // Asegura que el título también esté centrado
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
    width: '45%', // Ajustado para mejorar la visualización
    alignSelf: 'center' // Alinea individualmente al centro
  },
  picker: {
    height: 50,
    width: '45%', // Ajustado para mejorar la visualización
    color: '#333',
    marginBottom: 20,
    alignSelf: 'center' // Alinea individualmente al centro
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    alignSelf: 'center', // Asegura que las etiquetas también estén centradas
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#4169E1',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '45%', // Ajustado para mejorar la visualización
    alignSelf: 'center' // Alinea individualmente al centro
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});


export default RegistroProfesores;



