import * as Yup from 'yup';

const ClientDetailsStepSchema = Yup.object().shape({
  name: Yup.string().required('Required field'),
  gender: Yup.string().oneOf(['male', 'female']).required('Required field'),
  birthday: Yup.string()
    .matches(
      new RegExp(
        '^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$'
      ),
      'Invalid Date'
    )
    .required('Required field'),
  smokingHabit: Yup.string()
    .oneOf(['Smoker', 'Non-Smoker'])
    .required('Required field'),
  productCategory: Yup.string()
    .oneOf(['Trad', 'VUL'])
    .required('Required field'),
  productName: Yup.string().required('Required field'),
  productDescription: Yup.string().required('Required field'),
});

export default ClientDetailsStepSchema;
