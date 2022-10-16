export const LOAD_ALL_SPOTS = "spots/LOAD_ALL";
export const LOAD_ALL_SPOTS_USER = "spots/LOAD_ALL_USER";
export const LOAD_SPOT = "spots/LOAD";
export const ADD_SPOT = "spots/ADD";
export const ADD_SPOT_IMAGE = "spots/image/ADD";
export const UPDATE_SPOT = "spots/UPDATE";
export const DELETE_SPOT = "spots/DELETE";
export const DELETE_SPOT_IMAGE = "spots/image/DELETE";

export const loadAll = (spots) => {
  return { type: LOAD_ALL_SPOTS, spots: spots };
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
