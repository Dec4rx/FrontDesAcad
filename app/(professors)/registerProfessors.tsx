// RegistroProfesores.js
import React, { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const RegistroProfesores = ({ navigation }) => {
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [nombres, setNombres] = useState('');
  const [genero, setGenero] = useState('');
  const [rfc, setRfc] = useState('');
  const [curp, setCurp] = useState('');

  const handleUpperCaseInput = (text, setter) => {
    setter(text.replace(/[^a-zA-Z0-9]/g, '').toUpperCase());
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar backgroundColor="#8B0000" barStyle="light-content" />
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Registro de Profesores</Text>
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
          onValueChange={(itemValue, itemIndex) => setGenero(itemValue)}
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

            
            navigation.navigate('LoginProfesores');
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20
  },
  scrollContainer: {
    width: '100%',
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
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5
  },
  button: {
    backgroundColor: '#4169E1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default RegistroProfesores;
