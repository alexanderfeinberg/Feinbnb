export const LOAD_SPOT_REVIEWS = "spot/reviews/LOAD_ALL";
export const LOAD_USER_REVIEWS = "reviews/LOAD_USER";
export const ADD_REVIEW = "spot/reviews/ADD";
export const DELETE_REVIEW = "spot/reviews/DELETE";
export const UPDATE_REVIEW = "spot/reviews/UPDATE";

export const loadSpotReviews = (reviews) => {
  return { type: LOAD_SPOT_REVIEWS, reviews: reviews };
};

export const loadUserReviews = (userId, reviews) => {
  return { type: LOAD_USER_REVIEWS, userId: userId, reviews: reviews };
};

export const addReview = (spot, review) => {
  return { type: ADD_REVIEW, spot: spot, review: review };
};

export const deleteReview = (reviewId) => {
  return { type: DELETE_REVIEW, reviewId: reviewId };
};

export const updateReview = (spot, review) => {
  return { type: UPDATE_REVIEW, spot: spot, review: review };
};
