import React, { useMemo } from 'react';

import { Link, Checkbox, FormControlLabel, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import { registerRules } from '../../validation';
import { user_register } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {
  RegisterWrapper,
  RegisterContainer,
  HeaderWrapper,
  TitleWrapper,
  FormWrapper,
  FormInputWrapper,
  FormInput,
  LoginWrapper,
} from './registerStyle';

export default function Register() {
  const register = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };
  const initialValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    address: '',
    email: '',
    password: '',
    confPassword: '',
    tnc: true,
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, ErrorMessage } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registerRules,
      onSubmit: (values) => {
        dispatch(user_register({ data: values, action: 'register' }));
      },
    });

  useMemo(() => {
    if (register.status === 'success') {
      Swal.fire({
        title: 'Success!',
        text: `${register.message}`,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      navigateToLogin();
    } else if (register.status === 'failed') {
      Swal.fire({
        title: 'Failed!',
        text: `${register.message}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }

    if (register.status !== null) {
      dispatch(user_register({ data: values, action: 'clean' }));
    }
  }, [register]);

  return (
    <>
      <RegisterWrapper>
        <RegisterContainer>
          <HeaderWrapper>
            <TitleWrapper>{'Sign up'}</TitleWrapper>
          </HeaderWrapper>

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
            <FormInputWrapper>
              <TextField
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormInput>
                <TextField
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete={'off'}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </FormInput>
              <FormInput>
                <TextField
                  fullWidth
                  name='confPassword'
                  label='Conform Password'
                  type='password'
                  id='conformPassword'
                  autoComplete={'off'}
                  value={values.confPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confPassword && Boolean(errors.confPassword)}
                  helperText={touched.confPassword && errors.confPassword}
                />
              </FormInput>
            </FormInputWrapper>
            <FormInputWrapper>
              <FormControlLabel
                control={<Checkbox color='primary' />}
                label='Agreed to all the terms and condition'
                name='tnc'
                id='tnc'
                // checked={values.tnc}
                // value={values.tnc}
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
            </FormInputWrapper>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <LoginWrapper>
              <Link href='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </LoginWrapper>
          </FormWrapper>
        </RegisterContainer>
      </RegisterWrapper>
    </>
  );
}
