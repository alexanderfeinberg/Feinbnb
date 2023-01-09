import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllSpotsThunk } from "../../store/spots/spotThunks";
import AllSpots from "../Spots/AllSpots";

const Homepage = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const spots = useSelector((state) => state.spots.spots);

  useEffect(() => {
    (async () => {
      await dispatch(getAllSpotsThunk());
    })();
  }, []);

  useEffect(() => {
    if (spots) if (spots) setIsLoaded(true);
  }, [spots]);

  if (!isLoaded) return null;

  return <AllSpots spots={spots} />;
};

export default Homepage;
