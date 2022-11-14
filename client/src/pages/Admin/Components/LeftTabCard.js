import { Typography } from "@mui/material";
import React, { useState } from "react";
import {
  LeftBarCardWrapper,
  LeftBarContainer,
} from "../styles/LeftTabCardStyle";
import { Home, Inventory, People } from "@mui/icons-material";

export default function LeftTabCard({ index = 1, icon, title, ...res }) {
  const selected = {
    background: "#fff",
    borderRadius: "1rem",
    color: "#000",
  };

  const [target, setTarget] = useState(1);
  return (
    <>
      <LeftBarCardWrapper {...res}>
        {icon}
        <Typography>{title}</Typography>
      </LeftBarCardWrapper>
    </>
  );
}
