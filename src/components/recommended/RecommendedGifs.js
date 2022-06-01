import React, { useEffect, useContext } from "react";
import { recommendedContext } from "../../contexts/recommended/RecommendedGifsContext";
import axios from "axios";
import {
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
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import ElectricBoltRoundedIcon from "@mui/icons-material/ElectricBoltRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { searchContext } from "../../contexts/search/SearchContextProvider";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

function RecommendedGifs() {
  const [isToastOpen, ChangeToastState] = React.useState(false);
  const [isDownloadToastOpen, ChangeDownloadToastState] = React.useState(false);
  const [isFailedDownloadToastOpen, ChangeFailedDownloadToastState] =
    React.useState(false);

  const navigate = useNavigate();
  const keywords = ["Gifs", `${new Date().getFullYear()}`, "Random", "vids"];

  const { CurrentRecommondations, changeCurrentRecommondations } =
    useContext(recommendedContext);
  const { CurrentSearchResults, changeCurrentSearchResults } =
    useContext(searchContext);

  useEffect(() => {
    if (CurrentSearchResults.length > 0) {
      changeCurrentSearchResults([]);
    }
    if (CurrentRecommondations.length === 0) {
      const requestUrl = `https://api.giphy.com/v1/gifs/trending?api_key=kfUZteHiVDjbHfqpNf659vZQanqrPMlR&limit=50&rating=pg-13`;
      axios
        .get(requestUrl)
        .then(({ data }) => {
          if (data.data.length === 0) {
            // redirect to a 404 page
            return console.log("404");
          }
          //   save the data in the context and redirect to search-results
          changeCurrentRecommondations(data.data);
        })
        .catch((error) => {
          // display some kind of error message to the user
        });
    }
  });
  const handleLoadMore = () => {
    const requestUrl = `https://api.giphy.com/v1/gifs/trending?api_key=kfUZteHiVDjbHfqpNf659vZQanqrPMlR&limit=50&offset=${CurrentRecommondations.length}&rating=pg-13`;
    axios
      .get(requestUrl)
      .then(({ data }) => {
        if (data.data.length === 0) {
          // redirect to a 404 page
          return navigate("/error/505");
        }
        //   save the data in the context and redirect to search-results
        changeCurrentRecommondations([...CurrentRecommondations, ...data.data]);
      })
      .catch((error) => {
        navigate("/error/505");
        // display some kind of error message to the user
      });
  };
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
      {/* meta data */}
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
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
                width: "fit-content",
                maxWidth: "70%",
              }}
              noWrap
            >
              Recommendations
            </Typography>

            <Typography>{CurrentRecommondations.length} GIFs</Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {keywords.map((value) => {
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
        {CurrentRecommondations.map((value) => {
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
                actionIcon={<ElectricBoltRoundedIcon sx={{ color: "white" }} />}
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
        onClick={() => {
          handleLoadMore();
          return ChangeToastState(true);
        }}
        sx={{
          marginY: "2em",
        }}
      >
        View More
      </Button>
      {/* view more snack bar */}
      <Snackbar
        open={isToastOpen}
        autoHideDuration={3000}
        onClose={() => ChangeToastState(false)}
      >
        <Alert
          onClose={() => ChangeToastState(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successful Request!
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

export default RecommendedGifs;
