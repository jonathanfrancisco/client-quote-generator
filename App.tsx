/* 3rd Party libraries/packages */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StatusBar, Platform, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/* Screens components */
import Dashboard from '@app/src/screens/Dashboard/Dashboard';
import CreateQuote from '@app/src/screens/CreateQuote/CreateQuote';
import Benefits from '@app/src/screens/Benefits/Benefits';
import AddBenefit from '@app/src/screens/AddBenefit/AddBenefit';
import Products from '@app/src/screens/Products/Products';
import EditBenefit from '@app/src/screens/EditBenefit/EditBenefit';
import AddProduct from '@app/src/screens/AddProduct/AddProduct';

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

const stackscreenOpts: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'fade',
};

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
              options={stackscreenOpts}
            />
            <Stack.Screen
              name="CreateQuote"
              component={CreateQuote}
              options={stackscreenOpts}
            />
            <Stack.Screen
              name="Products"
              component={Products}
              options={stackscreenOpts}
            />
            <Stack.Screen
              name="AddProduct"
              component={AddProduct}
              options={stackscreenOpts}
            />
            <Stack.Screen
              name="Benefits"
              component={Benefits}
              options={stackscreenOpts}
            />
            <Stack.Screen
              name="AddBenefit"
              component={AddBenefit}
              options={stackscreenOpts}
            />
            <Stack.Screen
              name="EditBenefit"
              component={EditBenefit}
              options={stackscreenOpts}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
