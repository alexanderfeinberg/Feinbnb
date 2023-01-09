export const LOAD_SEARCH = "search/LOAD";
export const DELETE_SEARCH = "search/DELETE";

export const loadSearch = (searchParams) => {
  return { type: LOAD_SEARCH, searchParams };
};

export const removeSearch = () => {
  return { type: DELETE_SEARCH };
};
