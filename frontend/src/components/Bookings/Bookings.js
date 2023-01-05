// import "./Bookings.css";
import { useEffect, useState } from "react";
import SpotCard from "../SpotCard/SpotCard";

const Bookings = ({ bookings }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [previewBookings, setPreviewBookings] = useState({});
  useEffect(() => {
    const length = Object.values(bookings).length;
    const newBookings = {};
    if (length > 3) {
      for (let key of Object.keys(bookings)) {
        const booking = bookings[key];
        console.log("LEN ", Object.values(previewBookings).length);
        if (Object.keys(newBookings).length >= 3) {
          setPreviewBookings({ ...newBookings });
          return;
        }
        newBookings[booking.id] = booking;
      }
    }
  }, [bookings]);

  useEffect(() => {
    if (Object.values(previewBookings).length) {
      console.log("PREV BOOKINGS ", previewBookings);
      setIsLoaded(true);
    }
  }, [previewBookings]);

  if (!isLoaded) return null;

  return (
    <div className="bookings-container">
      <h4>Trips</h4>
      {Object.values(previewBookings).map((booking) => (
        <div className="individual-booking" key={booking.id}>
          <SpotCard type={"BOOKING"} data={booking} />
        </div>
      ))}
    </div>
  );
};

export default Bookings;
