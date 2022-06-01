import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { Box } from "@mui/system";
import NavigationBar from "./NavigationBar";

function About() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <NavigationBar />
      <Stack sx={{ width: "80%", marginTop: "3em" }}>
        {/* about me */}
        <Typography
          variant="h4"
          sx={{
            fontSize: "bold",
          }}
          textAlign="center"
        >
          About me
        </Typography>
        <Typography textAlign="center">
          Hey 👋, My name is Mohamed, And I have Built this website From Scratch
          Using Lots Of Cool Stuff... If you like what you see Here or would
          like to work together{" "}
          <a
            style={{
              textDecoration: "none",
              borderBottom: "1px solid purple",
              color: "purple",
              fontWeight: "bolder",
            }}
            href="https://www.instagram.com/belhadjm__/"
            target="_blank"
            rel="noreferrer"
          >
            Click Here!
          </a>
        </Typography>
        {/* about this website */}
        <Typography variant="h4" sx={{ marginTop: "1em" }} textAlign="center">
          About this Website:
        </Typography>
        <Typography textAlign="center">
          This website was Created for fun and it isn't, nor it will be used for
          commercial purposes.
        </Typography>
        {/* faqs */}
        <Typography variant="h4" sx={{ marginTop: "1em" }} textAlign="center">
          FAQs:
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
            <Typography>For how long have you been Programming?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              As of 2022 i have 2 years of programming experience.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
            <Typography>What type Of websites can you make?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              I blieve that i can make any type of website!
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
            <Typography>What is Your main programming language?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>My main programming language is JavaScript</Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Box>
  );
}

export default About;
