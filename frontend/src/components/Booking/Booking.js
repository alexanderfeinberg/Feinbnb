import { useEffect, useState, useContext } from "react";
import SpotCard from "../SpotCard/SpotCard";
import BookingsModal from "../BookingsModal/BookingsModal";
import { MenuContext } from "../../context/MenuModal";

const Bookings = ({ bookings }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [previewBookings, setPreviewBookings] = useState({});
  const [errors, setErrors] = useState([]);
  const [timer, setTimer] = useState();

  const { showModal, setShowModal } = useContext(MenuContext);

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
    } else {
      setPreviewBookings({ ...bookings });
    }
  }, [bookings]);

  useEffect(() => {
    console.log("TIMER USE EFFECT ", timer);
    if (errors.length) {
      setTimer(setTimeout(() => setErrors([]), 7000));
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [errors]);

  useEffect(() => {
    if (Object.values(previewBookings).length) {
      console.log("PREV BOOKINGS ", previewBookings);
      setIsLoaded(true);
    }
  }, [previewBookings]);

  if (!isLoaded) return null;

  return (
    <div className="bookings-container">
      <BookingsModal bookings={bookings} />
      <div className="errors">
        {errors.length > 0 &&
          errors.map((err, idx) => <div key={idx}>{err}</div>)}
      </div>
      <h4>Trips</h4>
      {Object.values(previewBookings).map((booking) => (
        <div className="individual-booking" key={booking.id}>
          <SpotCard type={"BOOKING"} data={booking} onErrors={setErrors} />
        </div>
      ))}
      <button
        className="expand-bookings-btn"
        onClick={() => setShowModal("bookingModal")}
      >
        See all ({Object.keys(bookings).length})
      </button>
    </div>
  );
};

export default Bookings;
