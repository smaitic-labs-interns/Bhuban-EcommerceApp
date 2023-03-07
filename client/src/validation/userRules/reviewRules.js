import * as Yup from 'yup';

export const reviewRules = Yup.object({
  review: Yup.string().required('Please provide your valuable review'),
  rating: Yup.number().required('Please provide your valuable rating'),
});
