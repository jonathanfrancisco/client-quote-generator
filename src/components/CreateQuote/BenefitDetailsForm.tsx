import tw from '@app/lib/tailwind';
import BenefitType from '@app/src/common/enums/benefitType.enum';
import CreateQuoteAggregatedForm from '@app/src/common/interfaces/create-quote-aggregated-form.interface';
import ISelectableBenefit from '@app/src/common/interfaces/selectable-benefit.interface';
import { FieldArray, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import FieldError from '../shared/FieldError';
import AddBenefitButtonModal from './AddBenefitButtonModal';
import BenefitCard from './BenefitCard';
import productsService from '@app/src/api/services/products';

const renderBenefits = (
  formikFieldKey: string,
  benefitsCategory: BenefitType,
  benefits: ISelectableBenefit[] | undefined,
  onBenefitSelect: (index: number, isSelected: boolean, value: string) => void
) => {
  const currentProductIdSelected = 'temp1234';
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

interface Props {
  onBack: () => void;
}

const BenefitDetailsForm = ({ onBack }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const { values, handleSubmit, setFieldValue, errors } =
    useFormikContext<CreateQuoteAggregatedForm>();

  useEffect(() => {
    setIsLoading(true);
    productsService.getProductById(values.productId).then((product) => {
      // TODO: Don't refetch if selected product id didn't change
      const productSelectableBenefits = product!.productBenefits.map((i) => {
        return {
          ...i,
          isSelected: false,
        } as ISelectableBenefit;
      });

      setFieldValue(
        'productPrimaBenefits',
        productSelectableBenefits.filter((i) => i.type === BenefitType.PRIMARY)
      );
      setFieldValue(
        'productSuppBenefits',
        productSelectableBenefits.filter(
          (i) => i.type === BenefitType.SUPPLEMENTARY
        )
      );
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <View style={tw`bg-white rounded-tl-lg rounded-tr-lg p-4`}>
        <Text style={tw`text-xl font-bold mb-2`}>Benefit Details</Text>
        {isLoading ? (
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
                  errors.productPrimaBenefits || errors.productPrimaBenefits
                }
              />
            ) : null}

            <AddBenefitButtonModal
              onAdd={(benefit, type) => {
                setIsLoading(true);
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
                setIsLoading(false);
              }}
            />
          </>
        )}
      </View>
      <View style={tw`flex-row justify-between mt-4 pb-12`}>
        <TouchableOpacity
          onPress={() => {
            onBack();
          }}
          style={tw`bg-gray-200 py-2 rounded-2 min-w-1/2.1`}>
          <Text style={tw`text-center text-black font-bold text-lg`}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          style={tw`bg-sunlife-secondary py-2 rounded-2 min-w-1/2.1`}>
          <Text style={tw`text-center text-white font-bold text-lg`}>Next</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BenefitDetailsForm;
