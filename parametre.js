import React, { useState, useEffect } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Parametre = ({ }) => {
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        // Load the remember me state from storage
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
        // Store the remember me state in storage
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
