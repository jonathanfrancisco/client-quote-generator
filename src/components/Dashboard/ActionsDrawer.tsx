import React, { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import tw from "../../../lib/tailwind";

type Props = {
  children: ReactNode;
};

const ActionsDrawer = ({ children }: Props) => {
  return (
    <View style={tw`h-full rounded-tl-3xl rounded-tr-3x p-4 bg-sunlife-accent`}>
      <ScrollView
        contentContainerStyle={tw`justify-around flex-row flex-wrap grow-1`}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default ActionsDrawer;
