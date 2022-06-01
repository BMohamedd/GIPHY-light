import React, { useContext } from "react";
import InputBase from "@mui/material/InputBase";
import { Paper, Tooltip } from "@mui/material";
import { Divider, IconButton } from "@mui/material";
import ElectricBoltRoundedIcon from "@mui/icons-material/ElectricBoltRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { searchContext } from "../../contexts/search/SearchContextProvider";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Search() {
  const [searchInput, changesearchInput] = React.useState("");
  const { CurrentSearchResults, changeCurrentSearchResults } =
    useContext(searchContext);
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchInput === "") {
      console.log("please fill the search input");
    } else {
      const requestUrl = `http://api.giphy.com/v1/gifs/search?api_key=kfUZteHiVDjbHfqpNf659vZQanqrPMlR&q=${searchInput}&rating=pg-13`;
      axios
        .get(requestUrl)
        .then(({ data }) => {
          if (data.data.length === 0) {
            // redirect to a 404 page
            return navigate("/error/404");
          }
          // save the data in the context and redirect to search-results
          changeCurrentSearchResults(data.data);
          navigate(`search-results/${searchInput}`);
        })
        .catch((error) => {
          // display some kind of error message to the user
          changeCurrentSearchResults([]);
          navigate("/error/505");
        });
    }
  };
  //   handleChange is in charge of capping the search input at 50 and updating the searchInput state
  const handleChange = (e) => {
    if (e.target.value.split("").length < 50) {
      changesearchInput(e.target.value);
    }
  };
  return (
    <Paper
      elevation={5}
      sx={{
        marginTop: ".5em",
        height: "50px",
        width: "90%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: "10px",
      }}
    >
      <ElectricBoltRoundedIcon />
      <InputBase
        placeholder="search giphy"
        value={searchInput}
        onChange={handleChange}
        sx={{
          width: "80%",
        }}
      ></InputBase>
      <Divider orientation="vertical" />
      <Tooltip title="Search!">
        <IconButton onClick={handleSearch}>
          <SearchRoundedIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}

export default Search;
