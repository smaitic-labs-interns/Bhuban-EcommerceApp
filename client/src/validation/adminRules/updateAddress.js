import * as Yup from 'yup';

export const updateAddressRule = Yup.object({
  city: Yup.string().required('City is required'),
  ward: Yup.number()
    .typeError('Ward must be a number')
    .min(1, 'Ward number cannot be 0')
    .test('len', 'Ward cannot be a decimal', (value) => !value || /^\d*$/.test(value))
    .required('Ward is required'),
  tole: Yup.string().required('Tole is required'),
  houseNo: Yup.number()
    .typeError('House number must be a number')
    .min(1, 'House number cannot be 0')
    .test('len', 'House number cannot be a decimal', (value) => !value || /^\d*$/.test(value))
    .required('House Number is required'),
});
