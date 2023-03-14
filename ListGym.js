import React from 'react';
import { Text, TouchableOpacity, StyleSheet, FlatList, View } from 'react-native';


const ListGym = ({ route, navigation }) => {

    const { gym } = route.params;

    console.log(gym);

    // Fonction pour afficher la carte de la ville sélectionnée
    function handlePress(gym) {
        navigation.navigate('localisation', { gym });
    }
    // Composant pour afficher chaque élément de la liste
    function Gym({ gym }) {
        return (
            <TouchableOpacity style={styles.exo} onPress={() => handlePress(gym)}>
                <Text style={styles.exoTitle}>{gym.nom}</Text>
                <Text style={styles.exoDescription}>latitude {gym.latitude} </Text>
                <Text style={styles.exoDescription}>longitude {gym.longitude} </Text>
            </TouchableOpacity >
        );
    }

    return (

        <View>
            <FlatList
                data={gym}
                keyExtractor={item => item.id?.toString()}
                renderItem={({ item }) => <Gym gym={item} />}
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


export default ListGym;
