// App.jsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Login';
import ListExercice from './ListExercice';
import ListGym from './ListGym';
import Parametre from './Parametre';
import Localisation from './Localisation';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (

    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name="Exercices" component={ListExercice} />
      <Drawer.Screen name="parametre" component={Parametre} />
    </Drawer.Navigator>
  );
}

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Login"
          component={LoginScreen}

        />
        <Stack.Screen
          name="ListExercice"
          component={MyDrawer}
        />
        <Stack.Screen
          name="ListGym"
          component={ListGym}
        />
        <Stack.Screen
          name="localisation"
          component={Localisation}
        />
        <Stack.Screen
          name="parametre"
          component={Parametre}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;