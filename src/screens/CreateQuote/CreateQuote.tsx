import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import { Formik } from 'formik';
import { printToFileAsync } from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import tw from '@app/lib/tailwind';

import ClientDetailsStepSchema from '@app/src/formSchemas/clientDetailsStep.schema';
import ClientBenefitsStepSchema from '@app/src/formSchemas/clientBenefitsStep.schema';

import ProductCategory from '@app/src/common/enums/productCategory.enum';
import generatedQuoteHtmlTemplate from '@app/src/templates/html/generatedQuoteHtmlTemplate';
import CreateQuoteFormStep from '@app/src/common/enums/createQuoteFormStep.enum';
import ISelectableBenefit from '@app/src/common/interfaces/selectable-benefit.interface';
import ClientDetailsForm from '@app/src/components/CreateQuote/ClientDetailsForm';
import CostDetailsForm from '../../components/CreateQuote/CostDetailsForm';
import BenefitDetailsForm from '../../components/CreateQuote/BenefitDetailsForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import quotes from '../../api/services/quotes';
import { NewClientQuoteRequest } from '../../common/interfaces/new-client-quote-request.interface';
import { ExistingClientQuoteRequest } from '@app/src/common/interfaces/existing-client-quote-request.interface';

const createQuoteSchemasArr = [
  ClientDetailsStepSchema,
  ClientBenefitsStepSchema,
];

const CreateQuote = ({ navigation }) => {
  // UI/Ephemeral state not form values that will be eventually submitted.
  const [currentStep, setCurrentStep] = useState(0);

  const queryClient = useQueryClient();
  const {
    mutate: createQuoteNewClient,
    isLoading: createQuoteNewClientIsLoading,
    isError: createQuoteNewClientIsError,
  } = useMutation({
    mutationFn: (payload: NewClientQuoteRequest) => {
      return quotes.createQuoteForNewClient(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['totalQuotesCount'] });
    },
  });

  const {
    mutate: createQuoteExistingClient,
    isLoading: createQuoteExistingClientIsLoading,
    isError: createQuoteExistingClientIsError,
  } = useMutation({
    mutationFn: (payload: ExistingClientQuoteRequest) => {
      return quotes.createQuoteForExistingCLient(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['totalQuotesCount'] });
    },
  });

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
        <View style={tw`pr-14`} />
      </View>

      <ScrollView
        style={tw`bg-sunlife-accent pl-6 pr-6 rounded-tl-3xl rounded-tr-3xl`}>
        <Text style={tw`font-bold text-xl my-4`}>
          Fill the information below.
        </Text>

        <Formik
          initialValues={{
            // Client Details Form
            clientType: 'new',
            existingClientId: '',
            name: '',
            gender: 'MALE',
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
            if (currentStep === CreateQuoteFormStep.CostDetails) {
              // Call Create Quote API Here

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

              const clientBenefit = [
                ...values.productPrimaBenefits.filter((i) => i.isSelected),
                ...values.productSuppBenefits.filter((i) => i.isSelected),
              ].map((i) => ({
                benefitId: i.benefitId,
                type: i.type.toString(),
                amount: i.value,
              }));

              if (values.clientType === 'new') {
                createQuoteNewClient({
                  name: values.name,
                  gender: values.gender,
                  birthday: values.birthday,
                  smokingHabit: values.smokingHabit,
                  productId: values.productId,
                  clientBenefit,
                  annualPremium: Number(values.annualPremium),
                  additionalComment: values.additionalComment,
                });
              } else {
                createQuoteExistingClient({
                  id: values.existingClientId,
                  smokingHabit: values.smokingHabit,
                  productId: values.productId,
                  clientBenefit,
                  annualPremium: Number(values.annualPremium),
                  additionalComment: values.additionalComment,
                });
              }

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
          <View>
            {currentStep === 0 && <ClientDetailsForm />}
            {currentStep === 1 && (
              <BenefitDetailsForm
                onBack={() => {
                  setCurrentStep((prevStepVal) => prevStepVal - 1);
                }}
              />
            )}
            {currentStep === 2 && (
              <CostDetailsForm
                onBack={() => {
                  setCurrentStep((prevStepVal) => prevStepVal - 1);
                }}
              />
            )}
          </View>
        </Formik>
      </ScrollView>
    </View>
  );
};

export default CreateQuote;
