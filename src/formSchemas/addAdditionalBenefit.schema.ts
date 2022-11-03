import * as Yup from 'yup';

const AddAdditionalBenefitSchema = Yup.object().shape({
  selectedBenefitId: Yup.string().required('You must select a benefit to add'),
  selectedBenefitType: Yup.string()
    .oneOf(['primary', 'supplementary'])
    .required(),
});

export default AddAdditionalBenefitSchema;
