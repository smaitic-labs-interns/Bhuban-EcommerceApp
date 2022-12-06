import React, { useState, useEffect } from "react";
import {Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { user_login } from "../../redux/actions/userActions";
import Swal from "sweetalert2";
import { loginSchema } from "../../validation";

export default function Login() {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminRoles = ["superadmin", "admin"];

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        dispatch(user_login({ value: values, action: "login" }));
      },
    });

  // useEffect(() => {
    console.log("From login", login.isLogined)
    // alert("login");
    if(login.isLogined === false){
      console.log("False condition")
    }else{
      alert("Login Success");
    }
    if (login.isLogined && login.status === "success") {
      // console.log(adminRoles.includes(login.role))
      adminRoles.includes(login.role)
        ? navigate("/admin")
        : navigate("/profile");

      Swal.fire({
        title: "success",
        timer: 1000,
        timerProgressBar: false,
        text: `${login.message}`,
      });
    } else if (login.status === "failed") {
      Swal.fire({
        title: "Failed!",
        text: `${login.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    if (login.status !== null) {
      dispatch(
        user_login({
          value: {},
          action: "clean",
        })
      );
    }
  // }, [login]);

  return (
    <>
      <Box component={"div"}>
        <Box
          component={"div"}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ maxWidth: "40%", marginTop: "50px" }}>
            <Box sx={{}}>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && Boolean(errors.email)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && Boolean(errors.password)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
