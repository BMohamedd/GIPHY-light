import React, { createContext, useState } from "react";

export const searchContext = createContext();

export function SearchContextProvider({ children }) {
  const [CurrentSearchResults, changeCurrentSearchResults] = useState([]);
  // console.log(CurrentSearchResults);
  return (
    <searchContext.Provider
      value={{ CurrentSearchResults, changeCurrentSearchResults }}
    >
      {children}
    </searchContext.Provider>
  );
}
