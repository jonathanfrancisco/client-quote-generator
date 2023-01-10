/* 3rd Party libraries/packages */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StatusBar, Platform, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/* Screens components */
import Dashboard from '@app/src/screens/Dashboard/Dashboard';
import CreateQuote from '@app/src/screens/CreateQuote/CreateQuote';
import Benefits from '@app/src/screens/Benefits/Benefits';

/* 
  Why this code? To be able to use toLocaleString to format numbers or use intl
*/
if (Platform.OS === 'android') {
  // only android needs polyfill
  require('intl'); // import intl object
  require('intl/locale-data/jsonp/en-PH'); // load the required locale details
}

// TODO: Support Internationalization for iOS Devices

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}>
          <Stack.Navigator initialRouteName="Dashboard">
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateQuote"
              component={CreateQuote}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Benefits"
              component={Benefits}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
