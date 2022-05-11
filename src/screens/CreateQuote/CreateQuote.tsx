import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { Formik } from "formik";
import * as Yup from "yup";

import tw from "@app/lib/tailwind";
import TextInputField from "@app/src/components/shared/TextInputField";
import DatePicker from "@app/src/components/shared/DatePicker";
import RadioGroupField from "@app/src/components/shared/RadioGroupField";
import FieldError from "@app/src/components/shared/FieldError";
import DropDownList from "@app/src/components/shared/DropDownList";

const createQuoteSchema = Yup.object().shape({
  name: Yup.string().required("Required field"),
  gender: Yup.string().oneOf(["male", "female"]).required("Required field"),
  birthday: Yup.string()
    .matches(
      new RegExp(
        "^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$"
      ),
      "Invalid Date"
    )
    .required("Required field"),
  smokingHabit: Yup.string()
    .oneOf(["smoker", "non-smoker"])
    .required("Required field"),
  productCategory: Yup.string()
    .oneOf(["trad", "vul"])
    .required("Required field"),
  productName: Yup.string()
    .oneOf([
      "sun-fit-and-well-10",
      "sun-fit-and-well-15",
      "sun-fit-and-well-20",
    ])
    .required("Required field"),
  productDescription: Yup.string().required("Required field"),
});

const CreateQuote = ({ navigation }) => {
  const [step, setStep] = useState(1);
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
          Complete the information below.
        </Text>

        <Formik
          validationSchema={createQuoteSchema}
          initialValues={{
            name: "",
            gender: "male",
            birthday: "",
            smokingHabit: "",
            productCategory: "trad",
            productName: "",
            productDescription: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              {step === 1 && (
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
                  <View style={tw`flex-row justify-end mt-4 pb-12`}>
                    <TouchableOpacity
                      onPress={() => {
                        setStep((prevStep) => prevStep + 1);
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

              {step === 2 && (
                <>
                  <View style={tw`bg-white rounded-tl-lg rounded-tr-lg p-4`}>
                    <Text style={tw`text-xl font-bold mb-2`}>
                      Benefit Details
                    </Text>
                  </View>
                  <View style={tw`flex-row justify-between mt-4 pb-12`}>
                    <TouchableOpacity
                      onPress={() => {
                        setStep((prevStepVal) => prevStepVal - 1);
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
                        setStep((prevStepVal) => prevStepVal + 1);
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

              {step === 3 && (
                <>
                  <View style={tw`bg-white rounded-tl-lg rounded-tr-lg p-4`}>
                    <Text style={tw`text-xl font-bold mb-2`}>Cost Details</Text>
                  </View>
                  <View style={tw`flex-row justify-between mt-4 pb-12`}>
                    <TouchableOpacity
                      onPress={() => {
                        setStep((prevStepVal) => prevStepVal - 1);
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
