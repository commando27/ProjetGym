import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';

const db = SQLite.openDatabase('mydb.db');

const ListExercice = ({ navigation }) => {

    const [exercices, setExercices] = useState([]);

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
            <FlatList
                data={exercices}
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
});



export default ListExercice;
