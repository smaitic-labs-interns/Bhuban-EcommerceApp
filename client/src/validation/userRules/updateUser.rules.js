import * as Yup from 'yup';

export const updateUserRules = Yup.object({
  firstName: Yup.string().min(2).max(25).required('Please Enter first name'),
  middleName: Yup.string().min(2).max(25).nullable('Please Enter middle name'),
  lastName: Yup.string().min(2).max(25).required('Please Enter last name'),
  address: Yup.string().min(5).required('Please Enter Your Full address'),
});
