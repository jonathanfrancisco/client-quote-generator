import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Button } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import { FieldArray, Formik } from 'formik';
import { printToFileAsync } from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import tw from '@app/lib/tailwind';
import TextInputField from '@app/src/components/shared/TextInputField';
import DatePicker from '@app/src/components/shared/DatePicker';
import RadioGroupField from '@app/src/components/shared/RadioGroupField';
import FieldError from '@app/src/components/shared/FieldError';
import DropDownList from '@app/src/components/shared/DropDownList';

import ClientDetailsStepSchema from '@app/src/formSchemas/clientDetailsStep.schema';
import ClientBenefitsStepSchema from '@app/src/formSchemas/clientBenefitsStep.schema';

import BenefitCard from '@app/src/components/CreateQuote/BenefitCard';
import AddBenefitButtonModal from '@app/src/components/CreateQuote/AddBenefitButtonModal';

import benefitsService from '@app/src/api/services/benefits';
import productsService from '@app/src/api/services/products';

import IBenefit from '@app/src/common/interfaces/benefit.interface';
import IBenefitType from '@app/src/common/enums/benefitType.enum';
import AmountInputField from '@app/src/components/shared/AmountInputField';
import OtherPaymentOptions from '@app/src/components/CreateQuote/OtherPaymentOptions';
import Product from '@app/src/common/interfaces/product.interface';
import ProductCategory from '@app/src/common/enums/productCategory.enum';
import generatedQuoteHtmlTemplate from '@app/src/templates/html/generatedQuoteHtmlTemplate';

const createQuoteSchemasArr = [
  ClientDetailsStepSchema,
  ClientBenefitsStepSchema,
];

