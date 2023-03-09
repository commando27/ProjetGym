import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';

const db = SQLite.openDatabase('mydb.db');
const ListGym = ({ navigation }) => {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS gym (id INTEGER PRIMARY KEY AUTOINCREMENT, address TEXT, banner TEXT, city TEXT, lastVisit TEXT, latitude INTEGER, longitude INTEGER);'
            );
        });
        loadData();
    }, []);

    const loadData = () => {
        axios.get('https://my-json-server.typicode.com/commando27/ProjetGym/posts')
            .then(response => {
                setStores(response.data);
                db.transaction(tx => {
                    tx.executeSql(
                        'DELETE FROM gym;'
                    );
                    response.data.forEach(store => {
                        tx.executeSql(
                            'INSERT INTO gym (address, banner, city, lastVisit, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?);',
                            [store.address, store.banner, store.city, store.lastVisit, store.latitude, store.longitude],
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

    const handleStorePress = store => {
        navigation.navigate('StoreDetails', { store });
    };

    return (
        <FlatList
            data={stores}
            keyExtractor={store => store.id.toString()}
            renderItem={({ item: store }) => (
                <TouchableOpacity style={styles.store} onPress={() => handleStorePress(store)}>
                    <Text style={styles.storeTitle}>{store.banner}</Text>
                    <Text style={styles.storeAddress}>{store.address}</Text>
                    <Text style={styles.storeDate}>{store.lastVisit}</Text>
                </TouchableOpacity>
            )}
            contentContainerStyle={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        width: '100%',
    },
    store: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    storeTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    storeAddress: {
        fontSize: 16,
        marginBottom: 5,
    },
    storeDate: {
        fontSize: 16,
        color: 'gray',
    },
});


export default ListGym;
