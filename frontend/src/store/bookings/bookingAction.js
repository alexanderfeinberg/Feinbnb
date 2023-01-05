export const CREATE_BOOKING = "bookings/CREATE_BOOKING";
export const EDIT_BOOKING = "bookings/EDIT_BOOKING";
export const DELETE_BOOKING = "bookings/DELETE_BOOKING";
export const LOAD_BOOKING = "bookings/LOAD_BOOKING";
export const LOAD_BOOKINGS = "bookings/LOAD_BOOKINGS";

export const LOAD_BOOKINGS_BY_USER_ID = "bookings/LOAD_BOOKINGS_BY_USER_ID";

export const createBooking = (booking) => {
  return { type: CREATE_BOOKING, booking };
};

export const editBooking = (booking) => {
  return { type: EDIT_BOOKING, booking };
};

export const deleteBooking = (bookingId) => {
  return { type: DELETE_BOOKING, bookingId };
};

export const loadBooking = (booking) => {
  return { type: LOAD_BOOKING, booking };
};

export const loadBookings = (bookings) => {
  return { type: LOAD_BOOKINGS, bookings };
};

export const loadBookingsById = (bookings) => {
  return { type: LOAD_BOOKINGS_BY_USER_ID, bookings };
};
