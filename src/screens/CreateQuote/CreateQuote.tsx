import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Button } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { FieldArray, Formik } from "formik";

import tw from "@app/lib/tailwind";
import TextInputField from "@app/src/components/shared/TextInputField";
import DatePicker from "@app/src/components/shared/DatePicker";
import RadioGroupField from "@app/src/components/shared/RadioGroupField";
import FieldError from "@app/src/components/shared/FieldError";
import DropDownList from "@app/src/components/shared/DropDownList";

import ClientDetailsStepSchema from "@app/src/formSchemas/ClientDetailsStepSchema";
import ClientBenefitsStepSchema from "@app/src/formSchemas/ClientBenefitsStepSchema";

import Benefit from "@app/src/components/CreateQuote/Benefit";
import AddBenefitButtonModal from "@app/src/components/CreateQuote/AddBenefitButtonModal";

import BenefitsService from "@app/src/api/services/BenefitsService";

import IBenefit from "@app/src/common/types/IBenefit";
import IBenefitType from "@app/src/common/types/IBenefitType";

const createQuoteSchemasArr = [
  ClientDetailsStepSchema,
  ClientBenefitsStepSchema,
];

const CreateQuote = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectableBenefits, setSelectableBenefits] = useState<IBenefit[]>([]);

  useEffect(() => {
    BenefitsService.getSelectableDefaultBenefitsByProduct()
      .then((results) =>
        results.map((i) => ({
          ...i,
          isSelected: false,
        }))
      )
      .then((results) => {
        setSelectableBenefits(results);
      });
  }, []);

  const renderBenefits = (
    benefitsCategory: IBenefitType,
    benefits: IBenefit[] | undefined,
    formikSetFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    return (
      <>
        <Text style={tw`text-lg font-semibold mb-2`}>
          {benefitsCategory.toUpperCase()}
        </Text>
        <FieldArray
          name="benefits"
          render={(arrayHelpers) => (
            <>
              {benefits && benefits.length > 0
                ? benefits.map((benefit, index) => {
                    if (benefit.type === benefitsCategory) {
                      return (
                        <Benefit
                          index={index}
                          key={benefit.id}
                          id={benefit.id}
                          type={benefit.type}
                          name={benefit.name}
                          stateAmount={benefit.amount}
                          value={benefit.value}
                          onSelect={(isSelected) => {
                            formikSetFieldValue(
                              `benefits.${index}.isSelected`,
                              isSelected
                            );
                          }}
                        />
                      );
                    }
                    return null;
                  })
                : null}
            </>
          )}
        />
      </>
    );
  };

  return (
    <View style={tw`h-full bg-sunlife-primary`}>
      <View
        style={tw`flex-row justify-start justify-between items-center py-2.5`}
      >
        <HeaderBackButton
          tintColor="white"
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
        />
        <Text style={tw`text-xl font-bold text-white`}>Create Quote</Text>
        <View style={tw`pr-14`}></View>
      </View>

      <ScrollView
        style={tw`bg-sunlife-accent pl-6 pr-6 rounded-tl-3xl rounded-tr-3xl`}
      >
        <Text style={tw`font-bold text-xl my-4`}>
          Fill the information below.
        </Text>

        <Formik
          enableReinitialize={true}
          initialValues={{
            name: "",
            gender: "male",
            birthday: "",
            smokingHabit: "",
            productCategory: "trad",
            productName: "",
            productDescription: "",
            benefits: selectableBenefits,
          }}
          validationSchema={createQuoteSchemasArr[currentStep]}
          onSubmit={(values) => {
            setCurrentStep((prevStep) => prevStep + 1);
            if (currentStep === 2) {
              // TODO: Generate Quote
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            isValid,
          }) => (
            <View>
              {/* START OF CLIENT DETAILS */}
              {currentStep === 0 && (
                <>
                  <View style={tw`bg-white rounded-tl-lg rounded-tr-lg p-4`}>
                    <Text style={tw`text-xl font-bold mb-2`}>
                      Client Details
                    </Text>

                    <TextInputField
                      label="Name"
                      placeholder="Name"
                      value={values.name}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      error={errors.name && touched.name ? true : false}
                    />
                    {errors.name && touched.name ? (
                      <FieldError message={errors.name} />
                    ) : null}

                    <RadioGroupField
                      label="Gender"
                      items={[
                        {
                          id: "1",
                          value: "male",
                          label: "Male",
                        },
                        {
                          id: "2",
                          value: "female",
                          label: "Female",
                        },
                      ]}
                      picked={values.gender}
                      onChange={handleChange("gender")}
                    />
                    {errors.gender && touched.gender ? (
                      <FieldError message={errors.gender} />
                    ) : null}

                    <DatePicker
                      label="Birthday"
                      placeholder="Birthday"
                      value={values.birthday}
                      onChangeText={handleChange("birthday")}
                      onBlur={handleBlur("birthday")}
                      error={errors.birthday && touched.birthday ? true : false}
                    />
                    {errors.birthday && touched.birthday ? (
                      <FieldError message={errors.birthday} />
                    ) : null}

                    <DropDownList
                      label="Smoking Habit"
                      placeholder="Select habit"
                      items={[
                        { label: "Smoker", value: "smoker" },
                        { label: "Non-Smoker", value: "non-smoker" },
                      ]}
                      picked={values.smokingHabit}
                      onChange={handleChange("smokingHabit")}
                    />
                    {errors.smokingHabit && touched.smokingHabit ? (
                      <FieldError message={errors.smokingHabit} />
                    ) : null}

                    <RadioGroupField
                      label="Product Category"
                      items={[
                        {
                          id: "1",
                          value: "trad",
                          label: "Trad",
                        },
                        {
                          id: "2",
                          value: "vul",
                          label: "VUL",
                        },
                      ]}
                      picked={values.productCategory}
                      onChange={handleChange("productCategory")}
                    />
                    {errors.productCategory && touched.productCategory ? (
                      <FieldError message={errors.productCategory} />
                    ) : null}

                    <DropDownList
                      label="Product Name"
                      placeholder="Select product"
                      items={[
                        {
                          label: "Sun Fit And Well 10",
                          value: "sun-fit-and-well-10",
                        },
                        {
                          label: "Sun Fit And Well 15",
                          value: "sun-fit-and-well-15",
                        },
                        {
                          label: "Sun Fit And Well 20",
                          value: "sun-fit-and-well-20",
                        },
                      ]}
                      picked={values.productName}
                      onChange={handleChange("productName")}
                    />
                    {errors.productName && touched.productName ? (
                      <FieldError message={errors.productName} />
                    ) : null}

                    <TextInputField
                      label="Product Description"
                      placeholder="Write the description here..."
                      value={values.productDescription}
                      onChangeText={handleChange("productDescription")}
                      onBlur={handleBlur("productDescription")}
                      height={100}
                      error={
                        errors.productDescription && touched.productDescription
                          ? true
                          : false
                      }
                    />
                    {errors.productDescription && touched.productDescription ? (
                      <FieldError message={errors.productDescription} />
                    ) : null}
                  </View>
                  <View style={tw`flex-row justify-end mt-4 pb-24`}>
                    <TouchableOpacity
                      onPress={() => {
                        handleSubmit();
                      }}
                      style={tw`bg-sunlife-secondary py-2 rounded-2 min-w-1/2.1`}
                    >
                      <Text
                        style={tw`text-center text-white font-bold text-lg`}
                      >
                        Next
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
              {/* END OF CLIENT DETAILS */}

              {/* START OF BENEFIT DETAILS */}
              {currentStep === 1 && (
                <>
                  <View style={tw`bg-white rounded-tl-lg rounded-tr-lg p-4`}>
                    <Text style={tw`text-xl font-bold mb-2`}>
                      Benefit Details
                    </Text>

                    <View>
                      {renderBenefits(
                        IBenefitType.PRIMARY,
                        values.benefits,
                        setFieldValue
                      )}

                      {renderBenefits(
                        IBenefitType.SUPPLEMENTARY,
                        values.benefits,
                        setFieldValue
                      )}
                    </View>

                    {typeof errors.benefits === "string" ? (
                      <FieldError message={errors.benefits} />
                    ) : null}

                    <AddBenefitButtonModal
                      onAdd={(benefit) => {
                        setSelectableBenefits((prevValue) => {
                          return [...prevValue, benefit];
                        });
                      }}
                    />
                  </View>
                  <View style={tw`flex-row justify-between mt-4 pb-12`}>
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentStep((prevStepVal) => prevStepVal - 1);
                      }}
                      style={tw`bg-gray-200 py-2 rounded-2 min-w-1/2.1`}
                    >
                      <Text
                        style={tw`text-center text-black font-bold text-lg`}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleSubmit();
                      }}
                      style={tw`bg-sunlife-secondary py-2 rounded-2 min-w-1/2.1`}
                    >
                      <Text
                        style={tw`text-center text-white font-bold text-lg`}
                      >
                        Next
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
              {/* END OF BENEFIT DETAILS */}

              {currentStep === 2 && (
                <>
                  <View style={tw`bg-white rounded-tl-lg rounded-tr-lg p-4`}>
                    <Text style={tw`text-xl font-bold mb-2`}>Cost Details</Text>
                  </View>
                  <View style={tw`flex-row justify-between mt-4 pb-12`}>
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentStep((prevStepVal) => prevStepVal - 1);
                      }}
                      style={tw`bg-gray-200 py-2 rounded-2 min-w-1/2.1`}
                    >
                      <Text
                        style={tw`text-center text-black font-bold text-lg`}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default CreateQuote;
