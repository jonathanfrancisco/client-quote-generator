import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import tw from '@app/lib/tailwind';
import twTheme from '@app/tailwind.config';

interface Props {
  label: string;
}

const ImagePickerField = ({ label }: Props) => {
  const [image, setImage] = useState('');

  return (
    <View style={tw`my-2`}>
      {label ? <Text style={tw`text-lg mb-2`}>{label}</Text> : null}

      <View style={tw` flex-row`}>
        {image ? (
          <View style={tw`pr-1`}>
            <View style={tw`border-[0.3] rounded-md p-[0.5]`}>
              <ImageBackground
                style={tw`h-125px w-125px`}
                source={{ uri: image }}>
                <View style={tw`flex-row justify-end`}>
                  <Ionicons
                    name="ios-close-circle"
                    size={25}
                    onPress={() => {
                      console.log('Remove image');
                    }}
                    color={twTheme.theme.extend.colors.sunlife.primaryDarker}
                  />
                </View>
              </ImageBackground>
            </View>
          </View>
        ) : null}

        <TouchableOpacity
          style={tw`flex-1 p-[0.5]`}
          onPress={async () => {
            // // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              // allowsEditing: true,
              // aspect: [4, 3],
              quality: 1,
            });

            console.log(result);

            if (!result.cancelled) {
              setImage(result.uri);
            }
          }}>
          <View
            style={tw`h-128px border-[0.35] border-dashed rounded-lg flex-row flex-wrap justify-center items-center content-center px-4`}>
            <Ionicons name="cloud-upload-outline" size={36} />
            <View style={tw`mx-2`}></View>
            <Text style={tw`text-lg`}>Upload Image</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImagePickerField;
