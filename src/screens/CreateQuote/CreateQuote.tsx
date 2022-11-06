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
import BenefitDetailsForm from '../../components/CreateQuote/BenefitDetailsForm';

const createQuoteSchemasArr = [
  ClientDetailsStepSchema,
  ClientBenefitsStepSchema,
];

const CreateQuote = ({ navigation }) => {
  // UI/Ephemeral state not form values that will be eventually submitted.
  const [currentStep, setCurrentStep] = useState(0);
  const [currentProductIdSelected, setCurrentProductIdSelected] =
    useState<string>();

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
