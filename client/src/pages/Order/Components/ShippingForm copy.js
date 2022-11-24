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

import {
  read_all_countries,
  read_states_by_country_id,
  read_districts_by_state_id,
} from "../../../redux/actions/extra";
import { useNavigate } from "react-router-dom";

export default function ShippingForm() {
  const placeOrder = useSelector((state) => state.placeOrder);
  const sendMail = useSelector((state) => state.sendMail);
  const cart = useSelector((state) => state.userCart);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = login.isLogined ? login.userId : null;

  // const [countries, setCountry] = useState({
  //   selected: {
  //     id: "",
  //     name: "",
  //   },
  //   all: [],
  // });
  // const [states, setState] = useState({
  //   state: {
  //     selected: {
  //       id: "",
  //       name: "",
  //     },
  //     all: [],
  //   },
  // });
  // const [districts, setDistrict] = useState({
  //   district: {
  //     selected: {
  //       id: "",
  //       name: "",
  //     },
  //     all: [],
  //   },
  // });
  // // const [country, setCountry] = useState()

  // const [address, setAddress] = useState({
  //   country: {
  //     selected: {
  //       id: "",
  //       name: "",
  //     },
  //     all: [],
  //   },
  //   state: {
  //     selected: {
  //       id: "",
  //       name: "",
  //     },
  //     all: [],
  //   },
  //   district: {
  //     selected: {
  //       id: "",
  //       name: "",
  //     },
  //     all: [],
  //   },
  //   city: {
  //     selected: {
  //       id: "",
  //       name: "",
  //     },
  //     all: [],
  //   },
  // });

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

  const [cntSel, setcntSel] = useState({ id: "", name: "" });
  const [proSel, setproSel] = useState({ id: "", name: "" });
  const [cntAll, setcntAll] = useState([]);
  const [proAll, setproAll] = useState([]);

  useEffect(() => {
    axios_instance({
      endpoints: extra.countries,
    })
      .then((response) => {
        let cntries = [];
        for (let cntry of response.data) {
          cntries.push({ id: cntry.id, name: cntry.country });
        }
        setcntAll(cntries);
      })
      .catch((err) => {
        setcntAll([]);
      });
  }, []);

  const handleChangeAddress = ({ type, value }) => {
    const { id, name } = value;

    switch (type) {
      case "country":
        setcntSel((c) => ({ ...c, id: id, name: name }));
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

    // setAddress((address) => ({ ...address, country: name }));
    // setCid(id);
    // axios_instance({
    //   endpoints: extra.countryStates,
    //   query: { id: id },
    // })
    //   .then((response) => {
    //     let states = [];
    //     for (let state of response.data) {
    //       states.push({ id: state.id, name: state.stateName });
    //     }
    //     setAddress((address) => ({ ...address, allStates: states }));
    //   })
    //   .catch((err) => {
    //     setAddress((address) => ({ ...address, allStates: [] }));
    //   });
  };

  useEffect(() => {
    console.log(cntSel);
    if (cntSel.id !== "" && cntSel.name !== "") {
      axios_instance({
        endpoints: extra.countryStates,
      })
        .then((response) => {
          let sts = [];
          for (let stat of response.data) {
            sts.push({ id: stat.id, name: stat.stateName });
          }
          setproAll(sts);
        })
        .catch((err) => {
          setproAll([]);
        });
    }
    console.log(proAll);
  }, [cntSel]);
  // useEffect(() => {
  //   axios_instance({
  //     endpoints: extra.countryStates,
  //     query: { id: cid },
  //   })
  //     .then((response) => {
  //       let states = [];
  //       for (let state of response.data) {
  //         states.push({ id: state.id, name: state.stateName });
  //       }
  //       setAddress((address) => ({ ...address, allStates: states }));
  //     })
  //     .catch((err) => {
  //       setAddress((address) => ({ ...address, allStates: [] }));
  //     });
  // }, [cid]);

  const handleSelectState = (value) => {
    const { id, name } = value;
    // setAddress((address) => ({ ...address, state: name }));
    axios_instance({
      endpoints: extra.stateDistricts,
      query: { id: id },
    })
      .then((response) => {
        let districts = [];
        for (let district of response.data) {
          districts.push({ id: district.id, name: district.districtName });
        }
        // setAddress((address) => ({ ...address, allDistricts: districts }));
      })
      .catch((err) => {
        // setAddress((address) => ({ ...address, district: [] }));
      });
  };

  const handleSelectDistrict = (value) => {
    const { id, name } = value;
    // setAddress((address) => ({ ...address, district: name }));
    // axios_instance({
    //   endpoints: extra.,
    //   query: { id: id },
    // })
    //   .then((response) => {
    //     let states = [];
    //     for (let state of response.data) {
    //       states.push({ id: state.id, name: state.stateName });
    //     }
    //     setStates(states);
    //   })
    //   .catch((err) => {
    //     setStates([]);
    //   });
  };

  useEffect(() => {
    if (placeOrder.status === "success") {
      Swal.fire({
        title: "Success!",
        text: `${placeOrder.message}`,
        icon: "success",
      });

      let pDetails = "";
      let index = 0;
      for (let pr of cart.products) {
        index++;
        pDetails += `<tr>
                      <td>${index}</td>
                      <td>${pr.pDetails.category} : ${pr.pDetails.name}</td>
                      <td>${pr.quantity}</td>
                      <td>${pr.pDetails.price / 100}</td>
                      <td>Rs: ${(pr.pDetails.price * pr.quantity) / 100}</td>
                    </tr>`;
      }
      pDetails += `<tr style = "border-top: solid black 5px">
                    <td></td>
                    <td style = "font-weight: 600;">Grand Total</td>
                    <td></td>
                    <td colSpan=2 style = "font-weight: 600;">Rs: ${
                      cart.totalBill / 100
                    }</td>
                  </tr>`;

      let mailCntnt = `      
      <!DOCTYPE html>
      <html>
      <head>
      <style>
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }

      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }

      tr:nth-child(even) {
        background-color: #dddddd;
      }
      </style>
      </head>
      <body>

      <h2>Your Order Hasbeen Placed Sucessfully With The following Details:</h2>

      <table>
        <tr>
          <th>S.N.</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
        ${pDetails}
      </table>
      </body>
      </html>
      `;

      let from = "Ecommerce App <Bill Generation>";
      let to = "bhuban.temp@gmail.com";
      let subject = "Regarding Order Invoice";
      let text = ``;
      let html = mailCntnt;

      // html: componentRef,
      dispatch(
        send_mail({
          from: from,
          to: to,
          subject: subject,
          text: text,
          html: html,
          action: "send",
        })
      );
      dispatch(place_order({ ...initialValues, action: "clean" }));
      navigate("generateBill");
    } else if (placeOrder.status === "failed") {
      Swal.fire({
        title: "Error!",
        text: `${placeOrder.message}`,
        icon: "error",
      });
    }
  }, [placeOrder]);
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
            label="Country Name"
            value={cntSel.name}
            onChange={(e) => {
              handleChangeAddress({ type: "country", value: e.target.value });
            }}
            onBlur={handleBlur}
          >
            {cntAll.length !== 0 ? (
              cntAll.map((country) => {
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
