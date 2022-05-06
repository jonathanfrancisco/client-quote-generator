/* 3rd Party libraries/packages */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, StatusBar, Platform, View } from "react-native";
import { ThemeProvider, Button } from "react-native-elements";

/* Screens components */
import Dashboard from "./src/screens/Dashboard/Dashboard";
import CreateQuote from "./src/screens/CreateQuote/CreateQuote";

import theme from "./theme";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        >
          <Stack.Navigator initialRouteName="DASHBOARD">
            <Stack.Screen
              name="DASHBOARD"
              component={Dashboard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="createQuote"
              component={CreateQuote}
              options={{
                title: "Create Quote",
                headerStyle: {
                  backgroundColor: theme.Colors.primary,
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                headerTitleAlign: "center",
              }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </ThemeProvider>
    </NavigationContainer>
  );
}
