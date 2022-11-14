import React from "react";
import { Box, InputBase , IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";

import {
  LightModeOutlined,
  DarkModeOutlined,
  NotificationsOutlined,
  SettingsOutlined,
  PersonOutlined,
  Search,
} from "@mui/icons-material";

export default function Topbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <>
      <Box display={"flex"} justifyContent="space-between" p={2}>
        {/* Search  bar */}
        <Box
          display={"flex"}
          backgroundColor={colors.primary[400]}
          borderRadius={"3px"}
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <Search />
          </IconButton>
        </Box>
        {/* ICONS */}
        <Box display={"flex"}>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton>
          <IconButton>
            <NotificationsOutlined />s
          </IconButton>
          <IconButton>
            <SettingsOutlined />
          </IconButton>
          <IconButton>
            <PersonOutlined />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
