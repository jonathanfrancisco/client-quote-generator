import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import tw from "@app/lib/tailwind";
import twTheme from "@app/tailwind.config";
import DropDownList from "../shared/DropDownList";
import IBenefitType from "@app/src/common/types/IBenefitType";
import RadioGroupField from "../shared/RadioGroupField";
import IBenefit from "@app/src/common/types/IBenefit";
import BenefitsService from "@app/src/api/services/BenefitsService";

interface Props {
  onAdd: (benefit: IBenefit) => void;
}

const AddBenefitButtonModal = ({ onAdd }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [allBenefits, setAllBenefits] = useState<IBenefit[]>([]);
  const [selectedBenefitId, setSelectedBenefitId] = useState<string>("");
  const [selectedBenefitType, setSelectedBenefitType] = useState<string>(
    IBenefitType.PRIMARY
  );

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    BenefitsService.getAllAvailableBenefits()
      .then((results) =>
        results.map((i) => ({
          ...i,
          isSelected: false,
        }))
      )
      .then((results) => {
        setAllBenefits(results);
      });
  }, []);

  return (
    <View>
      <TouchableOpacity
        onPress={toggleModal}
        style={tw`px-8 py-4 my-2 bg-sunlife-secondary rounded-xl`}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <View>
            <Text style={tw`text-lg text-white font-semibold`}>
              ADD BENEFITS
            </Text>
            <Text style={tw`text-sm text-white`}>Lorem ipsum...</Text>
          </View>
          <Ionicons name="add-circle" size={48} color="white" />
        </View>
      </TouchableOpacity>
      <Modal
        backdropTransitionOutTiming={0}
        animationIn={"zoomIn"}
        animationOut={"fadeOut"}
        isVisible={isVisible}
      >
        <View style={tw`bg-white rounded-md px-4 pb-6`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Ionicons name="close" size={24} style={tw`p-3`} color="white" />
            <Text
              style={tw`font-bold text-sunlife-primaryDarker text-center text-base`}
            >
              ADD BENEFIT
            </Text>
            <Ionicons
              name="close"
              size={24}
              style={tw`p-3`}
              color={twTheme.theme.extend.colors.sunlife.secondaryAccent}
              onPress={() => setIsVisible(false)}
            />
          </View>
          <DropDownList
            listMode="MODAL"
            placeholder="Select Benefit Name"
            items={allBenefits.map((i) => {
              return {
                label: i.name,
                value: i.id,
              };
            })}
            picked={selectedBenefitId}
            onChange={(value) => {
              setSelectedBenefitId(value);
            }}
          />
          {/* <RadioGroupField
              items={[
                {
                  id: "1",
                  label:
                    IBenefitType.PRIMARY.toString().charAt(0).toUpperCase() +
                    IBenefitType.PRIMARY.toString().slice(1),
                  value: IBenefitType.PRIMARY,
                },
                {
                  id: "2",
                  label:
                    IBenefitType.SUPPLEMENTARY.toString()
                      .charAt(0)
                      .toUpperCase() +
                    IBenefitType.SUPPLEMENTARY.toString().slice(1),
                  value: IBenefitType.SUPPLEMENTARY,
                },
              ]}
              picked={selectedBenefitType}
              onChange={setSelectedBenefitType}
            /> */}
          <View style={tw`flex-row justify-end`}>
            <TouchableOpacity
              onPress={() => {
                const benefit = allBenefits.find(
                  (i) => i.id === selectedBenefitId
                );
                onAdd(benefit!);
                toggleModal();
              }}
              style={tw`bg-sunlife-secondary py-1 rounded-2 min-w-1/2.5`}
            >
              <Text style={tw`text-center text-white font-bold text-lg`}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddBenefitButtonModal;
