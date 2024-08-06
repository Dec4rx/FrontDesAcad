// Index.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link, router } from 'expo-router';

const Index = () => {
    return (
        <View style={styles.container}>

            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button} onPress={() => router.push('loginAcademicDevelopment')}>
                    <MaterialCommunityIcons name="school" size={24} color="white" />
                    <Text style={styles.buttonText}>Desarrollo Académico</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => router.push('loginAcademicHeads')}>
                    <MaterialCommunityIcons name="account-tie" size={24} color="white" />
                    <Text style={styles.buttonText}>Jefes Académicos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => router.push('loginCoordinators')}>
                    <MaterialCommunityIcons name="account-group" size={24} color="white" />
                    <Text style={styles.buttonText}>Coordinadores</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => router.push('loginProfessors')}>
                    <FontAwesome5 name="chalkboard-teacher" size={24} color="white" />
                    <Text style={styles.buttonText}>Profesores</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => router.push('loginAuthorizers')}>
                    <MaterialCommunityIcons name="account-check" size={24} color="white" />
                    <Text style={styles.buttonText}>Autorizadores</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
};

const { width } = Dimensions.get('window'); // Get the width of the device window

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    titleBar: {
        backgroundColor: '#621132',
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        color: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 10
    },
    button: {
        backgroundColor: '#1B396A',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        width: (width - 60) / 2, // Calculate the width for two buttons per row
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 16
    }
});

export default Index;