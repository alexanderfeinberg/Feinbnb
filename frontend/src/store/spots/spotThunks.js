import {
  loadAll,
  loadAllUser,
  loadSpot,
  addSpot,
  updateSpot,
  deleteSpot,
} from "./spotAction";

import { csrfFetch } from "../csrf";

export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const spots = await response.json();
    console.log("BACKEND SPOTS ", spots);

    dispatch(loadAll(spots));
    return spots;
  }
};

export const getUserSpotsThunk = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");
  if (response.ok) {
    const spots = await response.json();
    dispatch(loadAllUser(spots));
    return spots;
  }
};

export const getSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();

    dispatch(loadSpot(spot));
    return spot;
  }
};

export const addSpotThunk = (spot) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const spot = await response.json();
    dispatch(addSpot(spot));
    return spot;
  }
};

export const updateSpotThunk = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const spot = await response.json();
    dispatch(updateSpot(spot));
    return spot;
  }
};

export const deleteSpotThunk = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const message = await response.json();
    dispatch(deleteSpot(spot));
    return message;
  }
};

export const addImageThunk = async (imgUrl, spotId) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: JSON.stringify({ url: imgUrl, preview: true }),
  });
  const data = await response.json();
  return;
};
