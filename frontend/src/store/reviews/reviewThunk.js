import {
  loadSpotReviews,
  loadUserReviews,
  addReview,
  deleteReview,
  updateReview,
} from "./reviewAction";
import { csrfFetch } from "../csrf";

export const getSpotReviewsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadSpotReviews(reviews["Reviews"]));
    return reviews;
  }
};
