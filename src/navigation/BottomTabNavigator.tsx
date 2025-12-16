import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CompassScreen from '../screens/CompassScreen';
import TrackerScreen from '../screens/TrackerScreen';
import TasbihScreen from '../screens/TasbihScreen';
import InsightScreen from '../screens/InsightScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import DoaScreen from '../screens/DoaScreen';
import PremiumScreen from '../screens/PremiumScreen';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const MoreStack = createStackNavigator();

// More/Settings stack with additional screens
function MoreStackScreen() {
    return (
        <MoreStack.Navigator screenOptions={{ headerShown: false }}>
            <MoreStack.Screen name="SettingsMain" component={SettingsScreen} />
            <MoreStack.Screen name="Calendar" component={CalendarScreen} />
            <MoreStack.Screen name="Doa" component={DoaScreen} />
            <MoreStack.Screen name="Tracker" component={TrackerScreen} />
            <MoreStack.Screen name="Premium" component={PremiumScreen} />
        </MoreStack.Navigator>
    );
}

export default function BottomTabNavigator() {
    const theme = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#c9a227',
                tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
                tabBarStyle: {
                    backgroundColor: '#0a1628',
                    borderTopColor: 'rgba(201, 162, 39, 0.2)',
                    borderTopWidth: 1,
                    height: 70,
                    paddingBottom: 12,
                    paddingTop: 6,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '500',
                },
                tabBarIconStyle: {
                    marginBottom: -2,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Compass') {
                        iconName = focused ? 'compass' : 'compass-outline';
                    } else if (route.name === 'Insight') {
                        iconName = focused ? 'lightbulb-on' : 'lightbulb-outline';
                    } else if (route.name === 'Tasbih') {
                        iconName = 'counter';
                    } else if (route.name === 'More') {
                        iconName = focused ? 'dots-horizontal-circle' : 'dots-horizontal-circle-outline';
                    }

                    return <MaterialCommunityIcons name={iconName} size={22} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Sholat' }} />
            <Tab.Screen name="Compass" component={CompassScreen} options={{ title: 'Kiblat' }} />
            <Tab.Screen name="Insight" component={InsightScreen} options={{ title: 'Insight' }} />
            <Tab.Screen name="Tasbih" component={TasbihScreen} options={{ title: 'Tasbih' }} />
            <Tab.Screen name="More" component={MoreStackScreen} options={{ title: 'Lainnya' }} />
        </Tab.Navigator>
    );
}

