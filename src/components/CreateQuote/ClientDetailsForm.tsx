import tw from '@app/lib/tailwind';
import productsService from '@app/src/api/services/products';
import clientsService from '@app/src/api/services/clients';
import ProductCategory from '@app/src/common/enums/productCategory.enum';
import CreateQuoteAggregatedForm from '@app/src/common/interfaces/create-quote-aggregated-form.interface';
import DatePicker from '@app/src/components/shared/DatePicker';
import DisabledTextInputField from '@app/src/components/shared/DisabledTextInputField';
import DropDownList from '@app/src/components/shared/DropDownList';
import FieldError from '@app/src/components/shared/FieldError';
import RadioGroupField from '@app/src/components/shared/RadioGroupField';
import TextInputField from '@app/src/components/shared/TextInputField';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useFormikContext } from 'formik';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';

const ClientDetailsForm = () => {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
  } = useFormikContext<CreateQuoteAggregatedForm>();

  const queryClient = useQueryClient();
  const {
    isLoading: isProductsDropdownListLoading,
    data: productsDropdownListData,
  } = useQuery({
    queryKey: ['productsByCategory', values.productCategory],
    queryFn: () => {
      return productsService.getProductsByCategory(
        values.productCategory as ProductCategory
      );
    },
  });

  const { isLoading: isClientsLoading, data: clientsData } = useQuery({
    queryKey: ['existingClients'],
    queryFn: () => {
      return clientsService.getClients();
    },
  });

  return (
    <>
      <View style={tw`bg-white rounded-tl-lg rounded-tr-lg p-4`}>
        <Text style={tw`text-xl font-bold mb-2`}>Client Details</Text>

        <RadioGroupField
          label=""
          items={[
            {
              id: '1',
              value: 'new',
              label: 'New',
            },
            {
              id: '2',
              value: 'existing',
              label: 'Existing',
            },
          ]}
          picked={values.clientType}
          onChange={(value) => {
            handleChange('clientType')(value);
          }}
        />
        {errors.productCategory && touched.productCategory ? (
          <FieldError message={errors.productCategory} />
        ) : null}

        {values.clientType === 'new' ? (
          <TextInputField
            label="Name"
            placeholder="Name"
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            error={errors.name && touched.name ? true : false}
          />
        ) : (
          <DropDownList
            isLoading={false}
            label=""
            placeholder="Select existing client"
            items={clientsData!.map((i) => {
              return {
                label: i.name,
                value: i.id,
              };
            })}
            picked={values.existingClientId}
            onChange={async (id) => {
              const clientDetails = clientsData?.find((i) => i.id === id);
              handleChange('existingClientId')(id);
              setFieldValue('name', clientDetails?.name);

              // set birthday
              const birthdate = dayjs(clientDetails?.birthday).toDate();
              type StringOrNum = string | number;
              let mm: StringOrNum = birthdate.getMonth() + 1; // Months start at 0!
              let dd: StringOrNum = birthdate.getDate();
              const yyyy = birthdate.getFullYear();
              if (mm < 10) mm = '0' + mm;
              if (dd < 10) dd = '0' + dd;
              setFieldValue('birthday', mm + '/' + dd + '/' + yyyy);

              setFieldValue('smokingHabit', clientDetails?.smokingHabit);
            }}
          />
        )}

        {errors.name && touched.name ? (
          <FieldError message={errors.name} />
        ) : null}

        <RadioGroupField
          label="Gender"
          items={[
            {
              id: '1',
              value: 'MALE',
              label: 'Male',
            },
            {
              id: '2',
              value: 'FEMALE',
              label: 'Female',
            },
          ]}
          picked={values.gender}
          onChange={handleChange('gender')}
        />
        {errors.gender && touched.gender ? (
          <FieldError message={errors.gender} />
        ) : null}

        <DatePicker
          label="Birthday"
          placeholder="Birthday"
          value={values.birthday}
          onChangeText={handleChange('birthday')}
          onBlur={handleBlur('birthday')}
          error={errors.birthday && touched.birthday ? true : false}
        />
        {errors.birthday && touched.birthday ? (
          <FieldError message={errors.birthday} />
        ) : null}

        <DropDownList
          isLoading={false}
          label="Smoking Habit"
          placeholder="Select habit"
          items={[
            { label: 'Smoker', value: 'Smoker' },
            { label: 'Non-Smoker', value: 'Non-Smoker' },
          ]}
          picked={values.smokingHabit}
          onChange={handleChange('smokingHabit')}
        />
        {errors.smokingHabit && touched.smokingHabit ? (
          <FieldError message={errors.smokingHabit} />
        ) : null}

        <RadioGroupField
          label="Product Category"
          items={[
            {
              id: '1',
              value: 'Trad',
              label: 'Trad',
            },
            {
              id: '2',
              value: 'VUL',
              label: 'VUL',
            },
          ]}
          picked={values.productCategory}
          onChange={(value) => {
            handleChange('productCategory')(value);
          }}
        />
        {errors.productCategory && touched.productCategory ? (
          <FieldError message={errors.productCategory} />
        ) : null}

        <DropDownList
          isLoading={isProductsDropdownListLoading}
          label="Product Name"
          placeholder="Select product"
          items={
            isProductsDropdownListLoading
              ? []
              : productsDropdownListData!.map((i) => ({
                  value: i.id,
                  label: i.name,
                }))
          }
          picked={values.productId}
          onChange={(value) => {
            const selectedProduct = productsDropdownListData!.find(
              (i) => i.id === value
            );

            /*
             *  This fixes a bug where list of benefits does not reload and is still stale
             *  when going back to client details form then selecting a new product that has different benefits
             * */
            queryClient.invalidateQueries({
              queryKey: [`product`],
              refetchType: 'none',
            });

            // Set formik values
            setFieldValue('productId', selectedProduct!.id);
            setFieldValue('productName', selectedProduct!.name);
            setFieldValue('productDescription', selectedProduct!.description);
          }}
        />
        {errors.productName && touched.productName ? (
          <FieldError message={errors.productName} />
        ) : null}

        <DisabledTextInputField
          label="Product Description"
          placeholder="Write the description here..."
          value={values.productDescription}
          onChangeText={handleChange('productDescription')}
          onBlur={handleBlur('productDescription')}
          height={200}
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
          style={tw`bg-sunlife-secondary py-3.5 rounded-2 min-w-1/2.1`}>
          <Text style={tw`text-center text-white font-bold text-lg`}>Next</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ClientDetailsForm;
