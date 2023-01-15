import * as Yup from 'yup';

export const registerRules = Yup.object({
  firstName: Yup.string().min(3).max(25).required('Please Enter first name'),
  middleName: Yup.string().min(3).max(25).nullable('Please Enter middle name'),
  lastName: Yup.string().min(3).max(25).required('Please Enter last name'),
  address: Yup.string().min(5).required('Please Enter Your Full address'),
  email: Yup.string().email('Please Enter ValidEmail').required('Email is required'),
  password: Yup.string().min(5).max(25).required('Please Enter Valid Password'),
  confPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
  tnc: Yup.bool().oneOf([true], 'Please accept our terms and conditions'),
});
