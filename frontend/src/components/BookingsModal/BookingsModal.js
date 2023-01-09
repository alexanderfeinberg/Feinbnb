import { useContext, useState, useEffect } from "react";
import { MenuContext } from "../../context/MenuModal";
import { Modal } from "../../context/Modal";
import SpotCard from "../SpotCard/SpotCard";

import "./BookingsModal.css";

const BookingsModal = ({ bookings }) => {
  const { showModal, setShowModal } = useContext(MenuContext);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setErrors([]);
  }, [showModal]);

  return (
    <>
      {showModal === "bookingModal" && (
        <Modal
          onClose={() => {
            setShowModal(false);
          }}
        >
          <h3 className="bookings-header">Previous Bookings</h3>
          <ul className="errors">
            {errors.length > 0 &&
              errors.map((err, idx) => <div key={idx}>{err}</div>)}
          </ul>
          <div className="booking-list">
            {Object.values(bookings).map((booking) => (
              <SpotCard type={"BOOKING"} data={booking} onErrors={setErrors} />
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default BookingsModal;
