import React from 'react';
import {
  EditUserWrapper,
  EditUserContainer,
  FormWrapper,
  FormInputWrapper,
  FormInput,
} from '../styles/edituserFormStyle';
import { TextField, Button } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { updateUserRules } from 'validation';

export default function EditUserForm({ userDetails }) {
  //   const register = useSelector((state) => state.register);
  //   const dispatch = useDispatch();
  const initialValues = {
    firstName: userDetails.firstName,
    middleName: userDetails.middleName,
    lastName: userDetails.lastName,
    address: userDetails.address,
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: updateUserRules,
    onSubmit: (values) => {
      alert(values);
      //   dispatch(user_register({ data: values, action: 'register' }));
    },
  });
  return (
    <EditUserWrapper>
      <EditUserContainer>
        <FormWrapper component='form' noValidate onSubmit={handleSubmit}>
          <FormInputWrapper>
            <FormInput>
              <TextField
                autoComplete='firstName'
                name='firstName'
                fullWidth
                id='firstName'
                label='First Name'
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
            </FormInput>
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInput>
              <TextField
                autoComplete='middleName'
                name='middleName'
                fullWidth
                id='middleName'
                label='Middle Name'
                value={values.middleName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.middleName && Boolean(errors.middleName)}
                helperText={touched.middleName && errors.middleName}
              />
            </FormInput>
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInput>
              <TextField
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='family-name'
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </FormInput>
          </FormInputWrapper>
          <FormInputWrapper>
            <TextField
              fullWidth
              id='address'
              label='Full Address'
              name='address'
              autoComplete='address'
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address && Boolean(errors.address)}
              helperText={touched.address && errors.address}
            />
          </FormInputWrapper>

          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Update
          </Button>
        </FormWrapper>
      </EditUserContainer>
    </EditUserWrapper>
  );
}
