import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Modal,
  TextField,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  RemoveOutlined,
  Add,
  Update,
  Cancel,
  Edit,
  Save,
  RemoveRedEye,
  Close,
} from "@mui/icons-material";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import {
  ViewOrderModalWrapper,
  CloseButtonWrapper,
  ContentTitle,
  ContentTable,
  ContentContainer,
  DetailsWrapper,
  ContentText,
  EditButtonWrapper,
} from "../styles/viewOrderModalStyle";
import EditAddressModel from "./EditAddressModal";
import EditProductModal from "./EditProductModal";
import {
  updatet_order_payment,
  fetch_user_orders,
} from "../../../redux/actions/orderActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

export default function ViewOrderModal({ order }) {
  const updateOrderPayment = useSelector((state) => state.updateOrderPayment);
  //   const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  //   const userId = login.isLogined ? login.userId : null;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  // const [editAddress, setEditAddress] = useState(false);
  // const handleClose = () => setOpens(false);s
  const { country, province, district, city, ward, tole, houseNo } =
    order.shippingAddress;
  var index = 0;

  const handleUpdatePayment = async () => {
    const { value: payment } = await Swal.fire({
      title: "Pay Now",
      input: "select",
      inputOptions: {
        CASH: "Cash on Delivery",
        "E-sewa": "E-sewa",
        Khalti: "khalti",
        "Connect-Ips": "Connect -Ips",
      },
      inputPlaceholder: "Select Payment Method",
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value !== "") {
            Swal.close();
            dispatch(
              updatet_order_payment({
                orderId: order.id,
                payment: value,
                action: "update",
              })
            );
          } else {
            resolve("Please Select payment pethod :)");
          }
        });
      },
    });
  };

  useEffect(() => {
    if (updateOrderPayment.status === "success") {
      Swal.fire({
        title: "Success!",
        text: `${updateOrderPayment.message}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      dispatch(
        updatet_order_payment({
          orderId: "",
          payment: "",
          action: "clean",
        })
      );
    } else if (updateOrderPayment.status === "failed") {
      Swal.fire({
        title: "Error!",
        text: `${updateOrderPayment.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      dispatch(
        updatet_order_payment({
          orderId: "",
          payment: "",
          action: "clean",
        })
      );
    }
  }, [updateOrderPayment]);

  return (
    <div>
      <Button variant="outlined" color="info" onClick={handleOpen}>
        <RemoveRedEye sx={{ paddingRight: "0.5rem" }} />
        View
      </Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseButtonWrapper onClick={() => setOpen(false)}>
            <Close />
          </CloseButtonWrapper>
          <ViewOrderModalWrapper>
            <ContentTitle>Shipping Address</ContentTitle>
            <ContentContainer>
              <DetailsWrapper>
                <ContentText>
                  Country: <br />
                  <span>{country}</span>
                </ContentText>
                <ContentText>
                  Province: <br /> <span>{province}</span>
                </ContentText>
                <ContentText>
                  District: <br /> <span>{district}</span>
                </ContentText>
                <ContentText>
                  Ward: <br /> <span>{ward}</span>
                </ContentText>
                <ContentText>
                  Tole: <br /> <span>{tole}</span>
                </ContentText>
                <ContentText>
                  House No.: <br /> <span>{houseNo}</span>
                </ContentText>
              </DetailsWrapper>
              {/* <EditButtonWrapper>
                <EditAddressModel address={order.shippingAddress} />
              </EditButtonWrapper> */}
            </ContentContainer>
            <ContentTitle>Order Details</ContentTitle>
            <ContentContainer>
              <DetailsWrapper>
                <ContentText>
                  Shipment Type.:
                  <br /> <span>{order.shipment.type}</span>
                </ContentText>
                <ContentText>
                  Shipment Status.: <br />
                  <span>{order.shipment.status}</span>
                </ContentText>
                <ContentText>
                  Order Status.:
                  <br /> <span>{order.orderStatus}</span>
                </ContentText>
              </DetailsWrapper>
            </ContentContainer>

            <ContentTitle>Payment Details</ContentTitle>
            <ContentContainer>
              <DetailsWrapper>
                <ContentText>
                  Payment Type.: <br />
                  <span>{order.payment.type}</span>
                </ContentText>
                <ContentText>
                  Payment Status.: <br />
                  <span>{order.payment.status}</span>
                </ContentText>
                <ContentText>
                  Total Bill.: <br /> <span>{order.totalBill}</span>
                </ContentText>
              </DetailsWrapper>
              {/* <EditButtonWrapper>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleUpdatePayment()}
                >
                  <Edit />
                  Edit
                </Button>
              </EditButtonWrapper> */}
            </ContentContainer>
            <ContentTitle>Products Details</ContentTitle>
            <ContentTable>
              <TableHead>
                <TableRow>
                  <TableCell>S.N.</TableCell>
                  <TableCell>Product #</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.products.map((product) => {
                  index++;
                  return (
                    <TableRow key={product.productId}>
                      <TableCell>{index}</TableCell>
                      <TableCell>{product.productId}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      {/* <TableCell>
                        <EditProductModal
                          data={{ ...product, orderId: order.id }}
                        />
                      </TableCell> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </ContentTable>
          </ViewOrderModalWrapper>
        </Box>
      </Modal>
    </div>
  );
}
