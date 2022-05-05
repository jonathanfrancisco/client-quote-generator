import React from "react";
import { View, Image } from "react-native";
import { useDeviceContext, useAppColorScheme } from "twrnc";
import AppLoading from "expo-app-loading";

import ActionsDrawer from "../../components/Dashboard/ActionsDrawer";
import tw from "../../../lib/tailwind";
import ActionCard from "../../components/Dashboard/ActionCard";
import MainPageHeader from "../../components/Dashboard/DashboardNav";

const CreateQuoteIcon = require("../../.assets/create_quote_icon.png");
const ProductListIcon = require("../../.assets/product_list_icon.png");

import {
  useFonts,
  PortLligatSlab_400Regular,
} from "@expo-google-fonts/port-lligat-slab";
import DashboardTitle from "../../components/Dashboard/DashboardTitle";
import QuoteCount from "../../components/Dashboard/QuoteCount";

const SunLifeSunImg = require("../../.assets/sunlife_sun.png");

const Home = ({ navigation }) => {
  const [colorScheme, toggleColorScheme, setColorScheme] =
    useAppColorScheme(tw);

  let [fontsLoaded] = useFonts({
    PortLligatSlab_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={tw`h-full bg-sunlife-primary`}>
      <View>
        <MainPageHeader />
        <DashboardTitle />
        <QuoteCount count={123} />
        <Image style={tw`absolute -bottom-6 left-0`} source={SunLifeSunImg} />
      </View>
      <ActionsDrawer>
        <ActionCard
          icon={CreateQuoteIcon}
          text="Create Quote"
          onPress={() => navigation.navigate("createQuote")}
        />
        <ActionCard
          icon={ProductListIcon}
          text="Product List"
          onPress={() => {
            alert("Feature not yet available");
          }}
        />
        <ActionCard
          text="SOON"
          onPress={() => {
            alert("Feature not yet available");
          }}
        />
        <ActionCard
          text="SOON"
          onPress={() => {
            alert("Feature not yet available");
          }}
        />
        <ActionCard
          text="SOON"
          onPress={() => {
            alert("Feature not yet available");
          }}
        />
        <ActionCard
          text="SOON"
          onPress={() => {
            alert("Feature not yet available");
          }}
        />
        <ActionCard
          text="SOON"
          onPress={() => {
            alert("Feature not yet available");
          }}
        />
        <ActionCard
          text="SOON"
          onPress={() => {
            alert("Feature not yet available");
          }}
        />
        <ActionCard
          text="SOON"
          onPress={() => {
            alert("Feature not yet available");
          }}
        />
        <ActionCard
          text="SOON"
          onPress={() => {
            alert("Feature not yet available");
          }}
        />
        <ActionCard
          text="SOON"
          onPress={() => {
            alert("Feature not yet available");
          }}
        />
        <ActionCard
          text="SOON"
          onPress={() => {
            alert("Feature not yet available");
          }}
        />
      </ActionsDrawer>
    </View>
  );
};

export default Home;
