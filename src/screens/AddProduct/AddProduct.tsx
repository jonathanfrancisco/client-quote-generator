import React from 'react';
import { Formik } from 'formik';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import tw from '@app/lib/tailwind';
import TextInputField from '@app/src/components/shared/TextInputField';
import FieldError from '@app/src/components/shared/FieldError';
import LoadingModal from '@app/src/components/shared/LoadingModal';
import benefitsService from '@app/src/api/services/benefits';
import AddBenefitFormSchema from '@app/src/formSchemas/addBenefitForm.schema';
import AddNewBenefitRequest from '@app/src/common/interfaces/add-new-benefit-request.interface';
import RadioGroupField from '@app/src/components/shared/RadioGroupField';
import ProductCategory from '@app/src/common/enums/productCategory.enum';
import ImagePicker from '@app/src/components/shared/ImagePickerField';

const AddProduct = ({ navigation }) => {
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
        <Text style={tw`text-xl font-bold text-white`}>Add Product</Text>
        <View style={tw`pr-14`} />
      </View>

      <ScrollView
        style={tw`bg-sunlife-accent pl-6 pr-6 rounded-tl-3xl rounded-tr-3xl`}>
        <Text style={tw`font-bold text-xl my-4`}>
          Complete the details below.
        </Text>
        <View style={tw`bg-white rounded-tl-lg rounded-lg p-4`}>
          <Text style={tw`text-xl font-bold mb-2`}>Product Details</Text>

          <Formik
            initialValues={{
              productCategory: ProductCategory.TRAD,
              productName: '',
              productDescription: '',
            }}
            validationSchema={AddBenefitFormSchema}
            onSubmit={async (values, formikHelpers) => {
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
                <RadioGroupField
                  label="Product Category"
                  items={[
                    {
                      id: '1',
                      value: 'Trad',
                      label: 'Trad',
                    },
                    {
                      id: '2',
                      value: 'VUL',
                      label: 'VUL',
                    },
                  ]}
                  picked={values.productCategory}
                  onChange={(value) => {
                    handleChange('productCategory')(value);
                  }}
                />
                {errors.productCategory && touched.productCategory ? (
                  <FieldError message={errors.productCategory} />
                ) : null}
                <TextInputField
                  label="Product Name"
                  placeholder="Product Name"
                  value={values.productName}
                  onChangeText={handleChange('productName')}
                  error={errors.productName && touched.productName}
                />
                {errors.productName && touched.productName ? (
                  <FieldError message={errors.productName} />
                ) : null}
                <TextInputField
                  label="Product Description"
                  placeholder=""
                  value={values.productDescription}
                  onChangeText={handleChange('productDescription')}
                  height={100}
                  error={
                    errors.productDescription && touched.productDescription
                      ? true
                      : false
                  }
                />
                {errors.productDescription && touched.productDescription ? (
                  <FieldError message={errors.productDescription} />
                ) : null}

                <ImagePicker label="Product Image" />
                {/* TODO: Add Product Image Field*/}
                {/* TODO: Add Add Defaults Benefits Btn */}
                {/* TODO: Add Defaults Benefits List here  */}
                <View style={tw`flex flex-row justify-end mt-4`}>
                  <TouchableOpacity
                    onPress={() => {
                      handleSubmit();
                    }}
                    style={tw`bg-sunlife-secondary py-3.5 rounded-2 min-w-1/2.1`}>
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

export default AddProduct;
