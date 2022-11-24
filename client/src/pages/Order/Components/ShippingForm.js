import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
  Autocomplete,
  Button,
  InputLabel,
} from "@mui/material";
import {
  FormWrapper,
  FormContainer,
  OrderFormInputWrapper,
  PlaceOrderButtonWrapper,
} from "../Styles/shippingFormStyle";

import { useFormik } from "formik";
import { axios_instance } from "../../../api/config/config";
import { extra } from "../../../api/config/api-endpoints";
import { useSelector, useDispatch } from "react-redux";
import { place_order } from "../../../redux/actions/orderActions";
import Swal from "sweetalert2";
import { send_mail } from "../../../redux/actions/mail.actions";
import { mail } from "../../../api/config/api-endpoints";

import { useNavigate } from "react-router-dom";

export default function ShippingForm() {
  const placeOrder = useSelector((state) => state.placeOrder);
  const sendMail = useSelector((state) => state.sendMail);
  const cart = useSelector((state) => state.userCart);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = login.isLogined ? login.userId : null;

  const initialValues = {
    userId: userId,
    // country: address.country,
    // province: address.state,
    // district: address.district,
    // city: address.city,
    ward: "",
    tole: "",
    houseNo: "",
    shipmentType: "",
    paymentType: "",
  };

  const {
    values,
    errors,
    setFieldValue,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    // validationSchema: loginSchema, // for data validation
    onSubmit: (values) => {
      dispatch(place_order({ ...values, action: "add" }));
    },
  });

  const [countries, setCountries] = useState([]);
  const [selCountry, setSelCountry] = useState("");

  const handleChangeAddress = ({ type, value }) => {
    const { id, name } = value;

    switch (type) {
      case "country":
        setSelCountry(name);
        break;
      case "province":
        break;
      case "district":
        break;
      case "city":
        break;

      default:
        break;
    }
    console.log(selCountry);
  };

  useEffect(() => {
    axios_instance({
      endpoints: extra.countries,
    })
      .then((response) => {
        let cAll = [];
        for (let c of response.data) {
          cAll.push({ id: c.id, name: c.country });
        }
        setCountries(cAll);
      })
      .catch((err) => {
        setCountries([]);
      });
  }, []);

  return (
    <FormWrapper>
      <FormContainer component={"form"} onSubmit={handleSubmit}>
        <OrderFormInputWrapper>
          <InputLabel id="country-label">Select Country</InputLabel>
          <Select
            fullWidth
            labelId="country-label"
            id="country"
            name="country"
            label="Country Name"
            // value={selCountry}
            onChange={(e) => {
              handleChangeAddress({ type: "country", value: e.target.value });
            }}
            onBlur={handleBlur}
          >
            {countries.length !== 0 ? (
              countries.map((country) => {
                return (
                  <MenuItem
                    key={country.id}
                    value={{ id: country.id, name: country.name }}
                  >
                    {country.name}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value={"Not Available"}>{"Not Available"}</MenuItem>
            )}
          </Select>
        </OrderFormInputWrapper>

        <OrderFormInputWrapper>
          <InputLabel id="province-label">Select Provience/state</InputLabel>
          <Select
            fullWidth
            labelId="province-label"
            id="province"
            name="province"
            value={values.province}
            label="Select Provience/state"
            onChange={(e) => {
              handleChangeAddress({ type: "province", value: e.target.value });
            }}
            // onBlur={handleBlur}
          >
            {/* {states.all.length !== 0 ? (
              states.all.map((state) => {
                return (
                  <MenuItem
                    key={state.id}
                    value={{ id: state.id, name: state.name }}
                  >
                    {state.statename}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value={"Not Available"}>{"Not Available"}</MenuItem>
            )} */}
          </Select>
        </OrderFormInputWrapper>

        <OrderFormInputWrapper>
          <InputLabel id="district-label">Select District</InputLabel>
          <Select
            fullWidth
            labelId="district-label"
            id="district"
            name="district"
            value={values.province}
            label="Select District"
            onChange={(e) => {
              handleChangeAddress({ type: "district", value: e.target.value });
            }}
            onBlur={handleBlur}
          >
            {/* {address.district.all.length !== 0 ? (
              address.district.all.map((district) => {
                return (
                  <MenuItem
                    key={district.id}
                    value={{ id: district.id, name: district.name }}
                  >
                    {district.name}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value={"Not Available"}>{"Not Available"}</MenuItem>
            )} */}
          </Select>
        </OrderFormInputWrapper>

        <OrderFormInputWrapper>
          <InputLabel id="city-label">Select City/Local-level</InputLabel>
          <Select
            fullWidth
            labelId="city-label"
            id="city"
            name="city"
            value={values.city}
            label="Select City / local-level"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="Dhapakhel">{"Dhapakhel"}</MenuItem>
            <MenuItem value={"Godawari"}>{"Godawari"}</MenuItem>
            <MenuItem value={"Satdobato"}>{"Satdobato"}</MenuItem>
          </Select>
        </OrderFormInputWrapper>

        <OrderFormInputWrapper>
          <TextField
            margin="normal"
            required
            fullWidth
            id="tole"
            label="tole"
            name="tole"
            autoComplete="tole"
            value={values.tole}
            onChange={handleChange}
            onBlur={handleBlur}
            //   error={errors.email && Boolean(errors.email)}
          />
        </OrderFormInputWrapper>

        <OrderFormInputWrapper>
          <TextField
            margin="normal"
            required
            fullWidth
            id="ward"
            label="ward"
            name="ward"
            autoComplete="ward"
            value={values.ward}
            onChange={handleChange}
            onBlur={handleBlur}
            //   error={errors.email && Boolean(errors.email)}
          />
        </OrderFormInputWrapper>

        <OrderFormInputWrapper>
          <TextField
            margin="normal"
            required
            fullWidth
            id="houseNo"
            label="houseNo"
            name="houseNo"
            autoComplete="houseNo"
            value={values.houseNo}
            onChange={handleChange}
            onBlur={handleBlur}
            //   error={errors.email && Boolean(errors.email)}
          />
        </OrderFormInputWrapper>

        <OrderFormInputWrapper>
          <InputLabel id="payment-type-label">Payment</InputLabel>
          <Select
            fullWidth
            labelId="payment-type-label"
            id="paymentType"
            name="paymentType"
            value={values.paymentType}
            label="Payment Type"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="CASH">{"Cash on Delivery"}</MenuItem>
            <MenuItem value={"E-sewa"}>{"E-sewa"}</MenuItem>
            <MenuItem value={"Khalti"}>{"Khalti"}</MenuItem>
            <MenuItem value={"CONNECT-IPS"}>{"CONNECT-IPS"}</MenuItem>
          </Select>
        </OrderFormInputWrapper>

        <PlaceOrderButtonWrapper>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, background: "green" }}
          >
            Place Order
          </Button>
        </PlaceOrderButtonWrapper>
      </FormContainer>
    </FormWrapper>
  );
}
