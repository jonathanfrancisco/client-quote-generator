import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import { FieldArray, Formik } from 'formik';
import { printToFileAsync } from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import tw from '@app/lib/tailwind';
import FieldError from '@app/src/components/shared/FieldError';

import ClientDetailsStepSchema from '@app/src/formSchemas/clientDetailsStep.schema';
import ClientBenefitsStepSchema from '@app/src/formSchemas/clientBenefitsStep.schema';

import BenefitCard from '@app/src/components/CreateQuote/BenefitCard';
import AddBenefitButtonModal from '@app/src/components/CreateQuote/AddBenefitButtonModal';
import productsService from '@app/src/api/services/products';

import ProductCategory from '@app/src/common/enums/productCategory.enum';
import generatedQuoteHtmlTemplate from '@app/src/templates/html/generatedQuoteHtmlTemplate';
import CreateQuoteFormStep from '@app/src/common/enums/createQuoteFormStep.enum';
import ISelectableBenefit from '@app/src/common/interfaces/selectable-benefit.interface';
import BenefitType from '@app/src/common/enums/benefitType.enum';
import ClientDetailsForm from '@app/src/components/CreateQuote/ClientDetailsForm';
import CostDetailsForm from '../../components/CreateQuote/CostDetailsForm';

const createQuoteSchemasArr = [
  ClientDetailsStepSchema,
  ClientBenefitsStepSchema,
];

