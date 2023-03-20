import React, { useState, useEffect } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Parametre = ({ }) => {
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        //regarder si l'utilisateur veut qu'on ce souvienne de lui
        AsyncStorage.getItem('rememberMe').then(value => {
            setRememberMe(value === 'true');
        });
        if (rememberMe) {
            AsyncStorage.setItem('rememberMe');
        } else {
            AsyncStorage.removeItem('rememberMe');
        }
    }, []);

    const handleRememberMeSwitch = value => {
        //  changer l'état (ce souvenir de moi)
        AsyncStorage.setItem('rememberMe', value.toString());
        setRememberMe(value);
    };

    return (
        <View style={[{ flexDirection: 'row' }, styles.container]}>
            <Text style={{ marginRight: 10 }}>Rester connecté :</Text>
            <Switch
                value={rememberMe}
                onValueChange={handleRememberMeSwitch}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
});

export default Parametre;
