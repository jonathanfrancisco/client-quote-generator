import axios from './axios';
import IAddableBenefit from '@app/src/common/interfaces/addable-benefit.interface';
import ISelectableBenefit from '@app/src/common/interfaces/selectable-benefit.interface';
import { AddNewBenefitRequest } from '@app/src/common/interfaces/add-new-benefit-request.interface';

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

const getAllBenefits = async (): Promise<IAddableBenefit[]> => {
  try {
    const response = await axios.get(`/api/benefits`);
    return response?.data.result.map((i: IAddableBenefit) => {
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

const addBenefit = async (payload: AddNewBenefitRequest): Promise<boolean> => {
  try {
    const response = await axios.post(`/api/benefits`, payload);

    return true;
  } catch (err) {
    console.log('error: ', err);
    return false;
  }
};

export default {
  getAddableNotDefaultBenefits,
  getAllBenefits,
  addBenefit,
};
