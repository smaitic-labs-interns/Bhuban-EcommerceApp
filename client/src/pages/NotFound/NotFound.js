import { Box } from "@mui/system";
import React from "react";

import notFoundImg from "../../public/images/404.jpg";

export default function NotFound() {
  return (
    <>
      <Box sx={{ justifyContent: "center", alignItems: "center" }}>
        <img src={notFoundImg} alt="Not Found" />
        <Box>{/* 404 Not Found ! */}</Box>
      </Box>
    </>
  );
}
