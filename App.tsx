/* 3rd Party libraries/packages */
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, StatusBar, Platform, View } from "react-native";
import tw from "@app/lib/tailwind";

/* Screens components */
import Dashboard from "@app/src/screens/Dashboard/Dashboard";
import CreateQuote from "@app/src/screens/CreateQuote/CreateQuote";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
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
              title: "Create Quote",
              headerStyle: tw`bg-sunlife-primary`,
              headerTintColor: "#fff",
              headerTitleStyle: tw`font-bold  text-white`,
              headerTitleAlign: "center",
            }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
