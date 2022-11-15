import React from "react";
import {
  ProfilRightWrapper,
  RightTitleWrapper,
  CardWrapper,
  LeftCardWrapper,
  LeftCardContentWrapper,
  LeftCardContentUpperWrapper,
  RightCardWrapper,
  RightCardLeftContentWrapper,
  RightCardRightContentWrapper,
  LowerWrapper,
} from "../styles/RightWrapperStyle";
import { Box, Link, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";
import RightTable from "./RightTable";

export default function RightWrapper({ userDetails }) {
  const {
    userId,
    firstName,
    middleName,
    lastName,
    address,
    email,
    isLogined,
    loading,
    message,
  } = userDetails;
  const fullName = firstName + " " + middleName + " " + lastName;
  return (
    <>
      <ProfilRightWrapper>
        <RightTitleWrapper>
          <Typography
            sx={{ fontSize: "22px", lineHeight: "60px" }}
            fontWeight={400}>
            Manage My Account
          </Typography>
        </RightTitleWrapper>

        <CardWrapper>
          <LeftCardWrapper>
            <LeftCardContentWrapper>
              <LeftCardContentUpperWrapper>
                <Box>
                  <Typography>Personal Profile | </Typography>
                </Box>
                <Box>
                  <Link underline="none">
                    <Typography>&nbsp; Edit</Typography>
                  </Link>
                </Box>
              </LeftCardContentUpperWrapper>
              <Box>
                <Typography>{fullName}</Typography>
              </Box>
              <Box>
                <Typography>{email}</Typography>
              </Box>
              <Box sx={{ marginTop: "20px" }}>
                <Link underline="none" sx={{ fontSize: "14px" }}>
                  <Typography>Subscribe to our Newsletter</Typography>
                </Link>
              </Box>
            </LeftCardContentWrapper>
          </LeftCardWrapper>
          <RightCardWrapper>
            <RightCardLeftContentWrapper>
              <Box sx={{ display: "flex" }}>
                <Typography>Address Book | </Typography>
                <Link underline="none">
                  <Typography>&nbsp;EDIT</Typography>
                </Link>
              </Box>

              <Box>
                <Typography sx={{ fontSize: "12px", color: "#757575" }}>
                  DEFAULT SHIPPING ADDRESS
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "14px", fontWeight: "700" }}>
                  {fullName}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px" }}>{address}</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px" }}>
                  Bagmati Province - Lalitpur Outside Ring Road - Lalitpur
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px" }}>
                  - Dhapakhel Area
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px" }}>
                  (+977) 9808888909
                </Typography>
              </Box>
            </RightCardLeftContentWrapper>
            <RightCardRightContentWrapper>
              <Box>
                <Typography sx={{ fontSize: "12px", color: "#757575" }}>
                  DEFAULT BILLING ADDRESS
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "14px", fontWeight: "700" }}>
                  {fullName}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px" }}>
                  BANGLAMUKHI TOLE ,HOUSE no:-38
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px" }}>
                  Bagmati Province - Lalitpur Outside Ring Road - Lalitpur -
                  Dhapakhel Area
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px" }}>
                  - Dhapakhel Area
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px" }}>
                  (+977) 9808888909
                </Typography>
              </Box>
            </RightCardRightContentWrapper>
          </RightCardWrapper>
        </CardWrapper>

        <LowerWrapper>
          <RightTable />
        </LowerWrapper>
      </ProfilRightWrapper>
    </>
  );
}