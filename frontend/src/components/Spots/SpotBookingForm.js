import "./SpotBookingForm.css";
import { useEffect, useState } from "react";
import { convertDate } from "../../store/csrf";

const SpotBookingForm = ({ bookingData, onBookingData }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [localStartDate, setLocalStartDate] = useState(bookingData.startDate);
  const [localEndDate, setLocalEndDate] = useState(bookingData.endDate);

  console.log("BOOKING DATA IN FORM ", bookingData);

  const convertStrToDate = (str) => {
    const dateParams = str.split("-");
    console.log(
      "NEW DATE 1111 ",
      new Date(dateParams[0], dateParams[1] - 1, dateParams[2] - 1)
    );
    return new Date(dateParams[0], dateParams[1] - 1, dateParams[2] - 1);
  };

  const startDateHandler = (e) => {
    console.log("START DATER HANDLE ", e.target.value);
    onBookingData((prevState) => {
      return { ...prevState, startDate: convertStrToDate(e.target.value) };
    });
  };

  const endDateHandler = (e) => {
    onBookingData((prevState) => {
      return { ...prevState, endDate: convertStrToDate(e.target.value) };
    });
  };

  const guestHandler = (e) => {
    onBookingData((prevState) => {
      return { ...prevState, guests: e.target.value };
    });
  };

  useEffect(() => {
    if (!bookingData.days) {
      bookingData.days =
        bookingData.endDate.getDate() - bookingData.startDate.getDate();
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const startDate = new Date(bookingData.startDate);
    const endDate = new Date(bookingData.endDate);
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
    bookingData.days = endDate.getDate() - startDate.getDate();
    if (startDate.getDate() < endDate.getDate())
      onBookingData((prevState) => {
        return { ...prevState, isValid: true };
      });
  }, [bookingData.startDate, bookingData.endDate]);

  if (!isLoaded) return null;

  return (
    <form class="booking-form">
      <div className="booking-inputs">
        <div className="booking-check-dates">
          <div className="booking-check-in">
            <label htmlFor="check-in-date">CHECK-IN</label>
            <input
              type="date"
              name="check-in-date"
              value={convertDate(bookingData.startDate)}
              onChange={startDateHandler}
              min={convertDate(new Date())}
              max={convertDate(
                new Date(
                  localEndDate.getFullYear(),
                  localEndDate.getMonth(),
                  localEndDate.getDate() - 1
                )
              )}
            />
          </div>
          <div className="booking-check-out">
            <label htmlFor="check-out-date">CHECK-OUT</label>
            <input
              type="date"
              value={convertDate(bookingData.endDate)}
              name="check-out-date"
              onChange={endDateHandler}
              min={convertDate(
                new Date(
                  localStartDate.getFullYear(),
                  localStartDate.getMonth(),
                  localStartDate.getDate() + 1
                )
              )}
              max={convertDate(
                new Date(
                  localStartDate.getFullYear(),
                  localStartDate.getMonth(),
                  localStartDate.getDate() + 15
                )
              )}
            />
          </div>
        </div>
        <div className="booking-check-guests">
          <label htmlFor="guest-number">GUESTS</label>
          <input
            type="number"
            value={bookingData.guests}
            name="guest-number"
            onChange={guestHandler}
            min="1"
            max="5"
          />
        </div>
      </div>
    </form>
  );
};

export default SpotBookingForm;
