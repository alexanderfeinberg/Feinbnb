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

import { objectAssign } from "../bookings/bookingReducer";

const initialState = {
  spots: {},
  cached: {},
};

const spotReducer = (state = initialState, action) => {
  console.log("ACTION ", action);
  let spots;
  switch (action.type) {
    case LOAD_ALL_SPOTS:
      console.log(" LOAD ALL STATE ", state);
      spots = { ...state };
      spots.spots = {};
      spots.cached = {};
      action.spots["Spots"].forEach((spot) => {
        spots.spots[spot.id] = spot;
        spots.cached[spot.id] = spot;
      });

      return { ...spots };
    case LOAD_SPOT:
      console.log("STATE ", state);
      spots = { ...state.spots, [action.spot.id]: action.spot };
      console.log("LOAD SPOT ", spots);
      return { ...state, ...spots };
    case LOAD_ALL_SPOTS_USER:
      // const userSpots = {};
      const userSpots = {};
      userSpots.spots = {};
      userSpots.cached = {};
      action.spots.forEach((spot) => {
        userSpots.spots[spot.id] = spot;
        userSpots.cached[spot.id] = spot;
      });

      return userSpots;
    case ADD_SPOT:
      console.log("STATE ", state);
      const addState = {};
      addState.spots = { ...state.spots, [action.spot.id]: action.spot };
      addState.cached = { ...state.cached, [action.spot.id]: action.spot };
      return { ...addState };
    case DELETE_SPOT:
      const deleteState = {};
      deleteState.spots = { ...state.spots };
      deleteState.cached = { ...state.cached };
      delete deleteState.spots[action.spot.id];
      delete deleteState.cached[action.spot.id];
      return deleteState;
    case UPDATE_SPOT:
      const updateState = {};
      updateState.spots = {};
      updateState.cached = {};
      updateState.spots = { ...state.spots, [action.spot.id]: action.spot };
      updateState.cached = { ...state.cached, [action.spot.id]: action.spot };
      return { ...updateState };

    default:
      return state;
  }
};

export default spotReducer;
