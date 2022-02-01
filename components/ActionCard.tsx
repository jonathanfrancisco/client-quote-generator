import React from 'react';

import { View, Text } from 'react-native';

interface ActionCardProps {
  text: string;
}

const ActionCard = (props: ActionCardProps) => {
  return (
    <View
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
    </View>
  );
};

export default ActionCard;
