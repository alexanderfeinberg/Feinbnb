import {
  LOAD_SPOT_REVIEWS,
  LOAD_USER_REVIEWS,
  ADD_REVIEW,
  DELETE_REVIEW,
  UPDATE_REVIEW,
} from "./reviewAction";

const initialState = {
  reviews: {},
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOT_REVIEWS:
      console.log("REVIEWS ", action);
      return { ...state, ...action.reviews };
    case LOAD_USER_REVIEWS:
      console.log("LOAD USER STATE ", state);
      const reviews = {};
      const userReviews = action.reviews["Reviews"];
      userReviews.forEach((review) => (reviews[review.id] = review));
      console.log("REVIEWSSS ", reviews);
      return { ...state, ...reviews };
    case DELETE_REVIEW:
      console.log("STATE ", state);
      const newState = Object.assign({}, state);
      delete newState[action.reviewId];
      return newState;

    default:
      return state;
  }
};

export default reviewReducer;
