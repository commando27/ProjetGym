// HeaderTitle.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const HeaderTitle = ({ navigation }) => {

    const handleNavigation = () => {

        navigation.navigate('parametre');

    };

    return (
        <View style={[{ flexDirection: 'row' }]}>
            <View style={[{ flex: 1 }]}>
                <Image style={{ width: 50, height: 50 }} source={require('./logo.png')} />
            </View>

            <View style={{ flex: 4 }} ></View>

            <View style={{ flex: 5 }} >
                <TouchableOpacity onPress={handleNavigation}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, }} >Parametre</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HeaderTitle;