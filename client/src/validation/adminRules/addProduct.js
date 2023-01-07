import * as Yup from 'yup';

export const addProductRules = Yup.object({
  category: Yup.string().required('Product Category is required'),
  model: Yup.string().required('Product Model is required'),
  brand: Yup.string().required('Product Brand is required'),
  name: Yup.string().required('Product Name is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .min(0.1, 'Price must be greater than 0')
    .test(
      'len',
      'Price must have at most 2 digits after the decimal point',
      (value) => !value || /^\d*(\.\d{0,2})?$/.test(value),
    )
    .required('Product Price is required'),
  quantity: Yup.number()
    .typeError('Quantity must be a number')
    .min(1, 'Quantity must be greater than 0')
    .test('len', 'Quantity cannot be a decimal', (value) => !value || /^\d*$/.test(value))
    .required('Available Quantity is required'),

  description: Yup.string().required('Product Description is required'),
});
