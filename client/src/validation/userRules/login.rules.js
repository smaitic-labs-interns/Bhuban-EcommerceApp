import * as Yup from 'yup';

export const loginRules = Yup.object({
  email: Yup.string().email('Please Enter ValidEmail').required('Email is required'),
  password: Yup.string().min(5).max(25).required('Please Enter Valid Psassword'),
});
