import React, { useEffect, useState } from 'react';
import { Select, MenuItem, TextField, Button, InputLabel } from '@mui/material';
import {
  FormWrapper,
  FormContainer,
  OrderFormInputWrapper,
  OrderFormSelectInputWrapper,
  PlaceOrderButtonWrapper,
} from '../Styles/shippingFormStyle';

import { useFormik } from 'formik';
import axiosInstance from 'modules/api';
import { address as addressEndpoint } from 'api/endpoint';
import { useSelector, useDispatch } from 'react-redux';
import { place_order } from '../../../redux/actions/orderActions';
import { fetch_user_Cart } from '../../../redux/actions/cartActions';
import Swal from 'sweetalert2';
import { send_mail } from '../../../redux/actions/mail.actions';
import { placed_order_details } from '../../../redux/actions/orderActions';

import { useNavigate } from 'react-router-dom';

export default function ShippingForm() {
  const placeOrder = useSelector((state) => state.placeOrder);
  const cart = useSelector((state) => state.userCart);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = login.isLogined ? login.userId : null;

  const [address, setAddress] = useState({
    country: {
      selected: {
        id: '',
        name: '',
      },
      all: [],
    },
    state: {
      selected: {
        id: '',
        name: '',
      },
      all: [],
    },
    district: {
      selected: {
        id: '',
        name: '',
      },
      all: [],
    },
  });

  const handleChangeAddress = (type, value) => {
    if (value === '') return;
    switch (type) {
      case 'country':
        const country = address.country.all.filter((country) => country.name === value);
        setAddress((address) => ({
          ...address,
          country: { ...address.country, selected: country[0] },
        }));
        break;
      case 'state':
        const state = address.state.all.filter((state) => state.name === value);
        setAddress((address) => ({
          ...address,
          state: { ...address.state, selected: state[0] },
        }));
        break;
      case 'district':
        const district = address.district.all.filter((district) => district.name === value);
        setAddress((address) => ({
          ...address,
          district: { ...address.district, selected: district[0] },
        }));
      case 'city':
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    axios_instance({
      endpoints: addressEndpoint.countries,
    })
      .then((response) => {
        let cAll = [];
        for (let c of response.data) {
          cAll.push({ id: c.id, name: c.name });
        }
        setAddress((address) => ({
          ...address,
          country: { ...address.country, all: cAll },
        }));
      })
      .catch((err) => {
        setAddress((address) => ({
          ...address,
          country: { ...address.country, all: [] },
        }));
      });
  }, []);

  useEffect(() => {
    let id = address.country.selected.id;
    if (id && id !== '') {
      axios_instance({
        endpoints: addressEndpoint.countryStates,
        query: { id: id },
      })
        .then((response) => {
          let stats = [];
          for (let c of response.data) {
            stats.push({ id: c.id, name: c.name });
          }
          setAddress((address) => ({
            ...address,
            state: { ...address.state, all: stats },
          }));
        })
        .catch((err) => {
          setAddress((address) => ({
            ...address,
            state: { ...address.state, all: [] },
          }));
        });
    }
  }, [address.country.selected.id]);

  useEffect(() => {
    let id = address.state.selected.id;
    if (id && id !== '') {
      axios_instance({
        endpoints: addressEndpoint.stateDistricts,
        query: { id: id },
      })
        .then((response) => {
          let stats = [];
          for (let c of response.data) {
            stats.push({ id: c.id, name: c.name });
          }
          setAddress((address) => ({
            ...address,
            district: { ...address.district, all: stats },
          }));
        })
        .catch((err) => {
          setAddress((address) => ({
            ...address,
            district: { ...address.district, all: [] },
          }));
        });
    }
  }, [address.state.selected.id]);

  useEffect(() => {
    let id = address.district.selected.id;
    // if (id && id !== "") {
    //   axios_instance({
    //     endpoints: address.stateDistricts,
    //     query: { id: id },
    //   })
    //     .then((response) => {
    //       let stats = [];
    //       for (let c of response.data) {
    //         stats.push({ id: c.id, name: c.districtname });
    //       }
    //       setAddress((address) => ({
    //         ...address,
    //         district: { ...address.district, all: stats },
    //       }));
    //     })
    //     .catch((err) => {
    //       setStates([]);
    //     });
    // }
  }, [address.district.selected.id]);

  const initialValues = {
    userId: userId,
    city: '',
    ward: '',
    tole: '',
    houseNo: '',
    shipmentType: '',
    paymentType: '',
  };

  const { values, errors, setFieldValue, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      // validationSchema: loginSchema, // for data validation
      onSubmit: (values) => {
        values.country = address.country.selected.name;
        values.province = address.state.selected.name;
        values.district = address.district.selected.name;
        dispatch(place_order({ ...values, action: 'add' }));
      },
    });

  const [shipment, setShipment] = useState({
    style: { display: 'none' },
    type: 'none',
    cost: 0,
  });
  const SHIPMENT_TYPES = [
    { name: 'International', charge: 500 },
    { name: 'Outside Valley', charge: 300 },
    { name: 'Inside Valley', charge: 200 },
    { name: 'Outside-RingRoad', charge: 150 },
    { name: 'Inside- RIngRoad', charge: 100 },
  ];

  useEffect(() => {
    for (var ship of SHIPMENT_TYPES) {
      if (ship.name === values.shipmentType) {
        setShipment({
          ...shipment,
          style: { display: 'block' },
          type: ship.name,
          cost: ship.charge,
        });
      }
    }
  }, [values.shipmentType]);

  useEffect(() => {
    if (placeOrder.status === 'success') {
      Swal.fire({
        title: 'Success!',
        text: `${placeOrder.message}`,
        icon: 'success',
      });

      let pDetails = '';
      let index = 0;
      for (let pr of cart.products) {
        index++;
        pDetails += `<tr>
                      <td>${index}</td>
                      <td>${pr.pDetails.category} - ${pr.pDetails.model} - ${pr.pDetails.brand}</td>
                      <td>${pr.quantity}</td>
                      <td>${pr.pDetails.price / 100}</td>
                      <td>Rs: ${(pr.pDetails.price * pr.quantity) / 100}</td>
                    </tr>`;
      }
      pDetails += `<tr style = "border-top: solid black 5px">
                    <td></td>
                    <td style = "font-weight: 600;">Grand Total</td>
                    <td></td>
                    <td colSpan=2 style = "font-weight: 600;">Rs: ${cart.totalBill / 100}</td>
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

      let from = 'Ecommerce App <Bill Generation>';
      let to = 'bhuban.temp@gmail.com';
      let subject = 'Regarding Order Invoice';
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
          action: 'send',
        }),
      );
      dispatch(placed_order_details({ order: values, cart: cart, action: 'fetch' }));
      dispatch(place_order({ ...initialValues, action: 'clean' }));
      dispatch(fetch_user_Cart({ userId: '', action: 'clean' }));
      navigate('/generateBill');
    } else if (placeOrder.status === 'failed') {
      Swal.fire({
        title: 'Error!',
        text: `${placeOrder.message}`,
        icon: 'error',
      });
    }
  }, [placeOrder]);

  return (
    <FormWrapper>
      <FormContainer component={'form'} onSubmit={handleSubmit}>
        <OrderFormSelectInputWrapper>
          <InputLabel id='shipment-type-label'>Shipment Type</InputLabel>
          <Select
            fullWidth
            labelId='shipment-type-label'
            id='shipmentType'
            name='shipmentType'
            value={values.shipmentType}
            label='Shipment Type'
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
        </OrderFormSelectInputWrapper>

        <OrderFormSelectInputWrapper>
          <label htmlFor='country'>Select Country</label>
          <br />
          <select id='country' onChange={(e) => handleChangeAddress('country', e.target.value)}>
            <option value={''}>{'Select Country'}</option>
            {address.country.all.length !== 0 ? (
              address.country.all.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))
            ) : (
              <option value={''}> {'Shipping Not Availabel'}</option>
            )}
          </select>
        </OrderFormSelectInputWrapper>

        <OrderFormSelectInputWrapper>
          <label htmlFor='states'>Select Provience/state</label> <br />
          <select id='states' onChange={(e) => handleChangeAddress('state', e.target.value)}>
            <option value={''}>{'Select Province/States'}</option>;
            {address.state.all.length !== 0 ? (
              address.state.all.map((state) => {
                return (
                  <option key={state.id} value={state.name}>
                    {state.name}
                  </option>
                );
              })
            ) : (
              <option value={''}>{'Shipping Not Available'}</option>
            )}
          </select>
        </OrderFormSelectInputWrapper>

        <OrderFormSelectInputWrapper>
          <label htmlFor='districts'>Select Provience/state</label> <br />
          <select id='districts' onChange={(e) => handleChangeAddress('district', e.target.value)}>
            <option value={''}>{'Select District'}</option>;
            {address.district.all.length !== 0 ? (
              address.district.all.map((district) => {
                return (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                );
              })
            ) : (
              <option value={''}>{'Shipping Not Available'}</option>
            )}
          </select>
        </OrderFormSelectInputWrapper>

        <OrderFormSelectInputWrapper>
          <label id='cities'>Select City/Local-level</label> <br />
          <select
            id='cities'
            name='city'
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value={''}>{'Select Local Level'}</option>;
            <option value='Dhapakhel'>{'Dhapakhel'}</option>
            <option value={'Godawari'}>{'Godawari'}</option>
            <option value={'Satdobato'}>{'Satdobato'}</option>
          </select>
        </OrderFormSelectInputWrapper>

        <OrderFormInputWrapper>
          <TextField
            margin='normal'
            required
            fullWidth
            id='tole'
            label='tole'
            name='tole'
            autoComplete='tole'
            value={values.tole}
            onChange={handleChange}
            onBlur={handleBlur}
            //   error={errors.email && Boolean(errors.email)}
          />
        </OrderFormInputWrapper>

        <OrderFormInputWrapper>
          <TextField
            margin='normal'
            required
            fullWidth
            id='ward'
            label='ward'
            name='ward'
            autoComplete='ward'
            value={values.ward}
            onChange={handleChange}
            onBlur={handleBlur}
            //   error={errors.email && Boolean(errors.email)}
          />
        </OrderFormInputWrapper>

        <OrderFormInputWrapper>
          <TextField
            margin='normal'
            required
            fullWidth
            id='houseNo'
            label='houseNo'
            name='houseNo'
            autoComplete='houseNo'
            value={values.houseNo}
            onChange={handleChange}
            onBlur={handleBlur}
            //   error={errors.email && Boolean(errors.email)}
          />
        </OrderFormInputWrapper>

        <OrderFormInputWrapper>
          <InputLabel id='payment-type-label'>Payment</InputLabel>
          <Select
            fullWidth
            labelId='payment-type-label'
            id='paymentType'
            name='paymentType'
            value={values.paymentType}
            label='Payment Type'
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value='CASH'>{'Cash on Delivery'}</MenuItem>
            <MenuItem value={'E-sewa'}>{'E-sewa'}</MenuItem>
            <MenuItem value={'Khalti'}>{'Khalti'}</MenuItem>
            <MenuItem value={'CONNECT-IPS'}>{'CONNECT-IPS'}</MenuItem>
          </Select>
        </OrderFormInputWrapper>

        <PlaceOrderButtonWrapper>
          <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, background: 'green' }}>
            Place Order
          </Button>
        </PlaceOrderButtonWrapper>
      </FormContainer>
    </FormWrapper>
  );
}
