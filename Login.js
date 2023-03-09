import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const users = await SecureStore.getItemAsync('users');
            const parsedUsers = JSON.parse(users);
            const user = parsedUsers.find(u => u.email === email && u.password === password);
            if (user) {
                navigation.navigate('StoreListScreen');
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
                navigation.navigate('StoreListScreen');
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
