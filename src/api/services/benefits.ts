import IBenefit from "@app/src/common/interfaces/benefit.interface";
import IBenefitType from "@app/src/common/enums/benefitType.enum";

const getSelectableDefaultBenefitsByProduct = async (): Promise<IBenefit[]> => {
  // TODO: Call API here using axios
  // TODO: Add logic only default benefit

  return [
    {
      id: "f389156d-7396-49d0-9bb7-cab79915fef8",
      type: IBenefitType.PRIMARY,
      name: "LIFE INSURANCE",
      amount: true,
      value: "",
      defaultBenefit: true,
    },
    {
      id: "adc181e6-c344-45d0-bbb1-b88c0e443128",
      type: IBenefitType.PRIMARY,
      name: "CRITICAL ILLNESS",
      amount: true,
      value: "",
      defaultBenefit: true,
    },
    {
      id: "bf64ffd8-6dd2-4067-bdb4-847a90a7e215",
      type: IBenefitType.SUPPLEMENTARY,
      name: "ACCIDENTAL DEATH",
      amount: true,
      value: "",
      defaultBenefit: true,
    },
    {
      id: "436a39cd-8e84-4b46-9d50-425eb71b473f",
      type: IBenefitType.SUPPLEMENTARY,
      name: "TOTAL DISABILITY",
      amount: false,
      value: "WAIVED OF PREMIUM",
      defaultBenefit: true,
    },
  ];
};

const getAllAvailableBenefits = async () => {
  // TODO: Call API here using axios
  // TODO: Add logic only default benefit

  return [
    {
      id: "1289156d-7396-49d0-9bb7-cab79915fef8",
      type: IBenefitType.PRIMARY,
      name: "TEST BENEFIT 1",
      amount: true,
      value: "",
      defaultBenefit: true,
    },
    {
      id: "adc181e6-c344-45d0-bbb1-b88c0e443128",
      type: IBenefitType.PRIMARY,
      name: "TEST BENEFIT 2",
      amount: true,
      value: "",
      defaultBenefit: true,
    },
    {
      id: "bf64ffd8-6dd2-4067-bdb4-847a90a7e215",
      type: IBenefitType.PRIMARY,
      name: "TEST BENEFIT 3",
      amount: true,
      value: "",
      defaultBenefit: true,
    },
    {
      id: "436a39cd-8e84-4b46-9d50-425eb71b473f",
      type: IBenefitType.PRIMARY,
      name: "TEST BENEFIT 4",
      amount: false,
      value: "WAIVED OF PREMIUM",
      defaultBenefit: true,
    },
    {
      id: "436aokcd-8e84-4b46-9d50-425eb71b4731",
      type: IBenefitType.PRIMARY,
      name: "TEST BENEFIT 5",
      amount: false,
      value: "WAIVED OF PREMIUM",
      defaultBenefit: true,
    },
    {
      id: "123a39cd-8e84-4b46-9d50-425eb71b473f",
      type: IBenefitType.PRIMARY,
      name: "TEST BENEFIT 6",
      amount: false,
      value: "WAIVED OF PREMIUM",
      defaultBenefit: true,
    },
    {
      id: "451a39cd-8e84-4b46-9d50-425eb71b473f",
      type: IBenefitType.PRIMARY,
      name: "TEST BENEFIT 7",
      amount: false,
      value: "WAIVED OF PREMIUM",
      defaultBenefit: true,
    },
  ];
};

export default {
  getSelectableDefaultBenefitsByProduct,
  getAllAvailableBenefits,
};
