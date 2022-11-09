import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <>
      <Box>
        <Box sx={{ position: "sticky" }}>
          <Navbar></Navbar>
        </Box>
        <Box
          sx={{
            padding: "0",
            border: "solid #1976D2 15px",
            borderTop: "none",
            borderBottom: "none",
            position: "relative",
            height: "77.7vh",
            overflow: "scroll",
            // whiteSpace: "nowrap",
            scrollbarWidth: "none", //Firefox
            "&::-webkit-scrollbar": {
              display: "none", //Chrome, Safari and Opera
              MsOverflowStyle: "none", // IE, Edge
            },
          }}>
          <Outlet />
        </Box>
        <Box
          sx={{
            border: "solid #1976D2 15px",
            position: "sticky",
          }}>
          <Footer></Footer>
        </Box>
      </Box>
    </>
  );
}
