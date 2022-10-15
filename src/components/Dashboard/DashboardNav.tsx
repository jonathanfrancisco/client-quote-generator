import React from 'react';
import { View, Image } from 'react-native';
import tw from '@app/lib/tailwind';
const SeeMoreIcon = require('@app/assets/icons/see_more_icon.png');
const BellNotifIcon = require('@app/assets/icons/notification_bell.png');

const DashboardNav = () => {
  return (
    <View style={tw`flex-row justify-between p-4`}>
      <Image source={SeeMoreIcon} />
      <Image source={BellNotifIcon} />
    </View>
  );
};

export default DashboardNav;
