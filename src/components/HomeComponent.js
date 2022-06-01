import { Box, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Search from "./search/Search";
import NavigationBar from "./other/NavigationBar";

function HomeComponent() {
  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* navigation bar */}
      <NavigationBar />
      {/* search bar */}
      <Search />
      {/* search results or trending */}
      <Outlet />
      {/* footer */}
      <Typography
        variant="caption"
        align="center"
        sx={{
          marginY: "1.5em",
        }}
      >
        &copy; GIPHY light {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}

export default HomeComponent;
