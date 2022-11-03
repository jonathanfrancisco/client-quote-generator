import axios from './axios';
import IAddableBenefit from '@app/src/common/interfaces/addable-benefit.interface';
import ISelectableBenefit from '@app/src/common/interfaces/selectable-benefit.interface';

const getAddableNotDefaultBenefits = async (): Promise<IAddableBenefit[]> => {
  try {
    const response = await axios.get(`/api/benefits/not-default`);
    return response?.data.result.map((i: ISelectableBenefit) => {
      return {
        ...i,
        value: i.amount && i.value === '' ? '0' : i.value,
      };
    });
  } catch (err) {
    console.log('error: ', err);
    return [];
  }
};

export default {
  getAddableNotDefaultBenefits,
};
