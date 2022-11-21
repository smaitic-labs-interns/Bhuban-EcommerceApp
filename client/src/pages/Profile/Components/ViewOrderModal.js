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
} from "@mui/icons-material";
import Swal from "sweetalert2";
import {
  fetch_user_Cart,
  update_user_cart,
} from "../../../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { RemoveRedEye, Close } from "@mui/icons-material";
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
};

export default function ViewOrderModal({ order }) {
  //   const updateCart = useSelector((state) => state.updateCart);
  //   const login = useSelector((state) => state.login);
  //   const dispatch = useDispatch();
  //   const userId = login.isLogined ? login.userId : null;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [editAddress, setEditAddress] = useState(false);
  // const handleClose = () => setOpens(false);s
  const { country, province, district, city, ward, tole, houseNo } =
    order.shippingAddress;
  var index = 0;

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
                  Country: <span>{country}</span>
                </ContentText>
                <ContentText>
                  Province: <span>{province}</span>
                </ContentText>
                <ContentText>
                  District: <span>{district}</span>
                </ContentText>
                <ContentText>
                  Ward: <span>{ward}</span>
                </ContentText>
                <ContentText>
                  Tole: <span>{tole}</span>
                </ContentText>
                <ContentText>
                  House No.: <span>{houseNo}</span>
                </ContentText>
              </DetailsWrapper>
              <EditButtonWrapper>
                <EditAddressModel address={order.shippingAddress} />
              </EditButtonWrapper>
            </ContentContainer>
            <ContentTitle>Order Details</ContentTitle>
            <ContentContainer>
              <DetailsWrapper>
                <ContentText>
                  Shipment Type.: <span>{order.shipment.type}</span>
                </ContentText>
                <ContentText>
                  Shipment Status.: <span>{order.shipment.status}</span>
                </ContentText>
                <ContentText>
                  Order Status.: <span>{order.orderStatus}</span>
                </ContentText>
              </DetailsWrapper>
            </ContentContainer>

            <ContentTitle>Payment Details</ContentTitle>
            <ContentContainer>
              <DetailsWrapper>
                <ContentText>
                  Payment Type.: <span>{order.payment.type}</span>
                </ContentText>
                <ContentText>
                  Payment Status.: <span>{order.payment.status}</span>
                </ContentText>
                <ContentText>
                  Total Bill.: <span>{order.totalBill}</span>
                </ContentText>
              </DetailsWrapper>
            </ContentContainer>
            <ContentTable>
              <TableHead>
                <TableRow>
                  <TableCell>S.N.</TableCell>
                  <TableCell>Product #</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Action</TableCell>
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
                      <TableCell>
                        <EditProductModal data={product} />
                      </TableCell>
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
