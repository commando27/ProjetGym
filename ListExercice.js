import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = SQLite.openDatabase('mydb.db');

const ListExercice = ({ navigation }) => {


    const [exercices, setExercices] = useState([]);
    const [infoClient, setInfoClient] = useState('');
    const [text, setText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    //fonction qui permet de rechercher et retoune une liste d'exercices
    const handleSearch = () => {
        const results = exercices.filter((exercise) =>
            exercise.nom.toLowerCase().includes(text.toLowerCase())
        );
        if (results.length === 0) {
            setSearchResults(exercices);
        } else {
            setSearchResults(results);
        }

    }
    // l'entete de page
    function LogoTitle() {
        AsyncStorage.getItem('Courriel').then(email => {
            setInfoClient(email);
            console.log(infoClient);
        });
        return (
            <Text>{infoClient}</Text>
        );
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <LogoTitle />,
        });
    }, [navigation]);

    // Charger les données si elles ne l'ont pas été
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS exercices (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, description TEXT, listGym TEXT)',
            );
        });
        loadData();
        console.log("exo : " + exercices);
    }, []);

    const loadData = () => {
        axios.get('https://my-json-server.typicode.com/commando27/ProjetGym/posts')
            .then(response => {
                setExercices(response.data);
                db.transaction(tx => {
                    tx.executeSql(
                        'DELETE FROM exercices;'
                    );
                    response.data.forEach(exo => {
                        tx.executeSql(
                            'INSERT INTO exercices (nom, description, listGym) VALUES (?, ?, ?);',
                            [exo.nom, exo.description, exo.listGym],
                            (_, error) => {
                                if (error) {
                                    console.log(error);
                                }
                            }
                        );
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Fonction pour afficher la carte de la ville sélectionnée
    function handlePress(gym) {
        navigation.navigate('ListGym', { gym });
    }

    // Composant pour afficher chaque élément de la liste
    function ExoItem({ exo }) {
        return (
            <TouchableOpacity style={styles.exo} onPress={() => handlePress(exo.listGym)}>
                <Text style={styles.exoTitle}>{exo.nom}</Text>
                <Text style={styles.exoDescription}>{exo.description}</Text>
            </TouchableOpacity >
        );
    }

    return (
        <View>

            <View style={styles.container}>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={setText}
                    value={text}
                    placeholder="Recherche par nom"
                    onSubmitEditing={handleSearch}
                />
            </View>


            <FlatList
                data={searchResults.length ? searchResults : exercices}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <ExoItem exo={item} />}
                contentContainerStyle={styles.list}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        width: '100%',
    },
    exo: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    exoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    exoDescription: {
        fontSize: 16,
        marginBottom: 5,
    },
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 16,
    },
});



export default ListExercice;
