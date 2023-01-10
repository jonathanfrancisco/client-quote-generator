import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

import tw from '@app/lib/tailwind';
import twTheme from '@app/tailwind.config';
import DropDownList from '../shared/DropDownList';
import IBenefitType from '@app/src/common/enums/benefitType.enum';
import RadioGroupField from '../shared/RadioGroupField';
import Benefits from '@app/src/api/services/benefits';
import IAddableBenefit from '@app/src/common/interfaces/addable-benefit.interface';
import { Formik } from 'formik';
import AddAdditionalBenefitSchema from '@app/src/formSchemas/addAdditionalBenefit.schema';
import FieldError from '@app/src/components/shared/FieldError';

interface Props {
  onAdd: (benefit: IAddableBenefit, type: IBenefitType) => void;
}

// TODO: Use React query here
const AddBenefitButtonModal = ({ onAdd }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [addableNotDefaultBenefits, setAddableNotDefaultBenefits] = useState<
    IAddableBenefit[]
  >([]);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    Benefits.getAddableNotDefaultBenefits().then((results) => {
      setAddableNotDefaultBenefits(results);
    });
  }, []);

  return (
    <View>
      <TouchableOpacity
        onPress={toggleModal}
        style={tw`px-4 py-4 my-2 bg-sunlife-secondary rounded-xl`}>
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
        animationIn={'zoomIn'}
        animationOut={'fadeOut'}
        isVisible={isVisible}>
        <Formik
          validationSchema={AddAdditionalBenefitSchema}
          initialValues={{
            selectedBenefitId: '',
            selectedBenefitType: IBenefitType.PRIMARY,
          }}
          onSubmit={(values, formikHelpers) => {
            const benefit = addableNotDefaultBenefits.find(
              (i) => i.id === values.selectedBenefitId
            );
            toggleModal();
            onAdd(benefit!, values.selectedBenefitType as IBenefitType);
          }}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <View style={tw`bg-white rounded-md px-4 pb-6`}>
              <View style={tw`flex-row justify-between items-center mb-4`}>
                <Ionicons
                  name="close"
                  size={24}
                  style={tw`p-3`}
                  color="white"
                />
                <Text
                  style={tw`font-bold text-sunlife-primaryDarker text-center text-xl`}>
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
                items={addableNotDefaultBenefits.map((i) => {
                  return {
                    label: i.name,
                    value: i.id,
                  };
                })}
                picked={values.selectedBenefitId}
                onChange={handleChange('selectedBenefitId')}
              />
              {errors.selectedBenefitId && touched.selectedBenefitId ? (
                <FieldError message={errors.selectedBenefitId} />
              ) : null}

              <RadioGroupField
                items={[
                  {
                    id: '1',
                    label:
                      IBenefitType.PRIMARY.toString().charAt(0).toUpperCase() +
                      IBenefitType.PRIMARY.toString().slice(1),
                    value: IBenefitType.PRIMARY,
                  },
                  {
                    id: '2',
                    label:
                      IBenefitType.SUPPLEMENTARY.toString()
                        .charAt(0)
                        .toUpperCase() +
                      IBenefitType.SUPPLEMENTARY.toString().slice(1),
                    value: IBenefitType.SUPPLEMENTARY,
                  },
                ]}
                picked={values.selectedBenefitType}
                onChange={handleChange('selectedBenefitType')}
              />
              {errors.selectedBenefitType && touched.selectedBenefitType ? (
                <FieldError message={errors.selectedBenefitType} />
              ) : null}

              <View style={tw`mt-2 flex-row justify-end`}>
                <TouchableOpacity
                  onPress={() => {
                    handleSubmit();
                  }}
                  style={tw`bg-sunlife-secondary py-2 rounded-2 min-w-1/2.5`}>
                  <Text style={tw`text-center text-white font-bold text-xl`}>
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </Modal>
    </View>
  );
};

export default AddBenefitButtonModal;