const CreateQuote = ({ navigation }) => {
  // UI/Ephemeral state not form values that will be eventually submitted.
  const [currentStep, setCurrentStep] = useState(0);

  const [currentProductIdSelected, setCurrentProductIdSelected] =
    useState<string>();
  const [selectableIsBenefitsLoading, setSelectableBenefitsIsLoading] =
    useState<boolean>(false);

  const renderBenefits = (
    formikFieldKey: string,
    benefitsCategory: BenefitType,
    benefits: ISelectableBenefit[] | undefined,
    onBenefitSelect: (index: number, isSelected: boolean, value: string) => void
  ) => {
    return (
      <>
        {benefits && benefits.length > 0 ? (
          <>
            <Text style={tw`text-lg font-semibold mb-2`}>
              {benefitsCategory.toUpperCase()}
            </Text>
            <FieldArray
              name={formikFieldKey}
              render={(arrayHelpers) => (
                <>
                  {benefits.map((benefit, index) => {
                    return (
                      <BenefitCard
                        key={currentProductIdSelected + benefit.benefitId}
                        index={index}
                        name={benefit.benefitName}
                        stateAmount={benefit.amount}
                        value={benefit.value}
                        isSelected={benefit.isSelected}
                        onSelect={onBenefitSelect}
                      />
                    );
                  })}
                </>
              )}
            />
          </>
        ) : null}
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
          initialValues={{
            // Client Details Form
            name: '',
            gender: 'male',
            birthday: '',
            smokingHabit: 'Non-Smoker',
            productCategory: ProductCategory.TRAD,
            productId: '',
            productName: '',
            productDescription: '',

            // Benefit Details Form
            productPrimaBenefits: [] as ISelectableBenefit[],
            productSuppBenefits: [] as ISelectableBenefit[],

            // Cost Details Form
            annualPremium: 0.0,
            semiAnnual: 0.0,
            quarterly: 0.0,
            monthly: 0.0,
            additionalComment: '',
          }}
          validationSchema={createQuoteSchemasArr[currentStep]}
          onSubmit={async (values, formikHelpers) => {
            if (currentStep === CreateQuoteFormStep.ClientDetails) {
              setCurrentProductIdSelected(values.productId);

              if (currentProductIdSelected !== values.productId) {
                setSelectableBenefitsIsLoading(true);
                productsService
                  .getProductById(values.productId)
                  .then((product) => {
                    const productSelectableBenefits =
                      product!.productBenefits.map((i) => {
                        return {
                          ...i,
                          isSelected: false,
                        } as ISelectableBenefit;
                      });

                    formikHelpers.setFieldValue(
                      'productPrimaBenefits',
                      productSelectableBenefits.filter(
                        (i) => i.type === BenefitType.PRIMARY
                      )
                    );
                    formikHelpers.setFieldValue(
                      'productSuppBenefits',
                      productSelectableBenefits.filter(
                        (i) => i.type === BenefitType.SUPPLEMENTARY
                      )
                    );
                    setSelectableBenefitsIsLoading(false);
                  });
              }
            }

            if (currentStep === CreateQuoteFormStep.BenefitDetails) {
              formikHelpers.setFieldValue('annualPremium', 0.0);
              formikHelpers.setFieldValue('semiAnnual', 0.0);
              formikHelpers.setFieldValue('quarterly', 0.0);
              formikHelpers.setFieldValue('monthly', 0.0);
              formikHelpers.setFieldValue('additionalComment', '');
            }

            if (currentStep === CreateQuoteFormStep.CostDetails) {
              const templateValues = {
                generationDate: new Date(),
                name: values.name,
                birthday: values.birthday,
                smokingHabit: values.smokingHabit,
                productName: values.productName,
                productDescription: values.productDescription,
                primaryBenefits: values.productPrimaBenefits.filter(
                  (i) => i.isSelected
                ),
                supplementaryBenefits: values.productSuppBenefits.filter(
                  (i) => i.isSelected
                ),
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
              const filename = `${FileSystem.documentDirectory}${nameToBeInsured}_INSURANCE_QUOTATION.pdf`;

              FileSystem.writeAsStringAsync(filename, file.base64!, {
                encoding: FileSystem.EncodingType.Base64,
              }).then(() => {
                Sharing.shareAsync(filename);
              });
            }

            if (currentStep !== CreateQuoteFormStep.CostDetails) {
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
              {currentStep === 0 && <ClientDetailsForm />}
              {/* END OF CLIENT DETAILS */}

              {/* START OF BENEFIT DETAILS */}
              {currentStep === 1 && (
                <>
                  <View style={tw`bg-white rounded-tl-lg rounded-tr-lg p-4`}>
                    <Text style={tw`text-xl font-bold mb-2`}>
                      Benefit Details
                    </Text>
                    {selectableIsBenefitsLoading ? (
                      <ActivityIndicator color="#FFE069" size="large" />
                    ) : (
                      <>
                        <View>
                          {renderBenefits(
                            'productPrimaBenefits',
                            BenefitType.PRIMARY,
                            values.productPrimaBenefits,
                            (index, isSelected, value) => {
                              setFieldValue(
                                `productPrimaBenefits.${index}.isSelected`,
                                isSelected
                              );
                              setFieldValue(
                                `productPrimaBenefits.${index}.value`,
                                value.toString()
                              );
                            }
                          )}

                          {renderBenefits(
                            'productSuppBenefits',
                            BenefitType.SUPPLEMENTARY,
                            values.productSuppBenefits,
                            (index, isSelected, value) => {
                              setFieldValue(
                                `productSuppBenefits.${index}.isSelected`,
                                isSelected
                              );
                              setFieldValue(
                                `productSuppBenefits.${index}.value`,
                                value.toString()
                              );
                            }
                          )}
                        </View>

                        {typeof errors.productPrimaBenefits === 'string' &&
                        errors.productSuppBenefits ? (
                          <FieldError
                            message={
                              errors.productPrimaBenefits ||
                              errors.productPrimaBenefits
                            }
                          />
                        ) : null}

                        <AddBenefitButtonModal
                          onAdd={(benefit, type) => {
                            setSelectableBenefitsIsLoading(true);
                            if (type === BenefitType.PRIMARY) {
                              setFieldValue('productPrimaBenefits', [
                                ...values.productPrimaBenefits,
                                {
                                  benefitId: benefit.id,
                                  type: BenefitType.PRIMARY,
                                  benefitName: benefit.name,
                                  amount: benefit.amount,
                                  value: benefit.value,
                                  isSelected: false,
                                } as ISelectableBenefit,
                              ]);
                            } else {
                              setFieldValue('productSuppBenefits', [
                                ...values.productSuppBenefits,
                                {
                                  benefitId: benefit.id,
                                  type: BenefitType.SUPPLEMENTARY,
                                  benefitName: benefit.name,
                                  amount: benefit.amount,
                                  value: benefit.value,
                                  isSelected: false,
                                } as ISelectableBenefit,
                              ]);
                            }
                            setSelectableBenefitsIsLoading(false);
                          }}
                        />
                      </>
                    )}
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
                <CostDetailsForm
                  onBack={() => {
                    setCurrentStep((prevStepVal) => prevStepVal - 1);
                  }}
                />
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
