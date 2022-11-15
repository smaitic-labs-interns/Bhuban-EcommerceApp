import React, { useState, useEffect } from "react";
import { FormHelperText } from "@mui/material";
import {
  Link,
  Grid,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import { registerSchema } from "../../schemas";
import { user_register } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
// import {toast} from "react-toastify"

export default function Register() {
  const register = useSelector((state) => state.register);
  const dispatch = useDispatch();
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
        console.log(values);
        dispatch(user_register(values));
      },
    });

  return (
    <>
      <Box component={"div"} sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ maxWidth: "60%" }}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
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
              </Grid>
              <Grid item xs={12} sm={4}>
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
              </Grid>
              <Grid item xs={12} sm={4}>
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
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Agreed to all the terms and condition"
                  // value={values.tnc}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  // error={errors.tnc}
                  // helperText={touched.tnc}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}