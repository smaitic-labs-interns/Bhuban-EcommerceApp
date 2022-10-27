import React from "react";
import {
  ProfilLeftWrapper,
  ProfilUserWrapper,
  ProfilTypeWrapper,
  ManageAccountWrapper,
  ManageAccountContentWrapper,
  OrderWrapper,
  OrderContentWrapper,
  ReviewWrapper,
  WishlistWrapper,
  SellOnDarazWrapper,
} from "../styles/LeftWrapperStyle";
import { Box, Link, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";

export default function LeftWrapper() {
  return (
    <>
      <ProfilLeftWrapper>
        <ProfilUserWrapper>
          <Typography sx={{ fontSize: "12px", lineHeight: "22px" }}>
            Hello, Bhuban Yadav
          </Typography>
          <ProfilTypeWrapper>
            <Typography
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                fontSize: "12px",
                lineHeight: "22px",
              }}>
              <Check
                sx={{
                  color: "white",
                  padding: "0 !important",
                  marginRight: "4px",
                  fontSize: "12px",
                }}
              />
              Verified Account
            </Typography>
          </ProfilTypeWrapper>
        </ProfilUserWrapper>
        <ManageAccountWrapper>
          <Typography sx={{ fontSize: "16px", lineHeight: "24px" }}>
            Manage My Account
          </Typography>
        </ManageAccountWrapper>
        <ManageAccountContentWrapper>
          <Link underline="none">
            <Typography>My Profile</Typography>
          </Link>
          <Link underline="none">
            <Typography>Address Book</Typography>
          </Link>
          <Link underline="none">
            <Typography>My Payment Options</Typography>
          </Link>
          <Link underline="none">
            <Typography>Vouchers</Typography>
          </Link>
        </ManageAccountContentWrapper>
        <OrderWrapper>
          <Typography sx={{ fontSize: "16px", lineHeight: "24px" }}>
            My Orders
          </Typography>
        </OrderWrapper>
        <OrderContentWrapper>
          <Link underline="none">
            <Typography>My Returns</Typography>
          </Link>
          <Link underline="none">
            <Typography>My Cancellations</Typography>
          </Link>
        </OrderContentWrapper>
        <ReviewWrapper>
          <Typography sx={{ fontSize: "16px", lineHeight: "24px" }}>
            My Reviews
          </Typography>
        </ReviewWrapper>
        <WishlistWrapper>
          <Typography sx={{ fontSize: "16px", lineHeight: "24px" }}>
            My Wishlist & Followed Stores
          </Typography>
        </WishlistWrapper>
        <SellOnDarazWrapper>
          <Typography sx={{ fontSize: "16px", lineHeight: "24px" }}>
            Sell On Daraz
          </Typography>
        </SellOnDarazWrapper>
      </ProfilLeftWrapper>
    </>
  );
}
