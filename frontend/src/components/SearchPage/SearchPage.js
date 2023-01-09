import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { removeSearch } from "../../store/search/searchAction";
import AllSpots from "../Spots/AllSpots";

const SearchPage = () => {
  const dispatch = useDispatch();

  const spots = useSelector((state) => state.spots.spots);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (spots) setIsLoaded(true);

    return () => dispatch(removeSearch());
  }, [spots]);

  if (!isLoaded) return null;

  return <AllSpots spots={spots} />;
};

export default SearchPage;
