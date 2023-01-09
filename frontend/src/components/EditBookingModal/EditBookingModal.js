import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { ModalContext } from "../../context/Modal";
import SpotBookingForm from "../Spots/SpotBookingForm";
import SpotPricing from "../Spots/SpotPricing";
import {
  editBookingThunk,
  deleteBookingThunk,
} from "../../store/bookings/bookingThunk";

import "./EditBookingModal.css";

const EditBookingModal = ({ booking, spot, onCloseModal }) => {
  const { showModal, setShowModal } = useContext(ModalContext);
  const [bookingData, setBookingData] = useState({
    ...booking,
  });
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setBookingData((prevState) => {
      return {
        ...prevState,
        guests: prevState.totalGuests,
        startDate: new Date(prevState.startDate),
        endDate: new Date(prevState.endDate),
      };
    });
  }, []);

  const editHandler = async () => {
    console.log("EDIT ", bookingData);
    dispatch(
      editBookingThunk({
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        totalGuests: bookingData.guests,
        totalPrice: bookingData.price,
        totalDays: bookingData.totalDays,
        id: bookingData.id,
      })
    )
      .then(() => setShowModal(false))
      .catch((e) => e.json())
      .then((e) => setErrors(e.errors ? [...e.errors] : [e.message]));
  };

  useEffect(() => {
    setErrors([]);
  }, [bookingData.startDate, bookingData.endDate, bookingData.guests]);

  return (
    <>
      {showModal === "editBooking" && (
        <Modal
          onClose={() => {
            onCloseModal(false);
            setShowModal(false);
          }}
        >
          <h3 className="edit-booking-header">Edit Booking</h3>
          <ul className="errors">
            {errors.map((err, idx) => (
              <div key={idx}>{err}</div>
            ))}
          </ul>
          <SpotBookingForm
            bookingData={bookingData}
            onBookingData={setBookingData}
          />
          <SpotPricing
            spot={spot}
            bookingData={bookingData}
            onBookingData={setBookingData}
          />
          <button onClick={editHandler}>Save Booking</button>
        </Modal>
      )}
    </>
  );
};

export default EditBookingModal;
