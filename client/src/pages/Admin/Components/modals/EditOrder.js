import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Table,
  TableCell,
  Select,
  MenuItem,
  InputLabel,
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
} from "../../styles/modals/editOrderStyle";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import {
  update_order_status,
  fetch_all_order,
} from "../../../../redux/actions/orderActions";
import EditProductQuantity from "./EditProductQuantity";
import UpdatePayment from "./UpdatePayment";

export default function EditOrder({ order }) {
  const updateOrderStatus = useSelector((state) => state.updateOrderStatus);
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

  const initialValues = {
    // userId: userId,
    // country: address.country,
    // province: address.state,
    // district: address.district,
    // city: address.city,
    // ward: "",
    // tole: "",
    // houseNo: "",
    // shipmentType: "",
    // paymentType: "",
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
    // onSubmit: (values) => {
    //   dispatch(place_order({ ...values, action: "add" }));
    // },
  });

  useEffect(() => {
    if (updateOrderStatus.status === "success") {
      dispatch(fetch_all_order());
      Swal.fire({
        title: "Success!",
        text: `${updateOrderStatus.message}`,
        icon: "success",
      });
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
                  {/* <FormContainer component={"form"} onSubmit={handleSubmit}>
                    <OrderFormInputWrapper>
                      <InputLabel id="country-label">Select Country</InputLabel>
                      <Select
                        fullWidth
                        labelId="country-label"
                        id="country"
                        name="country"
                        label="Country Name"
                        value={address.country}
                        onChange={(e) => {
                          handleChangeAddress({
                            type: "country",
                            value: e.target.value,
                          });
                        }}
                        onBlur={handleBlur}
                      >
                        {countries.all.length !== 0 ? (
                          countries.all.map((country) => {
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
                          <MenuItem value={"Not Available"}>
                            {"Not Available"}
                          </MenuItem>
                        )}
                      </Select>
                    </OrderFormInputWrapper>

                    <OrderFormInputWrapper>
                      <InputLabel id="province-label">
                        Select Provience/state
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="province-label"
                        id="province"
                        name="province"
                        value={values.province}
                        label="Select Provience/state"
                        onChange={(e) => {
                          handleChangeAddress({
                            type: "province",
                            value: e.target.value,
                          });
                        }}
                        onBlur={handleBlur}
                      >
                        {address.state.all.length !== 0 ? (
                          address.state.all.map((state) => {
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
                          <MenuItem value={"Not Available"}>
                            {"Not Available"}
                          </MenuItem>
                        )}
                      </Select>
                    </OrderFormInputWrapper>

                    <OrderFormInputWrapper>
                      <InputLabel id="district-label">
                        Select District
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="district-label"
                        id="district"
                        name="district"
                        value={values.province}
                        label="Select District"
                        onChange={(e) => {
                          handleChangeAddress({
                            type: "district",
                            value: e.target.value,
                          });
                        }}
                        onBlur={handleBlur}
                      >
                        {address.district.all.length !== 0 ? (
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
                          <MenuItem value={"Not Available"}>
                            {"Not Available"}
                          </MenuItem>
                        )}
                      </Select>
                    </OrderFormInputWrapper>

                    <OrderFormInputWrapper>
                      <InputLabel id="city-label">
                        Select City/Local-level
                      </InputLabel>
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
                      <Button variant="contained" color="success" type="submit">
                        <Save />
                        {"Update"}
                      </Button>
                    </OrderFormInputWrapper>
                  </FormContainer> */}
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
