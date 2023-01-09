import { LOAD_SEARCH, DELETE_SEARCH } from "./searchAction";
let initialState = "";

export default function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SEARCH:
      const loadState = action.searchParams;
      return loadState;
    case DELETE_SEARCH:
      const deleteState = "";
      return deleteState;
    default:
      return state;
  }
}
