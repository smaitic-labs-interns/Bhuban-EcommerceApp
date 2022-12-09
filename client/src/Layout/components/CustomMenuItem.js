import React from "react";
import { Link } from "@mui/material";

import {
  MenuItemWrapper,
  MenuItemContainer,
  MenuItemTitle,
  ImageWrapper,
} from "../styles/customMenuItemStyle";

export default function CustomMenuItem({ page }) {
  return (
    <MenuItemWrapper>
      <Link
        underline="none"
        href={page.href}
        sx={{ textDecoration: "none", color: "#fff" }}
      >
        <MenuItemContainer key={page.name}>
          {page.icon}
          <MenuItemTitle>{page.name}</MenuItemTitle>
          {page.image && (
            <ImageWrapper>
              <img
                src={`${process.env.REACT_APP_BACKEND_ENDPOINT}${page.image}`}
                alt={page.imageAltText}
              />
            </ImageWrapper>
          )}
        </MenuItemContainer>
      </Link>
    </MenuItemWrapper>
  );
}