const CreateQuote = ({ navigation }) => {
  // UI/Ephemeral state not form values that will be eventually submitted.
  const [currentStep, setCurrentStep] = useState(0);
  const [productsDropdownList, setProductsDropdownList] = useState<Product[]>(
    []
  );
  const [selectableBenefits, setSelectableBenefits] = useState<IBenefit[]>([]);

  useEffect(() => {
    productsService
      .getProductsByCategory(ProductCategory.TRAD)
      .then((products) => {
        setProductsDropdownList(products);
      });

    benefitsService
      .getSelectableDefaultBenefitsByProduct()
      .then((results) =>
        results.map((i) => ({
          ...i,
          isSelected: false,
        }))
      )
      .then((results) => {
        setSelectableBenefits(results);
      });
  }, []);

  const renderBenefits = (
    benefitsCategory: IBenefitType,
    benefits: IBenefit[] | undefined,
    formikSetFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    return (
      <>
        <Text style={tw`text-lg font-semibold mb-2`}>
          {benefitsCategory.toUpperCase()}
        </Text>
        <FieldArray
          name="benefits"
          render={(arrayHelpers) => (
            <>
              {benefits && benefits.length > 0
                ? benefits.map((benefit, index) => {
                    if (benefit.type === benefitsCategory) {
                      return (
                        <BenefitCard
                          index={index}
                          key={benefit.id}
                          id={benefit.id}
                          type={benefit.type}
                          name={benefit.name}
                          stateAmount={benefit.amount}
                          value={benefit.value}
                          onSelect={(isSelected, value) => {
                            formikSetFieldValue(
                              `benefits.${index}.isSelected`,
                              isSelected
                            );
                            formikSetFieldValue(
                              `benefits.${index}.value`,
                              value.toString()
                            );
                          }}
                        />
                      );
                    }
                    return null;
                  })
                : null}
            </>
          )}
        />
      </>
    );
  };

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
        <Text style={tw`text-xl font-bold text-white`}>Create Quote</Text>
        <View style={tw`pr-14`}></View>
      </View>

      <ScrollView
        style={tw`bg-sunlife-accent pl-6 pr-6 rounded-tl-3xl rounded-tr-3xl`}>
        <Text style={tw`font-bold text-xl my-4`}>
          Fill the information below.
        </Text>

        <Formik
          enableReinitialize={true}
          initialValues={{
            name: '',
            gender: 'male',
            birthday: '',
            smokingHabit: 'Non-Smoker',
            productCategory: ProductCategory.TRAD,
            productName: '',
            productDescription: '',
            benefits: selectableBenefits,
            annualPremium: 0.0,
            semiAnnual: 0.0,
            quarterly: 0.0,
            monthly: 0.0,
            additionalComment: '',
          }}
          validationSchema={createQuoteSchemasArr[currentStep]}
          onSubmit={async (values) => {
            if (currentStep === 2) {
              const templateValues = {
                generationDate: new Date(),
                name: values.name,
                birthday: values.birthday,
                smokingHabit: values.smokingHabit,
                productName: values.productName,
                productDescription: values.productDescription,
                benefits: values.benefits,
                annualPayment: values.annualPremium,
                semiAnnualPayment: values.semiAnnual,
                quarterlyPayment: values.quarterly,
                monthlyPayment: values.monthly,
                additionalComment: values.additionalComment,
              };

              const file = await printToFileAsync({
                html: await generatedQuoteHtmlTemplate(templateValues),
                base64: true,
              });
              const nameToBeInsured = values.name
                .split(' ')
                .join('')
                .toUpperCase();
              const documentDirectory = FileSystem.documentDirectory;
              const filename = `${documentDirectory}${nameToBeInsured}_INSURANCE_QUOTATION.pdf`;

              FileSystem.writeAsStringAsync(filename, file.base64!, {
                encoding: FileSystem.EncodingType.Base64,
              }).then(() => {
                Sharing.shareAsync(filename);
              });
            } else {
              setCurrentStep((prevStep) => prevStep + 1);
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View>
              {/* START OF CLIENT DETAILS */}
              {currentStep === 0 && (
                <>
                  <View style={tw`bg-white rounded-tl-lg rounded-tr-lg p-4`}>
                    <Text style={tw`text-xl font-bold mb-2`}>
                      Client Details
                    </Text>

                    <TextInputField
                      label="Name"
                      placeholder="Name"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      error={errors.name && touched.name ? true : false}
                    />
                    {errors.name && touched.name ? (
                      <FieldError message={errors.name} />
                    ) : null}

                    <RadioGroupField
                      label="Gender"
                      items={[
                        {
                          id: '1',
                          value: 'male',
                          label: 'Male',
                        },
                        {
                          id: '2',
                          value: 'female',
                          label: 'Female',
                        },
                      ]}
                      picked={values.gender}
                      onChange={handleChange('gender')}
                    />
                    {errors.gender && touched.gender ? (
                      <FieldError message={errors.gender} />
                    ) : null}

                    <DatePicker
                      label="Birthday"
                      placeholder="Birthday"
                      value={values.birthday}
                      onChangeText={handleChange('birthday')}
                      onBlur={handleBlur('birthday')}
                      error={errors.birthday && touched.birthday ? true : false}
                    />
                    {errors.birthday && touched.birthday ? (
                      <FieldError message={errors.birthday} />
                    ) : null}

                    <DropDownList
                      label="Smoking Habit"
                      placeholder="Select habit"
                      items={[
                        { label: 'Smoker', value: 'Smoker' },
                        { label: 'Non-Smoker', value: 'Non-Smoker' },
                      ]}
                      picked={values.smokingHabit}
                      onChange={handleChange('smokingHabit')}
                    />
                    {errors.smokingHabit && touched.smokingHabit ? (
                      <FieldError message={errors.smokingHabit} />
                    ) : null}

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
                        productsService
                          .getProductsByCategory(value as ProductCategory)
                          .then((products) => {
                            setProductsDropdownList(products);
                          });
                      }}
                    />
                    {errors.productCategory && touched.productCategory ? (
                      <FieldError message={errors.productCategory} />
                    ) : null}

                    <DropDownList
                      label="Product Name"
                      placeholder="Select product"
                      items={productsDropdownList.map((i) => ({
                        value: i.name,
                        label: i.name,
                      }))}
                      picked={values.productName}
                      onChange={handleChange('productName')}
                    />
                    {errors.productName && touched.productName ? (
                      <FieldError message={errors.productName} />
                    ) : null}

                    <TextInputField
                      label="Product Description"
                      placeholder="Write the description here..."
                      value={values.productDescription}
                      onChangeText={handleChange('productDescription')}
                      onBlur={handleBlur('productDescription')}
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
                  </View>
                  <View style={tw`flex-row justify-end mt-4 pb-24`}>
                    <TouchableOpacity
                      onPress={() => {
                        handleSubmit();
                      }}
                      style={tw`bg-sunlife-secondary py-2 rounded-2 min-w-1/2.1`}>
                      <Text
                        style={tw`text-center text-white font-bold text-lg`}>
                        Next
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
              {/* END OF CLIENT DETAILS */}

              {/* START OF BENEFIT DETAILS */}
              {currentStep === 1 && (
                <>
                  <View style={tw`bg-white rounded-tl-lg rounded-tr-lg p-4`}>
                    <Text style={tw`text-xl font-bold mb-2`}>
                      Benefit Details
                    </Text>

                    <View>
                      {renderBenefits(
                        IBenefitType.PRIMARY,
                        values.benefits,
                        setFieldValue
                      )}

                      {renderBenefits(
                        IBenefitType.SUPPLEMENTARY,
                        values.benefits,
                        setFieldValue
                      )}
                    </View>

                    {typeof errors.benefits === 'string' ? (
                      <FieldError message={errors.benefits} />
                    ) : null}

                    <AddBenefitButtonModal
                      onAdd={(benefit) => {
                        setSelectableBenefits((prevValue) => {
                          return [...prevValue, benefit];
                        });
                      }}
                    />
                  </View>
                  <View style={tw`flex-row justify-between mt-4 pb-12`}>
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentStep((prevStepVal) => prevStepVal - 1);
                      }}
                      style={tw`bg-gray-200 py-2 rounded-2 min-w-1/2.1`}>
                      <Text
                        style={tw`text-center text-black font-bold text-lg`}>
                        Back
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleSubmit();
                      }}
                      style={tw`bg-sunlife-secondary py-2 rounded-2 min-w-1/2.1`}>
                      <Text
                        style={tw`text-center text-white font-bold text-lg`}>
                        Next
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
              {/* END OF BENEFIT DETAILS */}

              {/*START OF COST DETAILS*/}
              {currentStep === 2 && (
                <>
                  <View style={tw`bg-white rounded-tl-lg rounded-tr-lg p-4`}>
                    <Text style={tw`text-xl font-bold mb-2`}>Cost Details</Text>

                    <AmountInputField
                      label="Enter Annual Premium"
                      value={values.annualPremium}
                      onChangeValue={(value) => {
                        let annualAsFloat = parseFloat(value);

                        if (values.productCategory === ProductCategory.TRAD) {
                          annualAsFloat += annualAsFloat * 0.1;
                        }

                        const semiAnnual = (annualAsFloat / 2).toString();
                        const quarterly = (annualAsFloat / 4).toString();
                        const monthly = (annualAsFloat / 12).toString();

                        handleChange('annualPremium')(value);
                        handleChange('semiAnnual')(semiAnnual);
                        handleChange('quarterly')(quarterly);
                        handleChange('monthly')(monthly);
                      }}
                      onBlur={handleBlur('annualPremium')}
                      error={
                        errors.annualPremium && touched.annualPremium
                          ? true
                          : false
                      }
                    />
                    {errors.annualPremium && touched.annualPremium ? (
                      <FieldError message={errors.annualPremium} />
                    ) : null}

                    <OtherPaymentOptions
                      semiAnnual={values.semiAnnual}
                      quarterly={values.quarterly}
                      monthly={values.monthly}
                    />

                    <TextInputField
                      label="Additional Comment"
                      placeholder=""
                      value={values.additionalComment}
                      onChangeText={handleChange('additionalComment')}
                      onBlur={handleBlur('additionalComment')}
                      height={100}
                      error={
                        errors.additionalComment && touched.additionalComment
                          ? true
                          : false
                      }
                    />
                    {errors.additionalComment && touched.additionalComment ? (
                      <FieldError message={errors.additionalComment} />
                    ) : null}

                    <TouchableOpacity
                      style={tw`px-8 py-4 my-2 bg-sunlife-secondary rounded-xl`}
                      onPress={() => {
                        handleSubmit();
                      }}>
                      <Text
                        style={tw`text-xl text-white text-center font-semibold`}>
                        Generate Quote
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={tw`flex-row justify-between mt-4 pb-12`}>
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentStep((prevStepVal) => prevStepVal - 1);
                      }}
                      style={tw`bg-gray-200 py-2 rounded-2 min-w-1/2.1`}>
                      <Text
                        style={tw`text-center text-black font-bold text-lg`}>
                        Back
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
              {/* END OF  COST DETAILS */}
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default CreateQuote;
