import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation, route }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const notification = {
        content: {
            title: 'Connexion',
            body: `Vous avez bien été connecté`,
        },
        trigger: null,
    };

    useEffect(() => {
        // Load the remember me state from storage
        AsyncStorage.getItem('rememberMe').then(value => {
            if (value === 'true') {
                navigation.replace('ListExercice'); // Navigate to the home screen if the user is already logged in
            }
        });
    }, []);


    const handleLogin = async () => {
        try {
            const users = await SecureStore.getItemAsync('users');
            const parsedUsers = JSON.parse(users);
            const user = parsedUsers.find(u => u.email === email && u.password === password);
            if (user) {
                navigation.navigate('ListExercice');

                Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                        shouldShowAlert: true,
                        shouldPlaySound: false,
                        shouldSetBadge: false,
                    }),
                });
                await Notifications.scheduleNotificationAsync(notification);


            } else {
                alert('Email ou mot de passe invalide');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleNewUser = async () => {
        try {
            const users = await SecureStore.getItemAsync('users');
            const parsedUsers = users ? JSON.parse(users) : [];
            if (parsedUsers.some(u => u.email === email)) {
                alert("L'utilisateur existe déjà");
            } else {
                const newUser = { email, password };
                parsedUsers.push(newUser);
                await SecureStore.setItemAsync('users', JSON.stringify(parsedUsers));
                navigation.navigate('ListExercice');
                Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                        shouldShowAlert: true,
                        shouldPlaySound: false,
                        shouldSetBadge: false,
                    }),
                });
                await Notifications.scheduleNotificationAsync(notification);

            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Connexion</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleNewUser}>
                <Text style={styles.buttonText}>Nouvel utilisateur</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        fontSize: 16,
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
