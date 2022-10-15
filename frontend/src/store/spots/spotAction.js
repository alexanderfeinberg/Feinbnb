const LOAD_ALL_SPOTS = "spots/LOAD_ALL";
const LOAD_ALL_SPOTS_USER = "spots/LOAD_ALL_USER";
const LOAD_SPOT = "spots/LOAD";
const ADD_SPOT = "spots/ADD";
const ADD_SPOT_IMAGE = "spots/image/ADD";
const UPDATE_SPOT = "spots/UPDATE";
const DELETE_SPOT = "spots/DELETE";
const DELETE_SPOT_IMAGE = "spots/image/DELETE";

export const loadAll = () => {
  return { type: LOAD_ALL_SPOTS };
};

export const loadAllUser = (user) => {
  return { type: LOAD_ALL_SPOTS_USER, user: user };
};

export const loadSpot = (spot) => {
  return { type: LOAD_SPOT, spot: spot };
};

export const addSpot = (spot) => {
  return { type: ADD_SPOT, spot: spot };
};

export const addSpotImage = (image, spot) => {
  return { type: ADD_SPOT_IMAGE, image: image, spot: spot };
};

export const updateSpot = (spot) => {
  return { type: UPDATE_SPOT, spot: spot };
};

export const deleteSpot = (spot) => {
  return { type: DELETE_SPOT, spot: spot };
};
export const deleteSpotImage = (image, spot) => {
  return { type: DELETE_SPOT_IMAGE, image: image, spot: spot };
};
