import React from 'react';
import { Formik } from 'formik';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import tw from '@app/lib/tailwind';

import TextInputField from '@app/src/components/shared/TextInputField';
import SwitchField from '@app/src/components/shared/SwitchField';
import FieldError from '@app/src/components/shared/FieldError';
import LoadingModal from '@app/src/components/shared/LoadingModal';

import benefitsService from '@app/src/api/services/benefits';

import AddBenefitFormSchema from '@app/src/formSchemas/addBenefitForm.schema';

import BenefitType from '@app/src/common/enums/benefitType.enum';
import AddNewBenefitRequest from '@app/src/common/interfaces/add-new-benefit-request.interface';
import RadioGroupField from '@app/src/components/shared/RadioGroupField';
import IBenefitType from '@app/src/common/enums/benefitType.enum';

const AddBenefit = ({ navigation }) => {
  const queryClient = useQueryClient();
  const {
    mutate: addNewBenefit,
    isLoading: addNewBenefitIsLoading,
    isError: addNewBenefitIsError,
  } = useMutation({
    mutationFn: async (payload: AddNewBenefitRequest) => {
      return benefitsService.addBenefit(payload);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['allBenefits'] });
    },
  });

  return (
    <View style={tw`h-full bg-sunlife-primary`}>
      <LoadingModal isVisible={addNewBenefitIsLoading} />

      <View
        style={tw`flex-row justify-start justify-between items-center py-2.5`}>
        <HeaderBackButton
          tintColor="white"
          onPress={() => {
            navigation.navigate('Benefits');
          }}
        />
        <Text style={tw`text-xl font-bold text-white`}>Add Benefit</Text>
        <View style={tw`pr-14`} />
      </View>

      <ScrollView
        style={tw`bg-sunlife-accent pl-6 pr-6 rounded-tl-3xl rounded-tr-3xl`}>
        <Text style={tw`font-bold text-xl my-4`}>
          Complete the details below.
        </Text>
        <View style={tw`bg-white rounded-tl-lg rounded-lg p-4`}>
          <Text style={tw`text-xl font-bold mb-2`}>Benefit Details</Text>

          <Formik
            initialValues={{
              benefitName: '',
              defaultType: BenefitType.PRIMARY,
              isDefaultBenefit: false,
              fixedCoverageValue: false,
              benefitDetailsValue: '',
            }}
            validationSchema={AddBenefitFormSchema}
            onSubmit={async (values, formikHelpers) => {
              addNewBenefit({
                name: values.benefitName,
                defaultBenefit: values.isDefaultBenefit,
                type: values.defaultType,
                amount: values.fixedCoverageValue,
                value: values.benefitDetailsValue,
              });
              formikHelpers.resetForm();
            }}>
            {({
              values,
              handleChange,
              setFieldValue,
              errors,
              touched,
              handleSubmit,
            }) => (
              <View>
                <TextInputField
                  label="Benefit Name"
                  placeholder="Benefit Name"
                  value={values.benefitName}
                  onChangeText={handleChange('benefitName')}
                  error={errors.benefitName && touched.benefitName}
                />
                {errors.benefitName && touched.benefitName ? (
                  <FieldError message={errors.benefitName} />
                ) : null}

                <View style={tw`my-2`}></View>

                <View style={tw`flex flex-row justify-between items-center`}>
                  <Text style={tw`text-lg mb-2`}>Set as default</Text>
                  <SwitchField
                    isToggled={values.isDefaultBenefit}
                    onToggle={(value) => {
                      setFieldValue('isDefaultBenefit', value);
                    }}
                  />
                </View>

                {values.isDefaultBenefit ? (
                  <RadioGroupField
                    items={[
                      {
                        id: '1',
                        label:
                          IBenefitType.PRIMARY.toString()
                            .charAt(0)
                            .toUpperCase() +
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
                    picked={values.defaultType}
                    onChange={handleChange('defaultType')}
                  />
                ) : null}

                <View style={tw`my-2`}></View>

                <View style={tw`flex flex-row justify-between items-center`}>
                  <Text style={tw`text-lg mb-2`}>Fixed caoverage value</Text>
                  <SwitchField
                    isToggled={values.fixedCoverageValue}
                    onToggle={(value) => {
                      setFieldValue('fixedCoverageValue', value);
                    }}
                  />
                </View>
                {values.fixedCoverageValue ? (
                  <View>
                    <TextInputField
                      label=""
                      placeholder="Write the benefit details here"
                      value={values.benefitDetailsValue}
                      onChangeText={handleChange('benefitDetailsValue')}
                    />
                    {errors.benefitDetailsValue &&
                    touched.benefitDetailsValue ? (
                      <FieldError message={errors.benefitDetailsValue} />
                    ) : null}
                  </View>
                ) : null}

                <View style={tw`flex flex-row justify-end mt-4`}>
                  <TouchableOpacity
                    onPress={() => {
                      handleSubmit();
                    }}
                    style={tw`bg-sunlife-secondary py-2 rounded-2 min-w-1/2.1`}>
                    <Text style={tw`text-center text-white font-bold text-lg`}>
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddBenefit;
