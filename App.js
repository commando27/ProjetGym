// App.jsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderTitle from '../HeaderTitle';
import LoginScreen from '../Login';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitle: props => <HeaderTitle {...props} />,
          }}
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
          component={StoreDetailsScreen}
          options={{ headerTitle: props => <HeaderTitle {...props} /> }}
        />
        <Stack.Screen
          name="localisation"
          component={StoreDetailsScreen}
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