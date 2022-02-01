// import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Platform, View } from 'react-native';
import { ThemeProvider, Button } from 'react-native-elements';
import ActionCard from './components/ActionCard';
import MainPageHeader from './components/MainPageHeader';

export default function App() {
  const [counter, setCounter] = useState(0);

  return (
    <ThemeProvider>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
      >
        <MainPageHeader />
        <View
          style={{
            justifyContent: 'space-around',
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: 10,
          }}
        >
          <ActionCard text='Create Quote' />
          <ActionCard text='Product List' />
          <ActionCard text='Client List' />
          <ActionCard text='Soon' />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}
