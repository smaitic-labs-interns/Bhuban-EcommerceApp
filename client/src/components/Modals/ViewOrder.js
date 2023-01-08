import React, { useState } from 'react';
import { Button, Box, Modal, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { RemoveRedEye, Close } from '@mui/icons-material';

import {
  ViewOrderModalWrapper,
  CloseButtonWrapper,
  ContentTitle,
  ContentTable,
  ContentContainer,
  DetailsWrapper,
  ContentText,
} from 'Components/Modals/styles/viewOrder.style';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'scroll',
};

export default function ViewOrder({ order, initially }) {
  const [open, setOpen] = useState(() => (initially ? true : false));
  const handleOpen = () => setOpen(true);

  const { country, province, district, city, ward, tole, houseNo } = order.shippingAddress;
  var index = 0;
  return (
    <div>
      <Button variant='outlined' color='info' onClick={handleOpen}>
        <RemoveRedEye sx={{ paddingRight: '0.5rem' }} />
        View
      </Button>
      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
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
                  City: <br /> <span>{city}</span>
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
