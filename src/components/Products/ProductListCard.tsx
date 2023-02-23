import { Image, Text, TouchableOpacity, View } from 'react-native';
import tw from '@app/lib/tailwind';
import React from 'react';

interface Props {
  productName: string;
  productQuoteCount: number;
}

const ProductListCard = ({ productName, productQuoteCount }: Props) => {
  return (
    <View style={tw`my-2 px-6 pt-2 pb-2 bg-white rounded-lg`}>
      <View
        style={{
          flexDirection: 'row',
          flex: 0,
        }}>
        <View style={tw`flex-1`}>
          <Image
            style={{
              height: 95,
              width: 125,
            }}
            source={{
              uri: 'https://via.placeholder.com/150',
            }}
          />
        </View>

        <View style={tw`flex-1 flex text-center`}>
          <Text style={tw`text-xl font-bold text-center`}>{productName}</Text>
          <Text style={tw`text-xs text-center`}>
            Number of created quote: {productQuoteCount}
          </Text>
          <TouchableOpacity
            style={tw`px-6 py-1 mt-2 bg-sunlife-secondary rounded-lg self-end`}
            onPress={() => {
              console.log('hello');
            }}>
            <Text style={tw`text-white text-sm`}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductListCard;
