import { csrfFetch } from "../csrf";
import {
  createBooking,
  editBooking,
  deleteBooking,
  loadBooking,
  loadBookings,
  loadBookingsById,
} from "./bookingAction";

export const createBookingThunk = (spotId, bookingData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });
  if (response.ok) {
    const booking = await response.json();
    dispatch(createBooking(booking));
    return booking;
  }
};

export const editBookingThunk = (bookingData) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingData.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });

  if (response.ok) {
    const booking = await response.json();
    dispatch(editBooking(booking));
    return booking;
  }
};

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteBooking(bookingId));
    return;
  }
};

// export const loadBookingThunk = (spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/spots/${spotId}/bookings`);
//   if(response.ok){

//   }
// };

export const loadBookingsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/current`);

  if (response.ok) {
    const bookings = await response.json();
    dispatch(loadBookings(bookings.Bookings));
    return bookings;
  }
};

export const loadBookingsByIdThunk = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/bookings`);
  if (response.ok) {
    const bookings = await response.json();
    dispatch(loadBookingsById(bookings.Bookings));
    return bookings;
  }
};
