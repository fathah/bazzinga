import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenNames, Screens } from '../constants/screens.ts';

const Stack = createNativeStackNavigator();


const AppStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ScreenNames.HOME}
        screenOptions={{ headerShown: false }}
      >

        {
          Screens.map((scr)=><Stack.Screen name={scr.name}
                                           component={scr.screen} />)
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppStackNavigator;
