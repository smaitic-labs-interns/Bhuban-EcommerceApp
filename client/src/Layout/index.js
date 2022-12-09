import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "Layout/components/Navbar";
import Footer from "Layout/components/Footer";
import {
  LayoutWrapper,
  NavbarContainer,
  BodyContainer,
  FooterContainer,
} from "Layout/styles/layoutStyle";

export default function Layout() {
  return (
    <>
      <LayoutWrapper>
        <NavbarContainer>
          <Navbar />
        </NavbarContainer>
        <BodyContainer>
          <Outlet /> {/* fitting contents inside Layout */}
        </BodyContainer>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </LayoutWrapper>
    </>
  );
}
