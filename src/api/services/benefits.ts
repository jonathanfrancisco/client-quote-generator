import axios from './axios';
import IAddableBenefit from '@app/src/common/interfaces/addable-benefit.interface';

const getAddableNotDefaultBenefits = async (): Promise<IAddableBenefit[]> => {
  try {
    const response = await axios.get(`/api/benefits/not-default`);
    return response?.data.result;
  } catch (err) {
    console.log('error: ', err);
    return [];
  }
};

export default {
  getAddableNotDefaultBenefits,
};
