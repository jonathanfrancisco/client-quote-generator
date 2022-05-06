import React from "react";
import { View, Image } from "react-native";
import { useDeviceContext, useAppColorScheme } from "twrnc";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  PortLligatSlab_400Regular,
} from "@expo-google-fonts/port-lligat-slab";

import tw from "@app/lib/tailwind";
import ActionsDrawer from "@app/src/components/Dashboard/ActionsDrawer";
import ActionCard from "@app/src/components/Dashboard/ActionCard";
import MainPageHeader from "@app/src/components/Dashboard/DashboardNav";
import DashboardTitle from "@app/src/components/Dashboard/DashboardTitle";
import QuoteCount from "@app/src/components/Dashboard/QuoteCount";

const CreateQuoteIcon = require("@app/assets/icons/create_quote_icon.png");
const ProductListIcon = require("@app/assets/icons/product_list_icon.png");
const SunLifeSunImg = require("@app/assets/icons/sunlife_sun.png");

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
      </ActionsDrawer>
    </View>
  );
};

export default Home;
