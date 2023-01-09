import AllSpots from "../Spots/AllSpots";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUserSpotsThunk } from "../../store/spots/spotThunks";

const UserSpots = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spots.spots);

  useEffect(() => {
    (async () => {
      await dispatch(getUserSpotsThunk(user));
    })();
  }, []);

  useEffect(() => {
    if (spots) setIsLoaded(true);
  }, [spots]);

  if (!isLoaded) return null;
  return <AllSpots spots={spots} />;
};

export default UserSpots;
