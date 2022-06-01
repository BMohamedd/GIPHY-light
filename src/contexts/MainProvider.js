import { SearchContextProvider } from "./search/SearchContextProvider";
import { RecommendedGifsContext } from "./recommended/RecommendedGifsContext";

import React from "react";

function MainProvider({ children }) {
  return (
    <SearchContextProvider>
      <RecommendedGifsContext>{children}</RecommendedGifsContext>
    </SearchContextProvider>
  );
}

export default MainProvider;
