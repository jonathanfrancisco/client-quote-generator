import tw from '@app/lib/tailwind';
import { HeaderBackButton } from '@react-navigation/elements';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import React, { useState } from 'react';
import { Text, View } from 'react-native';
import twTheme from '@app/tailwind.config';
import ProductsListTabScreen from '@app/src/components/Products/ProductsListTabScreen';

import productsService from '@app/src/api/services/products';
import { useQuery } from '@tanstack/react-query';
import Product from '@app/src/common/interfaces/product.interface';
import ProductCategory from '@app/src/common/enums/productCategory.enum';
import ListScreenSearch from '@app/src/components/shared/ListScreenSearch';

const Tab = createMaterialTopTabNavigator();

const Products = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoading: isAllProductsLoading, data: allProducts } = useQuery({
    queryKey: ['allProducts'],
    queryFn: () => {
      return productsService.getAllProducts();
    },
    initialData: [],
  });

  const filterBySearchQuery = (products: Product[]) => {
    return allProducts.filter((i) => {
      if (!searchQuery) {
        return true;
      }
      return i.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  const allProductsFiltered = filterBySearchQuery(allProducts) || [];
  const tradProductsFiltered =
    filterBySearchQuery(allProducts).filter(
      (i) => i.category === ProductCategory.TRAD
    ) || [];
  const vulProductsFiltered =
    filterBySearchQuery(allProducts).filter(
      (i) => i.category === ProductCategory.VUL
    ) || [];

  return (
    <View style={tw`h-full bg-sunlife-primary`}>
      <View
        style={tw`flex-row justify-start justify-between items-center py-2.5`}>
        <HeaderBackButton
          tintColor="white"
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        />
        <Text style={tw`text-xl font-bold text-white`}>Products List</Text>
        <View style={tw`pr-14`} />
      </View>

      <ListScreenSearch
        placeholder="Search"
        value={searchQuery}
        onChange={(val) => {
          setSearchQuery(val);
        }}
      />

      <NavigationContainer independent>
        <Tab.Navigator
          initialRouteName="ALL"
          screenOptions={{
            swipeEnabled: false,
            tabBarLabelStyle: { fontSize: 18, fontWeight: 'bold' },
            tabBarStyle: {
              backgroundColor: twTheme.theme.extend.colors.sunlife.accent,
              borderBottomColor:
                twTheme.theme.extend.colors.sunlife.secondaryAccent,
              borderBottomWidth: 1,
            },
            tabBarIndicatorStyle: {
              height: 6,
              backgroundColor: twTheme.theme.extend.colors.sunlife.primary,
              marginBottom: -1,
            },
          }}>
          <Tab.Screen
            name="ALL"
            children={() => (
              <ProductsListTabScreen
                navigation={navigation}
                products={allProductsFiltered}
              />
            )}
          />
          <Tab.Screen
            name="TRAD"
            children={() => (
              <ProductsListTabScreen
                navigation={navigation}
                products={tradProductsFiltered}
              />
            )}
          />
          <Tab.Screen
            name="VUL"
            children={() => (
              <ProductsListTabScreen
                navigation={navigation}
                products={vulProductsFiltered}
              />
            )}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Products;
