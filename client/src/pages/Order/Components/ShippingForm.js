import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
  Box,
  Button,
  InputLabel,
} from "@mui/material";
import {
  FormWrapper,
  FormContainer,
  OrderFormInputWrapper,
  PlaceOrderButtonWrapper,
} from "../Styles/shippingFormStyle";

import { Formik, useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { place_order } from "../../../redux/actions/orderActions";
import Swal from "sweetalert2";

import {
  read_all_countries,
  read_states_by_country_id,
  read_districts_by_state_id,
} from "../../../redux/actions/extra";

export default function ShippingForm() {
  const placeOrder = useSelector((state) => state.placeOrder);
  const login = useSelector((state) => state.login);
  const world = useSelector((state) => state.countries);
  const country = useSelector((state) => state.states);
  const state = useSelector((state) => state.districts);
  const dispatch = useDispatch();

  const userId = login.isLogined ? login.userId : null;
  const [cntries, setCntries] = useState([]);
  const [states, setStates] = useState([]);
  // const [country, setCountry] = useState([]);

  const initialValues = {
    userId: userId,
    country: "",
    province: "",
    city: "",
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

  useEffect(() => {
    if (placeOrder.status === "success") {
      Swal.fire({
        title: "Success!",
        text: `${placeOrder.message}`,
        icon: "success",
      });
      dispatch(place_order({ ...initialValues, action: "clean" }));
    } else if (placeOrder.status === "failed") {
      Swal.fire({
        title: "Error!",
        text: `${placeOrder.message}`,
        icon: "error",
      });
    }
  }, [placeOrder]);

  const [shipment, setShipment] = useState({
    style: { display: "none" },
    type: "none",
    cost: 0,
  });
  const SHIPMENT_TYPES = [
    { name: "International", charge: 500 },
    { name: "Outside Valley", charge: 300 },
    { name: "Inside Valley", charge: 200 },
    { name: "Outside-RingRoad", charge: 150 },
    { name: "Inside- RIngRoad", charge: 100 },
  ];

  useEffect(() => {
    for (var ship of SHIPMENT_TYPES) {
      if (ship.name === values.shipmentType) {
        setShipment({
          ...shipment,
          style: { display: "block" },
          type: ship.name,
          cost: ship.charge,
        });
      }
    }
  }, [values.shipmentType]);

  useEffect(() => {
    setStates(() => []);
    dispatch(read_all_countries());
    setCntries(world.countries);
  }, []);

  useEffect(() => {
    if (values.country && values.country !== "")
      dispatch(read_states_by_country_id({ countryId: values.country }));
    setStates(country.states);
  }, [values.country]);

  return (
    <FormWrapper>
      <FormContainer component={"form"} onSubmit={handleSubmit}>
        <OrderFormInputWrapper>
          <InputLabel id="shipment-type-label">Shipment Type</InputLabel>
          <Select
            fullWidth
            labelId="shipment-type-label"
            id="shipmentType"
            name="shipmentType"
            value={values.shipmentType}
            label="Shipment Type"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {SHIPMENT_TYPES.map((shipment) => {
              return (
                <MenuItem key={shipment.charge} value={shipment.name}>
                  {shipment.name}
                </MenuItem>
              );
            })}
          </Select>
          <p style={shipment.style}>
            {`Cost for ${shipment.type} Shipment is : Rs. ${shipment.cost}`}
          </p>
        </OrderFormInputWrapper>

        <OrderFormInputWrapper>
          <InputLabel id="country-label">Select Country</InputLabel>
          <Select
            fullWidth
            labelId="country-label"
            id="country"
            name="country"
            value={values.country}
            label="Country Name"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {/* {cntries.length !== 0 ? (
              cntries.map((country) => {
                return (
                  <MenuItem key={country.id} value={country.id}>
                    {country.country}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value={"Not Available"}>{"Not Available"}</MenuItem>
            )} */}
            <MenuItem value={"Nepal"}>{"Nepal"}</MenuItem>
            <MenuItem value={"India"}>{"India"}</MenuItem>
            <MenuItem value={"China"}>{"China"}</MenuItem>
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
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {/* {states.length !== 0 ? (
              states.map((state) => {
                return (
                  <MenuItem key={state.id} value={state.id}>
                    {state.statename}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value={"Not Available"}>{"Not Available"}</MenuItem>
            )} */}
            <MenuItem value={"bagmati"}>{"bagmati"}</MenuItem>
            <MenuItem value={"karnali"}>{"karnali"}</MenuItem>
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
            <MenuItem value="Nepal">{"Kathmandu"}</MenuItem>
            <MenuItem value={"India"}>{"Bhaktapur"}</MenuItem>
            <MenuItem value={"Pakistan"}>{"Dhapakhel"}</MenuItem>
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
