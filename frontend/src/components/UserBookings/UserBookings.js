import AllSpots from "../Spots/AllSpots";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loadBookingsThunk } from "../../store/bookings/bookingThunk";

const UserBookings = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  const bookings = useSelector((state) => state.bookings);

  useEffect(() => {
    (async () => {
      await dispatch(loadBookingsThunk());
    })();
  }, []);

  useEffect(() => {}, []);

  if (!isLoaded) return null;
};

export default UserBookings;
