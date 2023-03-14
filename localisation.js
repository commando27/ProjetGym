import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Localisation = ({ route, navigation }) => {
    const { gym } = route.params;

    function LogoTitle() {
        return (
            <Text style={styles.gymName}>{gym.nom}</Text>
        );
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <LogoTitle />,
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: gym.latitude,
                    longitude: gym.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                <Marker
                    coordinate={{ latitude: gym.latitude, longitude: gym.longitude }}
                    title={gym.nom}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },

    gymName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default Localisation;
