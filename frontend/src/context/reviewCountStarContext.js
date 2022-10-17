import React, { createContext, useContext, useState } from "react";

export const reviewCountStarContext = createContext();

export const useReviewContext = () => useContext(reviewCountStarContext);

function ReviewContextProvider({ children }) {
  const [numReviews, setNumReviews] = useState(0);
  const [starRating, setStarRating] = useState(0);

  return (
    <reviewCountStarContext.Provider
      value={{ numReviews, setNumReviews, starRating, setStarRating }}
    >
      {children}
    </reviewCountStarContext.Provider>
  );
}

export default ReviewContextProvider;
