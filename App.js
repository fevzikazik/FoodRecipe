import { StatusBar } from 'expo-status-bar'; //<StatusBar style="auto" />
import React, { useState } from 'react';
import {
    View
} from 'react-native';
import { Login, Recipe } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import useFonts from './hooks/useFonts';

import Tabs from "./navigation/tabs";

const Stack = createStackNavigator();

const App = () => {

    const [IsReady, SetIsReady] = useState(false);

    const LoadFonts = async () => {
        await useFonts();
    };

    if (!IsReady) {
        return (
            <AppLoading
                startAsync={LoadFonts}
                onFinish={() => SetIsReady(true)}
                onError={() => { }}
            />
        );
    }
    
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Login'}
            >
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="Home"
                    component={Tabs}
                />
                <Stack.Screen
                    name="Recipe"
                    component={Recipe}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;