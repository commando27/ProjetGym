import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Switch, StyleSheet } from 'react-native';
import LoginScreen from './Login';
import ListExercice from './ListExercice';
import { useUserLoggedIn } from './App';



const Parametre = ({ }) => {

    const [isUserLoggedIn, setIsUserLoggedIn] = useUserLoggedIn();
    console.log(isUserLoggedIn);

    //const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsUserLoggedIn(previousState => !previousState);


    return (
        <View style={[{ flexDirection: 'row' }, styles.container]}>
            <Text style={{ marginRight: 10 }}>Rester connecté :</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isUserLoggedIn ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isUserLoggedIn}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default Parametre;
