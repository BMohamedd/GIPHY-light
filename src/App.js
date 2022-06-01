import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainProvider from "./contexts/MainProvider";
import HomeComponent from "./components/HomeComponent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchResults from "./components/search/SearchResults";
import RecommendedGifs from "./components/recommended/RecommendedGifs";
import About from "./components/other/About";
import Error from "./components/other/Error";
import "./App.css";

const ThemeOptions = {
  typography: {
    fontFamily: `"Josefin Sans", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
};

const theme = createTheme(ThemeOptions);

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <MainProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="*" element={<HomeComponent />}>
                <Route
                  path="search-results/:subject"
                  element={<SearchResults />}
                />
                <Route path="error/:errorCode" element={<Error />} />
                <Route path="*" element={<RecommendedGifs />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </MainProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
