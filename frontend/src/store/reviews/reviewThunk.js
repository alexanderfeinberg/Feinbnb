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

export const getUserReviewsThunk = (userId) => async (dispatch) => {
  const response = await csrfFetch("/api/reviews/current");
  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadUserReviews(userId, reviews));
    return reviews;
  }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const message = await response.json();
    dispatch(deleteReview(reviewId));
    return message;
  }
};
