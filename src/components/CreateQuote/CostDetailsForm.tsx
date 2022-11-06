import tw from '@app/lib/tailwind';
import ProductCategory from '@app/src/common/enums/productCategory.enum';
import CreateQuoteAggregatedForm from '@app/src/common/interfaces/create-quote-aggregated-form.interface';
import OtherPaymentOptions from '@app/src/components/CreateQuote/OtherPaymentOptions';
import AmountInputField from '@app/src/components/shared/AmountInputField';
import FieldError from '@app/src/components/shared/FieldError';
import TextInputField from '@app/src/components/shared/TextInputField';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

interface Props {
  onBack: () => void;
}
const CostDetailsForm = ({ onBack }: Props) => {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
  } = useFormikContext<CreateQuoteAggregatedForm>();

  useEffect(() => {
    setFieldValue('annualPremium', 0.0);
    setFieldValue('semiAnnual', 0.0);
    setFieldValue('quarterly', 0.0);
    setFieldValue('monthly', 0.0);
    setFieldValue('additionalComment', '');
  }, []);

  return (
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
          error={errors.annualPremium && touched.annualPremium ? true : false}
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
            errors.additionalComment && touched.additionalComment ? true : false
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
          <Text style={tw`text-xl text-white text-center font-semibold`}>
            Generate Quote
          </Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row justify-between mt-4 pb-12`}>
        <TouchableOpacity
          onPress={() => {
            onBack();
          }}
          style={tw`bg-gray-200 py-2 rounded-2 min-w-1/2.1`}>
          <Text style={tw`text-center text-black font-bold text-lg`}>Back</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CostDetailsForm;
