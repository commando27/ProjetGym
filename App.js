// App.jsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderTitle from './HeaderTitle';
import LoginScreen from './Login';
import ListExercice from './ListExercice';
import ListGym from './ListGym';
import Parametre from './parametre';
import Localisation from './localisation';

const Stack = createNativeStackNavigator();

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
          component={ListExercice}
          options={{
            headerTitle: props => <HeaderTitle {...props} />,
          }}
        />
        <Stack.Screen
          name="ListGym"
          component={ListGym}
          options={{ headerTitle: props => <HeaderTitle {...props} /> }}
        />
        <Stack.Screen
          name="localisation"
          component={Localisation}
          options={{ headerTitle: props => <HeaderTitle {...props} /> }}
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