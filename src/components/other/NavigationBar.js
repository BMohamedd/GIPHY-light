import React from "react";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Paper,
  Tooltip,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import giphyLogo from "../../assets/giphy-Logo.gif";
import GitHubIcon from "@mui/icons-material/GitHub";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhoneEnabledRoundedIcon from "@mui/icons-material/PhoneEnabledRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.between("xs", 370)]: {
      justifyContent: "center",
    },
  },
}));

function NavigationBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <img src={giphyLogo} width="50px" alt="animated logo" />
          <Stack direction="row" alignItems="center">
            <Typography sx={{ fontWeight: "bolder" }} variant="h5">
              GIHPY{" "}
            </Typography>
            <Typography sx={{ color: "gray", fontWeight: "bold" }}>
              {" "}
              lite
            </Typography>
          </Stack>
        </Box>
      </Grid>
      <Grid item>
        <Stack direction="row" spacing={2}>
          {/* github icon */}
          <Tooltip title="View Sourse Code">
            <a
              href="https://github.com/BMohamedd/GIPHY-light"
              target="_blank"
              rel="noreferrer"
            >
              <Paper>
                <IconButton>
                  <GitHubIcon sx={{ color: "purple" }} />
                </IconButton>
              </Paper>
            </a>
          </Tooltip>
          {/* About me icon */}
          <Tooltip title="About me">
            <Paper>
              <IconButton onClick={() => navigate("/about")}>
                <PersonRoundedIcon />
              </IconButton>
            </Paper>
          </Tooltip>
          {/* Contact icon */}
          <Tooltip title="Contact Me">
            <a
              href="https://www.instagram.com/belhadjm__/"
              target="_blank"
              rel="noreferrer"
            >
              <Paper>
                <IconButton>
                  <PhoneEnabledRoundedIcon />
                </IconButton>
              </Paper>
            </a>
          </Tooltip>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default NavigationBar;
