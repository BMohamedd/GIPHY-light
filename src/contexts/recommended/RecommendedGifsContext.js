import React, { createContext, useState } from "react";

export const recommendedContext = createContext();

export function RecommendedGifsContext({ children }) {
  const [CurrentRecommondations, changeCurrentRecommondations] = useState([]);
  // console.log(CurrentRecommondations);
  return (
    <recommendedContext.Provider
      value={{ CurrentRecommondations, changeCurrentRecommondations }}
    >
      {children}
    </recommendedContext.Provider>
  );
}
