import {
  CREATE_BOOKING,
  EDIT_BOOKING,
  DELETE_BOOKING,
  LOAD_BOOKING,
  LOAD_BOOKINGS,
  LOAD_BOOKINGS_BY_USER_ID,
} from "./bookingAction";

let initialState = {
  bookingList: {},
  singleBooking: {},
};

export const objectAssign = (state, ...subStates) => {
  const newState = Object.assign({}, state);
  for (let sub of subStates) {
    newState[sub] = Object.assign({}, state[sub]);
  }
  return newState;
};

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_BOOKING:
      const createBooking = objectAssign(state, "bookingList");
      createBooking.singleBooking = action.booking;
      createBooking.bookingList[action.booking.id] = action.booking;
      return createBooking;

    case LOAD_BOOKINGS:
      console.log("ACTIONN ", action);
      const loadState = objectAssign(state);
      loadState.bookingList = {};
      action.bookings.forEach((booking) => {
        loadState.bookingList[booking.id] = booking;
      });
      return loadState;
    case LOAD_BOOKINGS_BY_USER_ID:
      const loadById = objectAssign(state);
      loadById.bookingList = {};
      action.bookings.forEach((booking) => {
        loadById.bookingList[booking.id] = booking;
      });
      return loadById;
    default:
      return state;
  }
}
