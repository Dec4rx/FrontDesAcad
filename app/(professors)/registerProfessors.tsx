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
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { router } from 'expo-router';

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

interface primerApellido{

}

const RegistroProfesores: React.FC<Props> = ({ navigation }) => {
  const [primerApellido, setPrimerApellido] = useState<string>('');
  const [segundoApellido, setSegundoApellido] = useState<string>('');
  const [nombres, setNombres] = useState<string>('');
  const [genero, setGenero] = useState<string>('');
  const [rfc, setRfc] = useState<string>('');
  const [curp, setCurp] = useState<string>('');

  const handleUpperCaseInput = (text: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(text.replace(/[^a-zA-Z0-9]/g, '').toUpperCase());
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
          value={primerApellido}
          onChangeText={setPrimerApellido}
          style={styles.input}
        />
        <TextInput
          placeholder="Segundo Apellido"
          value={segundoApellido}
          onChangeText={setSegundoApellido}
          style={styles.input}
        />
        <TextInput
          placeholder="Nombre(s)"
          value={nombres}
          onChangeText={setNombres}
          style={styles.input}
        />
        <Text style={styles.label}>Género</Text>
        <Picker
          selectedValue={genero}
          style={styles.picker}
          onValueChange={(itemValue) => setGenero(itemValue)}
        >
          <Picker.Item label="Femenino" value="femenino" />
          <Picker.Item label="Masculino" value="masculino" />
          <Picker.Item label="Otro" value="otro" />
        </Picker>
        <TextInput
          placeholder="RFC"
          value={rfc}
          onChangeText={(text) => handleUpperCaseInput(text, setRfc)}
          style={styles.input}
        />
        <TextInput
          placeholder="CURP"
          value={curp}
          onChangeText={(text) => handleUpperCaseInput(text, setCurp)}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            console.log('Registrado');


            router.replace('/loginProfessors');
          }}
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

