import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import cubeAnimation from "../../assets/4D-cube.gif";

const errorMessage = {
  404: "Sorry, I couln't find any GIFs 😔 [ERROR_CODE:404]",
  505: "Error, But it's not Your fault its Mine... come back again later 😳 [ERROR_CODE:505]",
};

function Error() {
  const { errorCode } = useParams();

  return (
    <Box
      sx={{
        width: "90%",
        marginY: "5em",
        display: "flex",
        direction: "column",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={cubeAnimation}
        alt="4D cube animation."
        style={{ maxWidth: "100%" }}
      />
      <Typography variant="h5" textAlign="center">
        {errorMessage[errorCode] || "Error, Sorry about that 😔"}
      </Typography>
    </Box>
  );
}

export default Error;
