import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
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
} from "./Styles/billStyle";

import company_logo from "../../public/images/company-logo.png";
import sign_sample from "../../public/images/sign-sample.png";
import QRCode from "qrcode";
import ReactToPrint from "react-to-print";
import { Print } from "@mui/icons-material";
import { axios_instance } from "../../api/config/config";
import { send_mail } from "../../redux/actions/mail.actions";
import { mail } from "../../api/config/api-endpoints";
import { useDispatch, useSelector } from "react-redux";

export default function Bill() {
  const sendMail = useSelector((state) => state.sendMail);
  const cart = useSelector((state) => state.userCart);
  const dispatch = useDispatch();

  const componentRef = useRef();
  const [qrcode, setQrcode] = useState("");
  const text = "myshop.com";

  useEffect(() => {
    QRCode.toDataURL(text).then((data) => {
      setQrcode(data);
    });
  }, [qrcode]);

  const printStyle = {
    width: "100% !important",
    padding: "0 !important",
  };

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    console.log(clicked);
  }, [clicked]);

  useEffect(() => {}, []);

  // useEffect(async () => {
  //   const payload = {
  //     from: "Ecommerce App <Bill Generation",
  //     to: "bhuban.temp@gmail.com",
  //     subject: "Regarding Order Invoice",
  //     text: "",
  //     html: componentRef,
  //   };
  //   const res = await axios_instance({
  //     endpoints: mail.send,
  //     data: payload,
  //   });
  //   console.log(res);
  // }, []);

  return (
    <BillWrapper>
      <PrintBillWrapper>
        <ReactToPrint
          trigger={() => (
            <PrintButtonWrapper>
              <Print /> {" Print Invoice"}
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
          <SiteTitleWrapper>MyShop</SiteTitleWrapper>
          <ShopDetailWrapper>
            <Typography>Registration Number: MyShop-23242546</Typography>
            <DateWrapper>
              Date: <span>2022-04-22</span>
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
              Name: <span> uban Yadav.</span>
            </ContentWrapper>
            <ContentWrapper>
              Shipping Address:
              <span>Dhapakhel-23, Lalitpur Nepal. P.O Box: 23232 (Near )</span>
            </ContentWrapper>
            <ContentWrapper>
              Extra Notes: :<span></span>
            </ContentWrapper>
          </UserDetailsWrapper>
          <ContentWrapper>
            Contact Number:
            <span>9808888909, 9862601894</span>
            <br />
            Email: <span>yadav.bhuban.by@gmail.com</span>
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
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>P-343dd3</TableCell>
                    <TableCell>Radio</TableCell>
                    <TableCell colSpan={3}>
                      Dell-brand sm-232 model radio
                    </TableCell>
                    <TableCell>Rs. 600</TableCell>
                    <TableCell>5 </TableCell>
                    <TableCell>Rs. 3000</TableCell>
                  </TableRow>
                  <TableRow sx={{ borderTop: "dashed" }}>
                    <TableCell colSpan={6}></TableCell>
                    <TableCellCustom>Total: </TableCellCustom>
                    <TableCell>6</TableCell>
                    <TableCell>Rs. 3000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6}></TableCell>
                    <TableCellCustom>VAT(13%)</TableCellCustom>
                    <TableCell></TableCell>
                    <TableCell>Rs. 544</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6}></TableCell>
                    <TableCellCustom>
                      Shipment Charge <br />
                      <span style={{ fontWeight: 500 }}>
                        (Outside Ring Road)
                      </span>
                    </TableCellCustom>
                    <TableCell></TableCell>
                    <TableCell>Rs. 544</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6}></TableCell>
                    <TableCellCustom>Grand Total</TableCellCustom>
                    <TableCell></TableCell>
                    <TableCellCustom>Rs. 54450</TableCellCustom>
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
            <img src={qrcode} />
          </QrCodeWrapper>
          <VerifyerWrapper>
            <img src={sign_sample} height={"150px"} width={"auto"} />
            <VerificationContentContainer>
              <Typography>XYZ NAME</Typography>
              <Typography>ABC ENTERPRISES</Typography>
              <Typography>Sales Manager</Typography>
            </VerificationContentContainer>
            <img src={company_logo} height={"200px"} width={"auto"} />
          </VerifyerWrapper>
        </VerificationWrapper>
      </BillContainer>
    </BillWrapper>
  );
}
