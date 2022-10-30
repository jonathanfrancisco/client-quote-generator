import * as Yup from 'yup';

const benefitsValidationSchemaRule = Yup.array()
  .of(
    Yup.object().shape({
      isSelected: Yup.boolean(),
      id: Yup.string(),
      type: Yup.string(),
      name: Yup.string(),
      amount: Yup.boolean(),
      value: Yup.string(),
    })
  )
  .test({
    message: 'Must select atleast 1 benefit',
    test: (arr) => {
      const selectedBenefits = arr?.filter((i) => i.isSelected).length || 0;
      return selectedBenefits >= 1;
    },
  });

const ClientBenefitsStepSchema = Yup.object().shape({
  productPrimaBenefits: benefitsValidationSchemaRule,
  productSuppBenefits: benefitsValidationSchemaRule,
});

export default ClientBenefitsStepSchema;
