import React, { useMemo, useState } from 'react';
import {
  EditUserWrapper,
  EditUserContainer,
  FormWrapper,
  FormInputWrapper,
  FormInput,
} from '../styles/edituserFormStyle';
import { TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { updateUserRules } from 'validation';
import { update_user, user_login } from 'redux/actions/userActions';

export default function EditUserForm({ userDetails }) {
  const login = useSelector((state) => state.login);
  const updateUser = useSelector((state) => state.updateUser);
  const [isUserUpdated, setIsUserUpdated] = useState(false);

  const userId = login.isLogined ? login.userId : '';
  const dispatch = useDispatch();
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
      dispatch(
        update_user({ userId: userId, data: values, updatedBy: userId, action: 'register' }),
      );
    },
  });

  useMemo(() => {
    if (updateUser.status === 'success') {
      Swal.fire({
        title: 'success',
        text: `${updateUser.message}`,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      setIsUserUpdated(true);
      dispatch(
        user_login({ value: { userId: userId }, action: 'login', isLogined: login.isLogined }),
      );
    } else if (updateUser.status === 'failed') {
      Swal.fire({
        title: 'Failed!',
        text: `${updateUser.message}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }

    if (updateUser.status !== null) {
      dispatch(
        update_user({
          userId: '',
          data: '',
          updatedBy: '',
          action: 'clean',
        }),
      );
    }
  }, [updateUser, dispatch, login, userId]);
  return (
    <EditUserWrapper>
      <EditUserContainer>
        <FormWrapper component='form' noValidate onSubmit={handleSubmit}>
          <FormInputWrapper>
            <FormInput>
              <TextField
                disabled={isUserUpdated}
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
                disabled={isUserUpdated}
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
                disabled={isUserUpdated}
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
              disabled={isUserUpdated}
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

          <Button
            disabled={isUserUpdated}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Update
          </Button>
        </FormWrapper>
      </EditUserContainer>
    </EditUserWrapper>
  );
}
