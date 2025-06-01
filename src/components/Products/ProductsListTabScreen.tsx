import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from '@app/lib/tailwind';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProductListCard from '@app/src/components/Products/ProductListCard';
import Product from '@app/src/common/interfaces/product.interface';

interface Props {
  navigation: any;
  products: Product[];
}

const ProductsListTabScreen = ({ navigation, products }: Props) => {
  return (
    <ScrollView style={tw`p-6`}>
      <View style={tw`flex-row justify-end mb-6`}>
        <TouchableOpacity
          style={tw`flex-row items-center bg-sunlife-primaryDarker rounded-lg px-6 py-1.5`}
          onPress={() => {
            navigation.navigate('AddProduct');
          }}>
          <Ionicons
            name="add-outline"
            size={25}
            color="#fff"
            style={tw`ml--1`}
          />
          <Text style={tw`text-white font-bold text-lg`}>Add Product</Text>
        </TouchableOpacity>
      </View>
      {products.map((i) => (
        <ProductListCard
          key={i.id}
          productName={i.name}
          productQuoteCount={i.clientQuoteCount}
        />
      ))}
    </ScrollView>
  );
};

export default ProductsListTabScreen;
