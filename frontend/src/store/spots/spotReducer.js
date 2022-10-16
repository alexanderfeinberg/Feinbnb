import {
  LOAD_ALL_SPOTS,
  LOAD_ALL_SPOTS_USER,
  LOAD_SPOT,
  ADD_SPOT,
  ADD_SPOT_IMAGE,
  UPDATE_SPOT,
  DELETE_SPOT,
  DELETE_SPOT_IMAGE,
} from "./spotAction";
const initialState = {
  spots: {},
};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_SPOTS:
      let spots = {};
      action.spots["Spots"].forEach((spot) => (spots[spot.id] = spot));
      console.log("SPOTS ", spots);
      return { ...state, ...spots };
    default:
      return state;
  }
};

export default spotReducer;
