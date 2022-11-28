import React from "react";
import { Link, MenuItem, Typography } from "@mui/material";

export default function CustomMenuItem({ page }) {
  return (
    <MenuItem key={page.name}>
      <Link
        underline="none"
        href={page.href}
        sx={{ textDecoration: "none", color: "#fff" }}
      >
        <Typography textAlign="center">{page.name}</Typography>
      </Link>
    </MenuItem>
  );
}
