import React from 'react';

import { Text, GestureResponderEvent, TouchableOpacity } from 'react-native';

interface ActionCardProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
}

const ActionCard = (props: ActionCardProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        width: '44%',
        backgroundColor: '#E9E9E9',
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 80,
        borderRadius: 5,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionCard;
