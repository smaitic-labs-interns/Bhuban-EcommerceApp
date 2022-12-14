import React, { useState, useEffect } from "react";

import {
  Link,
  Grid,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import { registerSchema } from "../../validation";
import { user_register } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  RegisterWrapper,
  RegisterContainer,
  HeaderWrapper,
  TitleWrapper,
  FormWrapper,
  FormInputWrapper,
  FormInput,
  LoginWrapper,
} from "./indexStyle";

export default function Register() {
  const register = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };
  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
    confPassword: "",
    // tnc: false,
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registerSchema,
      onSubmit: (values) => {
        dispatch(user_register({ data: values, action: "register" }));
      },
    });

  useEffect(() => {
    if (register.status === "success") {
      Swal.fire({
        title: "Success!",
        text: `${register.message}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigateToLogin();
    } else if (register.status === "failed") {
      Swal.fire({
        title: "Failed!",
        text: `${register.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    if (register.status !== null) {
      dispatch(user_register({ data: values, action: "clean" }));
    }
  }, [register]);

  return (
    <>
      <RegisterWrapper>
        <RegisterContainer>
          <HeaderWrapper>
            <TitleWrapper>{"Sign up"}</TitleWrapper>
          </HeaderWrapper>

          <FormWrapper component="form" noValidate onSubmit={handleSubmit}>
            <FormInputWrapper>
              <FormInput>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // error={errors.firstName && Boolean(errors.firstName)}
                  // FormHelperText={touched.firstName}
                />
                {errors.firstName && touched.firstName ? (
                  <p>{errors.firstName}</p>
                ) : null}
              </FormInput>
              <FormInput>
                <TextField
                  autoComplete="given-name"
                  name="middleName"
                  fullWidth
                  id="middleName"
                  label="Middle Name"
                  autoFocus
                  value={values.middleName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // error={errors.middleName}
                  // helperText={touched.middleName}
                />
                {touched.middleName && errors.middleName ? (
                  <p className="form-error">{errors.middleName}</p>
                ) : null}
              </FormInput>
              <FormInput>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // error={errors.lastName}
                  // helperText={touched.lastName}
                />
              </FormInput>
            </FormInputWrapper>
            <FormInputWrapper>
              <TextField
                required
                fullWidth
                id="address"
                label="Full Address"
                name="address"
                autoComplete="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                // error={errors.address}
                // helperText={touched.address}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                // error={errors.email}
                // helperText={touched.email}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormInput>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete={"off"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // error={errors.password}
                  // helperText={touched.password}
                />
              </FormInput>
              <FormInput>
                <TextField
                  required
                  fullWidth
                  name="confPassword"
                  label="Conform Password"
                  type="password"
                  id="conformPassword"
                  autoComplete={"off"}
                  value={values.confPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // error={errors.confPassword}
                  // helperText={touched.confPassword}
                />
              </FormInput>
            </FormInputWrapper>
            <FormInputWrapper>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Agreed to all the terms and condition"
                // value={values.tnc}
                // onChange={handleChange}
                // onBlur={handleBlur}
                // error={errors.tnc}
                // helperText={touched.tnc}
              />
            </FormInputWrapper>
            {/* </Grid> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <LoginWrapper>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </LoginWrapper>
          </FormWrapper>
        </RegisterContainer>
      </RegisterWrapper>
    </>
  );
}
