import React from 'react';
import { View, Text } from 'react-native';

const MainPageHeader = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          width: '65%',
          justifyContent: 'center',
          backgroundColor: '#E9E9E9',
          paddingHorizontal: 14,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
          }}
        >
          LOGO
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#E9E9E9',
          borderRadius: 50,
          padding: 20,
        }}
      ></View>
    </View>
  );
};

export default MainPageHeader;
