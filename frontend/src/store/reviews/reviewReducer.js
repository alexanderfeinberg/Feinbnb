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
      const combineReviews = Object.assign({}, state);
      combineReviews[action.spotId] = {};
      action.reviews.forEach(
        (review) => (combineReviews[action.spotId][review.id] = review)
      );
      console.log("COMBINE REVIEWS ", combineReviews);
      return combineReviews;

    case LOAD_USER_REVIEWS:
      const reviews = { ...state.reviews };
      const userReviews = action.reviews["Reviews"];
      userReviews.forEach((review) => (reviews[review.id] = review));

      return { ...reviews };
    case DELETE_REVIEW:
      console.log("STATE ", state);
      const newState = Object.assign({}, state);
      delete newState[action.reviewId];
      return newState;
    case ADD_REVIEW:
      console.log(" ADD REVIEW STATE ", state);
      const addState = Object.assign({}, state);
      addState[action.spotId][action.review.id] = action.review;
      return addState;
    default:
      return state;
  }
};

export default reviewReducer;
