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
import { user_login } from "../../../redux/actions/userActions";
import Register from "./Register";
import { Route, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateProfile = () => {
    navigate('/profile');

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      email: email,
      password: password,
    };
    dispatch(user_login(payload));
   
    console.log("Loading");
  };

  useEffect(() => {
    if(login.isLogined){
      console.log("Loaded");
      navigateProfile();
    } //thunk is required
  }, [login.isLogined]);

  // useNavigate
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
                // value={email}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
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
                // value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                <Grid item >
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
