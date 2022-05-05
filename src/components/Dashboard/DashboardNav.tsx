import React from "react";
import { View, Image } from "react-native";
import tw from "../../../lib/tailwind";
const SeeMoreIcon = require("../../.assets/see_more_icon.png");
const BellNotifIcon = require("../../.assets/notification_bell.png");

const DashboardNav = () => {
  return (
    <View style={tw`flex-row justify-between p-4`}>
      <Image source={SeeMoreIcon} />
      <Image source={BellNotifIcon} />
    </View>
  );
};

export default DashboardNav;
