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
    default:
      return state;
  }
};

export default reviewReducer;
