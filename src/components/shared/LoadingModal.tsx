import Modal from 'react-native-modal';
import { ActivityIndicator, View } from 'react-native';
import tw from '@app/lib/tailwind';
import React from 'react';

interface Props {
  isVisible: boolean;
}

const LoadingModal = ({ isVisible }: Props) => {
  return (
    <Modal isVisible={isVisible} animationIn="fadeIn" animationOut="fadeOut">
      <View style={tw`flex flex-row justify-center`}>
        <View style={tw`bg-white p-8 rounded-lg`}>
          <ActivityIndicator color="#FFE069" size="large" />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
