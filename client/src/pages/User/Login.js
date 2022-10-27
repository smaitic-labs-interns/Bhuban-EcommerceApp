import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { user_login } from "../../redux/actions/userActions";
import { Route, useNavigate } from "react-router-dom";
import { loginSchema } from "../../schemas";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        // console.log(values);
        toast.info(values);
        dispatch(user_login(values));
      },
    });

  useEffect(() => {
    console.log("Login Status ", login.isLogined, "loading: ", login.loading);
    if (login.isLogined && login.loading === false) {
      toast.success("login success");
      navigateToProfile();
    } else if (login.isLogined === false && login.loading === false) {
      toast.error("Invalid login Details");
      // alert("Invalid login Details");
    }
  }, [login.isLogined, login.loading]);
  return (
    <>
      <Box component={"div"}>
        <Box
          component={"div"}
          sx={{ display: "flex", justifyContent: "center" }}>
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
                sx={{ mt: 3, mb: 2 }}>
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
      <ToastContainer position="top-center" />
    </>
  );
}
