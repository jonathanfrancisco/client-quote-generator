import * as Yup from 'yup';

const EditBenefitFormSchema = Yup.object().shape({
  benefitName: Yup.string().required('Benefit Name is required'),
  fixedCoverageValue: Yup.boolean().required(),
  benefitDetailsValue: Yup.string().when('fixedCoverageValue', {
    is: true,
    then: Yup.string().required('Benefit Details is required'),
  }),
});

export default EditBenefitFormSchema;
