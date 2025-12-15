import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';

const Stack = createStackNavigator();

import BottomTabNavigator from './BottomTabNavigator';

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={BottomTabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
