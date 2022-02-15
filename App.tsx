/* 3rd Party libraries/packages */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Platform, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

/* Screens components */
import Home from './components/screens/Home';
import CreateQuote from './components/screens/CreateQuote/CreateQuote';

import theme from './theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}
        >
          <Stack.Navigator initialRouteName='home'>
            <Stack.Screen
              name='home'
              component={Home}
              options={{ title: 'Home', headerShown: false }}
            />
            <Stack.Screen
              name='createQuote'
              component={CreateQuote}
              options={{
                title: 'Create Quote',
                headerStyle: {
                  backgroundColor: theme.Colors.primary,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
              }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </ThemeProvider>
    </NavigationContainer>
  );
}
