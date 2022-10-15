import React from 'react';
import tw from '@app/lib/tailwind';

import {
  Text,
  GestureResponderEvent,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  View,
} from 'react-native';

interface ActionCardProps {
  icon?: ImageSourcePropType;
  text: string;
  onPress: (event: GestureResponderEvent) => void;
}

const ActionCard = ({ icon, text, onPress }: ActionCardProps) => {
  if (icon) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={tw`w-1/2.3 h-48 shadow-md bg-white mt-5 py-18 justify-center items-center rounded-xl`}>
        <View style={tw`p-3 mb-2 bg-sunlife-accent rounded-full text-black`}>
          <Image source={icon} />
        </View>
        <Text style={tw`text-center text-base text-black`}>{text}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`w-1/2.3 h-48 shadow-md bg-white mt-5 py-18 justify-center items-center rounded-xl`}>
      <Text style={tw`text-center text-lg text-black`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ActionCard;
