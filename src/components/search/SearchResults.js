import {
  IconButton,
  Stack,
  Typography,
  Divider,
  Paper,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Button,
  Snackbar,
  Alert,
  Grid,
  Box,
  Tooltip,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import ElectricBoltRoundedIcon from "@mui/icons-material/ElectricBoltRounded";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { recommendedContext } from "../../contexts/recommended/RecommendedGifsContext";
import { searchContext } from "../../contexts/search/SearchContextProvider";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

function SearchResults() {
  const { subject } = useParams();

  const [isToastOpen, ChangeToastState] = React.useState(false);
  const [isDownloadToastOpen, ChangeDownloadToastState] = React.useState(false);
  const [isFailedDownloadToastOpen, ChangeFailedDownloadToastState] =
    React.useState(false);

  const { CurrentRecommondations, changeCurrentRecommondations } =
    React.useContext(recommendedContext);
  const { CurrentSearchResults } = useContext(searchContext);

  React.useEffect(() => {
    if (CurrentRecommondations.length > 0) {
      changeCurrentRecommondations([]);
    }
  });
  const DownloadGif = (e) => {
    fetch(e.target.src)
      .then((response) => response.blob())
      .then((blobObj) => {
        const url = window.URL.createObjectURL(blobObj);
        const anchor = document.createElement("a");
        anchor.style.display = "none";
        anchor.href = url;
        anchor.download = e.target.alt;
        document.body.appendChild(anchor);
        anchor.click();
        ChangeDownloadToastState(true);
        window.URL.revokeObjectURL(url);
      })
      .catch(() => isFailedDownloadToastOpen(true));
  };
  return (
    <Stack
      sx={{
        marginTop: "1em",
        width: "90%",
      }}
      spacing={5}
    >
      {/* results header */}
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Stack
            direction="row"
            sx={{ width: "100%" }}
            divider={<Divider orientation="vertical" flexItem />}
            alignItems="center"
            spacing={2}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bolder",
                maxWidth: "80%",
              }}
              noWrap
            >
              {subject}
            </Typography>
            <Typography>{CurrentSearchResults.length} GIFs</Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {subject.split(" ").map((value) => {
              return (
                <Paper sx={{ padding: "5px" }} key={uuidv4()}>
                  <Typography variant="button">#{value}</Typography>
                </Paper>
              );
            })}
          </Box>
        </Grid>
      </Grid>
      {/* results */}
      <ImageList
        variant="quilted"
        cols={4}
        sx={{
          width: "100%",
        }}
      >
        {CurrentSearchResults.map((value) => {
          return (
            <ImageListItem
              key={value.id}
              sx={{
                cursor: "pointer",
              }}
            >
              <img
                src={value.images.downsized.url}
                alt={
                  `GIPHY lite - ${value.title}` ||
                  `GIPHY lite - ${new Date().toLocaleDateString()}.`
                }
                id={value.id}
                onClick={DownloadGif}
              />
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                    "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                }}
                title={value.title}
                position="top"
                actionIcon={
                  <Tooltip title="View On Giphy">
                    <IconButton sx={{ color: "white" }}>
                      <ElectricBoltRoundedIcon />
                    </IconButton>
                  </Tooltip>
                }
                actionPosition="left"
              ></ImageListItemBar>
            </ImageListItem>
          );
        })}
      </ImageList>
      {/* view more button */}
      <Button
        variant="outlined"
        startIcon={<AddRoundedIcon />}
        onClick={() => ChangeToastState(true)}
        sx={{
          marginY: "2em",
        }}
      >
        View More
      </Button>
      {/* snack bar */}
      <Snackbar
        open={isToastOpen}
        autoHideDuration={3000}
        onClose={() => ChangeToastState(false)}
      >
        <Alert
          onClose={() => ChangeToastState(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Members Can't Perfome This Action
        </Alert>
      </Snackbar>
      {/* success download snackbar */}
      <Snackbar
        open={isDownloadToastOpen}
        autoHideDuration={3000}
        onClose={() => ChangeDownloadToastState(false)}
      >
        <Alert
          onClose={() => ChangeDownloadToastState(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successful Download!
        </Alert>
      </Snackbar>
      {/* failure download snackbar */}
      <Snackbar
        open={isFailedDownloadToastOpen}
        autoHideDuration={3000}
        onClose={() => ChangeFailedDownloadToastState(false)}
      >
        <Alert
          onClose={() => ChangeFailedDownloadToastState(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Sorry, The download was UnSuccessful!
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default SearchResults;
