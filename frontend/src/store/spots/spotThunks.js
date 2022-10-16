import {
  loadAll,
  loadAllUser,
  loadSpot,
  addSpot,
  updateSpot,
  deleteSpot,
} from "./spotAction";

export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  if (response.ok) {
    const spots = await response.json();
    dispatch(loadAll());
    return spots;
  }
};

export const getUserSpotsThunk = (user) => async (dispatch) => {
  const response = await fetch("/api/spots/current");
  if (response.ok) {
    const spots = await response.json();
    dispatch(loadAllUser(user));
    return spots;
  }
};

export const getSpotThunk = (spot) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spot.id}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(loadSpot(spot));
    return spot;
  }
};

export const addSpotThunk = (spot) => async (dispatch) => {
  const response = await fetch("/api/spots", {
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
  const response = await fetch(`/api/spots/${spot.id}`, {
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
  const response = await fetch(`/api/spots/${spot.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const message = await response.json();
    dispatch(deleteSpot(spot));
    return message;
  }
};
