import * as Yup from 'yup';

const ClientBenefitsStepSchema = Yup.object().shape({
  // TODO: Readd validation
  // productPrimaBenefits: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       isSelected: Yup.boolean(),
  //       id: Yup.string(),
  //       type: Yup.string(),
  //       name: Yup.string(),
  //       amount: Yup.boolean(),
  //       value: Yup.string(),
  //     })
  //   )
  //   .test({
  //     message: 'Must select atleast 1 benefit',
  //     test: (arr) => {
  //       const selectedBenefits = arr?.filter((i) => i.isSelected).length || 0;
  //       return selectedBenefits >= 1;
  //     },
  //   }),
  // productSuppBenefits: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       isSelected: Yup.boolean(),
  //       id: Yup.string(),
  //       type: Yup.string(),
  //       name: Yup.string(),
  //       amount: Yup.boolean(),
  //       value: Yup.string(),
  //     })
  //   )
  //   .test({
  //     message: 'Must select atleast 1 benefit',
  //     test: (arr) => {
  //       const selectedBenefits = arr?.filter((i) => i.isSelected).length || 0;
  //       return selectedBenefits >= 1;
  //     },
  //   }),
});

export default ClientBenefitsStepSchema;
