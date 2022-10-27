import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { ProfileWrapper, ProfilRightWrapper } from "./styles/profileStyles";
import LeftWrapper from "./Components/LeftWrapper";
import RightWrapper from "./Components/RightWrapper";
export default function index() {
  return (
    <>
      <ProfileWrapper>
        <LeftWrapper />
        <RightWrapper />
      </ProfileWrapper>
    </>
  );
}
