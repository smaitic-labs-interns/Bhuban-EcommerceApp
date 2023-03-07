import React, { useMemo } from 'react';
import { Button, TextField, FormControlLabel, Checkbox, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { loginRules } from 'validation';
import { user_login } from 'redux/actions/userActions';
import {
  LoginWrapper,
  LoginContainer,
  HeaderWrapper,
  TitleWrapper,
  FormWrapper,
  FormInput,
  ForgotPwdWrapper,
  CreateAccWrapper,
} from 'pages/Login/loginStyle';

export default function Login() {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: loginRules,
    onSubmit: (values) => {
      dispatch(user_login({ value: values, action: 'login' }));
    },
  });

  useMemo(() => {
    if (login.isLogined && login.status === 'success') {
      Swal.fire({
        title: 'success',
        timer: 1000,
        timerProgressBar: false,
        text: `${login.message}`,
      });
    } else if (login.status === 'failed') {
      Swal.fire({
        title: 'Failed!',
        text: `${login.message}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }

    if (login.status !== null) {
      dispatch(
        user_login({
          value: {},
          action: 'clean',
        }),
      );
    }
  }, [login, dispatch]);

  return (
    <>
      <LoginWrapper>
        <LoginContainer>
          <HeaderWrapper>
            <TitleWrapper>{'Sign in'}</TitleWrapper>
          </HeaderWrapper>
          <FormWrapper component='form' onSubmit={handleSubmit}>
            <FormInput>
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
            </FormInput>
            <FormInput>
              <TextField
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </FormInput>
            <ForgotPwdWrapper>
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />

              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </ForgotPwdWrapper>

            <Button type='submit' fullWidth variant='contained'>
              Sign In
            </Button>
            <CreateAccWrapper>
              <Link href='/register' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </CreateAccWrapper>
          </FormWrapper>
        </LoginContainer>
      </LoginWrapper>
    </>
  );
}
