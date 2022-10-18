import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { user_register } from "../../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
  
  const [firstName, setFirstName] = useState(null);
  const [middleName, setMiddleName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confPassword, setConfPassword] = useState(null);
  const [tnc, setTnc] = useState(false);
  
const register = useSelector((state) => state.register);
const dispatch = useDispatch();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const payload={firstName, middleName, lastName, address, email, password};
    if(!tnc){
      alert("Please Accept our terms and conditions")
    }else if(password !== confPassword){
      alert("Password and Conform Password must be same");
    }else if(firstName === null){
      alert("First name is required");
    }else if(lastName === null){
      alert("last name is required");
    }else if(address === null){
      alert("address  is required");
    }else if(email === null){
      alert("email  is required");
    }else if(password === null){
      alert("password  is required");
    }else if(confPassword === null){
      alert("conform password  is required");
    }else{
      dispatch(user_register(payload));
      console.log("REgister", register)
    };
  };

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
            sx={{ mt: 3 }}
          >
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
                onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-name"
                  name="middleName"
                  fullWidth
                  id="middleName"
                  label="Middle Name"
                  autoFocus
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
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
                  onChange={(e) => setAddress(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
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
                  autoComplete="Conform-password"
                  onChange={(e) => setConfPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Agreed to all the terms and condition"
                  onChange={(e) => setTnc(e.target.checked)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
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
