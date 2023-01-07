import React, { useEffect, useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import {
  BillWrapper,
  PrintBillWrapper,
  PrintButtonWrapper,
  BillContainer,
  HeaderWrapper,
  SiteTitleWrapper,
  DateWrapper,
  ShopDetailWrapper,
  UserDescWrapper,
  UserDetailsWrapper,
  TitleWrapper,
  ContentWrapper,
  ProductDetailsWrapper,
  TableHeaderWrapper,
  TableCellCustom,
  QrCodeWrapper,
  TermsAndConditionWrapper,
  TermsPointWrapper,
  VerificationWrapper,
  VerificationContentContainer,
  VerifyerWrapper,
} from 'Pages/Bill/Styles/billStyle';

import company_logo from 'public/images/company-logo.png';
import sign_sample from 'public/images/sign-sample.png';
import QRCode from 'qrcode';
import ReactToPrint from 'react-to-print';
import { AllInclusive, Print } from '@mui/icons-material';
import { useSelector } from 'react-redux';

export default function Bill() {
  const login = useSelector((state) => state.login);
  const placedOrderDetails = useSelector((state) => state.placedOrderDetails);
  const { firstName, middleNmae, lastName } = login;
  const componentRef = useRef();
  const [qrcode, setQrcode] = useState('');
  const SHIPMENT_TYPES = [
    { name: 'International', charge: 500 },
    { name: 'Outside Valley', charge: 300 },
    { name: 'Inside Valley', charge: 200 },
    { name: 'Outside-RingRoad', charge: 150 },
    { name: 'Inside- RIngRoad', charge: 100 },
  ];

  let userFullName = login
    ? `${firstName ? firstName : ''} ${middleNmae ? middleNmae : ''} ${lastName ? lastName : ''}`
    : 'Undefined';

  let { date, shippingAddress, cart, shipment } = placedOrderDetails;

  const { country, province, city, ward, tole, houseNo } = shippingAddress;

  let shipAddress = shippingAddress
    ? `Countrry: ${country ? country : ''}
    province: ${province ? province : ''}
    city: ${city ? city : ''}
    ward: ${ward ? ward : ''}
    tole: ${tole ? tole : ''}
    houseNo: ${houseNo ? houseNo : ''}`
    : 'Undefined';

  let totalQuantity = 0;
  let totalBill = 0;
  cart.products.map((product) => {
    totalQuantity += product.quantity;
    totalBill += product.quantity * product.pDetails.price;
  });

  const QrText = `Order Details of ${userFullName} \n 
   Shipping Address: ${shipAddress} \n
   Total Product: ${cart?.noOfProducts} \n
   Total Quantity: ${totalQuantity}
   Total Bill: ${cart?.totalBill}`;

  useEffect(() => {
    QRCode.toDataURL(QrText).then((data) => {
      setQrcode(data);
    });
  }, [qrcode, QrText]);
  return (
    <BillWrapper>
      <PrintBillWrapper>
        <ReactToPrint
          trigger={() => (
            <PrintButtonWrapper>
              <Print /> {' Print Invoice'}
            </PrintButtonWrapper>
          )}
          content={() => componentRef.current}
          //   onAfterPrint={() => setClicked(false)}
          //   onBeforePrint={() => setClicked(true)}
          //   onBeforeGetContent={() => setClicked(true)}
        />
      </PrintBillWrapper>
      <BillContainer
        // sx={clicked ? printStyle : null}
        // ref={clicked ? componentRef : null}
        ref={componentRef}
      >
        <HeaderWrapper>
          <SiteTitleWrapper>
            <AllInclusive />
            INFINITY SHOP
          </SiteTitleWrapper>
          <ShopDetailWrapper>
            <Typography>Registration Number: MyShop-23242546</Typography>
            <DateWrapper>
              Date: <span>{date}</span>
            </DateWrapper>
          </ShopDetailWrapper>
        </HeaderWrapper>
        <TitleWrapper>Seller Information</TitleWrapper>
        <UserDescWrapper>
          <UserDetailsWrapper>
            <ContentWrapper>
              Name: <span> ABC Private Limited.</span>
            </ContentWrapper>
            <ContentWrapper>
              Address: <span>Dhapakhel-23, Lalitpur Nepal. P.O Box: 23232</span>
            </ContentWrapper>
          </UserDetailsWrapper>
          <ContentWrapper>
            Tel: <span>01-2322324</span>
            <br />
            Fax: <span>01-2322324</span>
            <br />
            Mobile: <span>9808888909</span>
            <br />
            Email: <span>abc@gmail.com</span>
            <br />
          </ContentWrapper>
        </UserDescWrapper>
        <TitleWrapper>Buyer Information</TitleWrapper>
        <UserDescWrapper>
          <UserDetailsWrapper>
            <ContentWrapper>
              Name: <span>{userFullName}</span>
            </ContentWrapper>
            <ContentWrapper>
              Shipping Address:
              <span>{shipAddress}</span>
            </ContentWrapper>
            <ContentWrapper>
              Extra Notes: :<span></span>
            </ContentWrapper>
          </UserDetailsWrapper>
          <ContentWrapper>
            Contact Number:
            <span>9808888909, 9862601894</span>
            <br />
            Email: <span>{login.email}</span>
          </ContentWrapper>
        </UserDescWrapper>
        <TitleWrapper>Product Details</TitleWrapper>
        <ProductDetailsWrapper>
          <UserDescWrapper>
            <TableContainer>
              <Table>
                <TableHeaderWrapper>
                  <TableRow>
                    <TableCell>S.N.</TableCell>
                    <TableCell>Product#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell colSpan={3}>Description</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHeaderWrapper>
                <TableBody>
                  {cart.products.map((product, index) => {
                    return (
                      <TableRow key={product.productId}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{product.productId}</TableCell>
                        <TableCell>{product?.pDetails?.name}</TableCell>
                        <TableCell
                          colSpan={3}
                        >{`${product?.pDetails?.category} - ${product?.pDetails?.model} - ${product?.pDetails?.brand}`}</TableCell>
                        <TableCell>Rs. {product?.pDetails?.price}</TableCell>
                        <TableCell>{product.quantity} </TableCell>
                        <TableCell>Rs. {product?.pDetails?.price * product.quantity}</TableCell>
                      </TableRow>
                    );
                  })}

                  <TableRow sx={{ borderTop: 'dashed' }}>
                    <TableCell colSpan={6}></TableCell>
                    <TableCellCustom>Total: </TableCellCustom>
                    <TableCell>{totalQuantity}</TableCell>
                    <TableCell>Rs. {totalBill}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6}></TableCell>
                    <TableCellCustom>
                      Shipment Charge <br />
                      <span style={{ fontWeight: 500 }}>({shipment.type})</span>
                    </TableCellCustom>
                    <TableCell></TableCell>
                    <TableCell>
                      Rs.
                      {SHIPMENT_TYPES.map((sp) => (sp.name === shipment.type ? sp.charge : ''))}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6}></TableCell>
                    <TableCellCustom>Grand Total</TableCellCustom>
                    <TableCell></TableCell>
                    <TableCellCustom>{cart.totalBill}</TableCellCustom>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </UserDescWrapper>
        </ProductDetailsWrapper>
        <TermsAndConditionWrapper>
          <TitleWrapper>Terms And Conditions</TitleWrapper>
          <TermsPointWrapper>
            1. <span> lorem ipsum lorem ipsumlorem ipsumlorem ipsum.</span>
          </TermsPointWrapper>
          <TermsPointWrapper>
            2. <span> lorem ipsum lorem ipsumlorem ipsumlorem ipsum.</span>
          </TermsPointWrapper>
          <TermsPointWrapper>
            3. <span> lorem ipsum lorem ipsumlorem ipsumlorem ipsum.</span>
          </TermsPointWrapper>
        </TermsAndConditionWrapper>
        <VerificationWrapper>
          <QrCodeWrapper>
            <Typography>Scan Below To get Further Details</Typography>
            <img src={qrcode} alt='qr code' />
          </QrCodeWrapper>
          <VerifyerWrapper>
            <img src={sign_sample} height={'150px'} width={'auto'} alt='signature' />
            <VerificationContentContainer>
              <Typography>XYZ NAME</Typography>
              <Typography>ABC ENTERPRISES</Typography>
              <Typography>Sales Manager</Typography>
            </VerificationContentContainer>
            <img src={company_logo} height={'200px'} width={'auto'} alt='company logo' />
          </VerifyerWrapper>
        </VerificationWrapper>
      </BillContainer>
    </BillWrapper>
  );
}
