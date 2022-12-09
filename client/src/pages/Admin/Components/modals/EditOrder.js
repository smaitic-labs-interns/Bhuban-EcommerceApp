import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Table,
  TableCell,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material";
import { Close, Edit, Save } from "@mui/icons-material";
import {
  EditOrderWrapper,
  CloseButtonWrapper,
  OrderContentWrapper,
  CustomTableRow,
  CustomTableCell,
  CustomTableCellValue,
  FormContainer,
  OrderFormInputWrapper,
  OrderFormSelectInputWrapper,
} from "../../styles/modals/editOrderStyle";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import {
  update_order_status,
  fetch_all_order,
  update_order_address,
  fetch_limited_order,
} from "../../../../redux/actions/orderActions";
import EditProductQuantity from "./EditProductQuantity";
import UpdatePayment from "./UpdatePayment";
import { axios_instance } from "../../../../api/config/baseApi";
import { address as addressEndpoint } from "../../../../api/config/api-endpoints";

export default function EditOrder({ order }) {
  const updateOrderStatus = useSelector((state) => state.updateOrderStatus);
  const updateOrderAddress = useSelector((state) => state.updateOrderAddress);
  const [open, setOpen] = useState(false);
  const [ordStatus, setOrdStatus] = useState(null);
  const prevOrdStatus = order.orderStatus;
  const dispatch = useDispatch();

  const {
    id,
    userId,
    orderStatus,
    totalBill,
    products,
    shippingAddress,
    payment,
    shipment,
    placedOn,
  } = order;

  const ordStatuses = [
    "pending",
    "Awaiting Payment",
    "Awaiting Fulfillment",
    "Awaiting Shipment",
    "Awaiting Pickup",
    "Partially Shipped",
    "Completed",
    "Shipped",
    "Cancelled",
    "Declined",
    "Refunded",
    "Disputed",
    "Manual Verification Required",
    "Partially Refunded",
  ];

  useEffect(() => {
    if (updateOrderStatus.status === "success") {
      Swal.fire({
        title: "Success!",
        text: `${updateOrderStatus.message}`,
        icon: "success",
      });
      dispatch(fetch_limited_order({ page: 1, limit: 5, action: "fetch" }));
    } else if (updateOrderStatus.status === "failed") {
      Swal.fire({
        title: "Failed!",
        text: `${updateOrderStatus.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    if (updateOrderStatus.status !== null) {
      dispatch(
        update_order_status({
          orderId: "",
          status: "",
          action: "clean",
        })
      );
    }
  }, [updateOrderStatus]);

  const handleUpdateStatus = () => {
    if (ordStatus && ordStatus !== "") {
      dispatch(
        update_order_status({
          orderId: order.id,
          status: ordStatus,
          action: "update",
        })
      );
    }
  };

  let index = 0;

  // for editing address
  const [address, setAddress] = useState({
    country: {
      selected: {
        id: "",
        name: "",
      },
      all: [],
    },
    state: {
      selected: {
        id: "",
        name: "",
      },
      all: [],
    },
    district: {
      selected: {
        id: "",
        name: "",
      },
      all: [],
    },
  });

  const handleChangeAddress = (type, value) => {
    if (value === "") return;
    switch (type) {
      case "country":
        const country = address.country.all.filter(
          (country) => country.name === value
        );
        setAddress((address) => ({
          ...address,
          country: { ...address.country, selected: country[0] },
        }));
        break;
      case "state":
        const state = address.state.all.filter((state) => state.name === value);
        setAddress((address) => ({
          ...address,
          state: { ...address.state, selected: state[0] },
        }));
        break;
      case "district":
        const district = address.district.all.filter(
          (district) => district.name === value
        );
        setAddress((address) => ({
          ...address,
          district: { ...address.district, selected: district[0] },
        }));
      case "city":
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
    if (id && id !== "") {
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
    if (id && id !== "") {
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
    city: "",
    ward: "",
    tole: "",
    houseNo: "",
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
      values.country = address.country.selected.name;
      values.province = address.state.selected.name;
      values.district = address.district.selected.name;
      dispatch(
        update_order_address({
          orderId: order.id,
          newAddress: values,
          action: "update",
        })
      );
    },
  });

  useEffect(() => {
    if (updateOrderAddress.status === "success") {
      Swal.fire({
        title: "Success!",
        text: `${updateOrderAddress.message}`,
        icon: "success",
      });
      dispatch(fetch_limited_order({ page: 1, limit: 5, action: "fetch" }));
    } else if (updateOrderAddress.status === "failed") {
      Swal.fire({
        title: "Error!",
        text: `${updateOrderAddress.message}`,
        icon: "error",
      });
    }

    if (updateOrderAddress.status !== null) {
      dispatch(
        update_order_address({
          orderId: "",
          newAddress: {},
          action: "clean",
        })
      );
    }
  }, [updateOrderAddress]);

  return (
    <div>
      <Button
        variant="outlined"
        color="info"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Edit />
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditOrderWrapper>
          <CloseButtonWrapper>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close />
            </Button>
          </CloseButtonWrapper>
          <OrderContentWrapper>
            <Table>
              <CustomTableRow>
                <CustomTableCell>Order Id: </CustomTableCell>
                <TableCell>{id}</TableCell>
              </CustomTableRow>

              <CustomTableRow>
                <CustomTableCell>
                  Order Status:
                  <CustomTableCellValue>({orderStatus})</CustomTableCellValue>
                </CustomTableCell>
                <CustomTableCell>
                  <Select
                    fullWidth
                    id="ordStatus"
                    name="ordStatus"
                    value={ordStatus}
                    label="Update Order Status"
                    onChange={(e) => {
                      setOrdStatus(e.target.value);
                    }}
                  >
                    {ordStatuses.length !== 0 ? (
                      ordStatuses.map((status) => {
                        return (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem value={"Not Available"}>
                        {"Not Available"}
                      </MenuItem>
                    )}
                  </Select>
                </CustomTableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => {
                      handleUpdateStatus();
                    }}
                    disabled={
                      orderStatus === "delivered" || orderStatus === "cancelled"
                        ? true
                        : false
                    }
                  >
                    <Save /> {" Update"}
                  </Button>
                </TableCell>
              </CustomTableRow>

              <CustomTableRow>
                <CustomTableCell>Shipping Address: </CustomTableCell>
                <TableCell>
                  <FormContainer component={"form"} onSubmit={handleSubmit}>
                    <OrderFormSelectInputWrapper>
                      <label htmlFor="country">Select Country</label>
                      <br />
                      <select
                        id="country"
                        onChange={(e) =>
                          handleChangeAddress("country", e.target.value)
                        }
                      >
                        <option value={""}>{"Select Country"}</option>
                        {address.country.all.length !== 0 ? (
                          address.country.all.map((country) => (
                            <option key={country.id} value={country.name}>
                              {country.name}
                            </option>
                          ))
                        ) : (
                          <option value={""}>
                            {" "}
                            {"Shipping Not Availabel"}
                          </option>
                        )}
                      </select>
                    </OrderFormSelectInputWrapper>

                    <OrderFormSelectInputWrapper>
                      <label htmlFor="states">Select Provience/state</label>{" "}
                      <br />
                      <select
                        id="states"
                        onChange={(e) =>
                          handleChangeAddress("state", e.target.value)
                        }
                      >
                        <option value={""}>{"Select Province/States"}</option>;
                        {address.state.all.length !== 0 ? (
                          address.state.all.map((state) => {
                            return (
                              <option key={state.id} value={state.name}>
                                {state.name}
                              </option>
                            );
                          })
                        ) : (
                          <option value={""}>{"Shipping Not Available"}</option>
                        )}
                      </select>
                    </OrderFormSelectInputWrapper>

                    <OrderFormSelectInputWrapper>
                      <label htmlFor="districts">Select Provience/state</label>{" "}
                      <br />
                      <select
                        id="districts"
                        onChange={(e) =>
                          handleChangeAddress("district", e.target.value)
                        }
                      >
                        <option value={""}>{"Select District"}</option>;
                        {address.district.all.length !== 0 ? (
                          address.district.all.map((district) => {
                            return (
                              <option key={district.id} value={district.name}>
                                {district.name}
                              </option>
                            );
                          })
                        ) : (
                          <option value={""}>{"Shipping Not Available"}</option>
                        )}
                      </select>
                    </OrderFormSelectInputWrapper>

                    <OrderFormSelectInputWrapper>
                      <label id="cities">Select City/Local-level</label> <br />
                      <select
                        id="cities"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value={""}>{"Select Local Level"}</option>;
                        <option value="Dhapakhel">{"Dhapakhel"}</option>
                        <option value={"Godawari"}>{"Godawari"}</option>
                        <option value={"Satdobato"}>{"Satdobato"}</option>
                      </select>
                    </OrderFormSelectInputWrapper>

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
                      <Button variant="contained" color="success" type="submit">
                        <Save />
                        {"Update"}
                      </Button>
                    </OrderFormInputWrapper>
                  </FormContainer>
                </TableCell>
              </CustomTableRow>

              <CustomTableRow>
                <CustomTableCell>Products: </CustomTableCell>
                <TableCell>
                  <CustomTableRow>
                    <CustomTableCell>S.N. </CustomTableCell>
                    <CustomTableCell>Product Id #</CustomTableCell>
                    <CustomTableCell> Quantity</CustomTableCell>
                    <CustomTableCell> Action</CustomTableCell>
                  </CustomTableRow>
                  {products.map((product) => {
                    index++;
                    return (
                      <CustomTableRow key={index}>
                        <CustomTableCell>{index}</CustomTableCell>
                        <CustomTableCellValue>
                          {product.productId}
                        </CustomTableCellValue>
                        <CustomTableCellValue>
                          {product.quantity}
                        </CustomTableCellValue>
                        <CustomTableCellValue>
                          <EditProductQuantity
                            product={product}
                            orderId={order.id}
                          />
                        </CustomTableCellValue>
                      </CustomTableRow>
                    );
                  })}
                </TableCell>
              </CustomTableRow>

              <CustomTableRow>
                <CustomTableRow>
                  <CustomTableCell></CustomTableCell>
                  <CustomTableCell>Type</CustomTableCell>
                  <CustomTableCell>Status</CustomTableCell>
                  <CustomTableCell>Action</CustomTableCell>
                </CustomTableRow>
                <CustomTableRow>
                  <CustomTableCell>Payment</CustomTableCell>
                  <CustomTableCellValue>{payment.type}</CustomTableCellValue>
                  <CustomTableCellValue> {payment.status}</CustomTableCellValue>
                  <CustomTableRow>
                    <UpdatePayment payment={payment} orderId={order.id} />
                  </CustomTableRow>
                </CustomTableRow>
                <CustomTableRow>
                  <CustomTableCell>Shipment</CustomTableCell>
                  <CustomTableCellValue>{shipment.type}</CustomTableCellValue>
                  <CustomTableCellValue>{shipment.status}</CustomTableCellValue>
                  <CustomTableCell>
                    <Button variant="outlined" color="primary" disabled>
                      <Edit />
                      Edit
                    </Button>
                  </CustomTableCell>
                </CustomTableRow>
              </CustomTableRow>
            </Table>
          </OrderContentWrapper>
          <CloseButtonWrapper>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close />
            </Button>
          </CloseButtonWrapper>
        </EditOrderWrapper>
      </Modal>
    </div>
  );
}
