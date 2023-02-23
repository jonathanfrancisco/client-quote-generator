import React, { useCallback } from 'react';
import { View, Image } from 'react-native';
import { useDeviceContext, useAppColorScheme } from 'twrnc';
import {
  useFonts,
  PortLligatSlab_400Regular,
} from '@expo-google-fonts/port-lligat-slab';
import * as SplashScreen from 'expo-splash-screen';

import tw from '@app/lib/tailwind';
import ActionsDrawer from '@app/src/components/Dashboard/ActionsDrawer';
import ActionCard from '@app/src/components/Dashboard/ActionCard';
import MainPageHeader from '@app/src/components/Dashboard/DashboardNav';
import DashboardTitle from '@app/src/components/Dashboard/DashboardTitle';
import QuoteCount from '@app/src/components/Dashboard/QuoteCount';
import quotesService from '@app/src/api/services/quotes';
import { useQuery } from '@tanstack/react-query';

const CreateQuoteIcon = require('@app/assets/icons/create_quote_icon.png');
const ProductListIcon = require('@app/assets/icons/product_list_icon.png');
const BenefitListIcon = require('@app/assets/icons/benefit_list_icon.png');
const SunLifeSunImg = require('@app/assets/icons/sunlife_sun.png');

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Home = ({ navigation }) => {
  const [colorScheme, toggleColorScheme, setColorScheme] =
    useAppColorScheme(tw);

  const [fontsLoaded] = useFonts({
    PortLligatSlab_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const { isLoading: isTotalQuotesCountLoading, data: totalQuotesCount } =
    useQuery({
      queryKey: ['totalQuotesCount'],
      queryFn: () => {
        return quotesService.getTotalQuotesCount();
      },
      refetchInterval: 300 * 1000,
    });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={tw`h-full bg-sunlife-primary`} onLayout={onLayoutRootView}>
      <View>
        <MainPageHeader />
        <DashboardTitle />
        <QuoteCount
          count={totalQuotesCount!}
          isLoading={isTotalQuotesCountLoading}
        />
        <Image style={tw`absolute -bottom-6 left-0`} source={SunLifeSunImg} />
      </View>
      <ActionsDrawer>
        <ActionCard
          icon={CreateQuoteIcon}
          text="Create Quote"
          onPress={() => navigation.navigate('CreateQuote')}
        />
        <ActionCard
          icon={ProductListIcon}
          text="Product List"
          onPress={() => navigation.navigate('Products')}
        />
        <ActionCard
          icon={BenefitListIcon}
          text="Benefit List"
          onPress={() => navigation.navigate('Benefits')}
        />
        <ActionCard text="SOON" onPress={() => {}} />
      </ActionsDrawer>
    </View>
  );
};

export default Home;
