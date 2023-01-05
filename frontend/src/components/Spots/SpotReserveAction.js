import { useReviewContext } from "../../context/reviewCountStarContext";
import { useEffect, useState } from "react";
import SpotPricing from "./SpotPricing";
import "./SpotReserveAction.css";
import SpotBookingForm from "./SpotBookingForm";
import { createBookingThunk } from "../../store/bookings/bookingThunk";
import { useDispatch } from "react-redux";
import { convertDate } from "../../store/csrf";
import { useHistory } from "react-router-dom";

const SpotReserveAction = ({ spot }) => {
  const history = useHistory();

  const { numReviews, setNumReviews, starRating, setStarRating } =
    useReviewContext();

  const dispatch = useDispatch();

  const today = new Date();
  console.log("TODAY ", today.getDate(), today.getDay(), today.getDay() + 8);

  const [bookingData, setBookingData] = useState({
    startDate: today,
    endDate: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 8
    ),
    guests: 1,
    isValid: true,
  });

  const createBookingHandler = async () => {
    const booking = {
      startDate: convertDate(bookingData.startDate),
      endDate: convertDate(bookingData.endDate),
    };

    const newBooking = await dispatch(createBookingThunk(spot.id, booking));
    history.push("/profile");
  };

  return (
    <div className="reserve-container">
      <div className="top-container-info">
        <div className="reserve-card-price">
          ${spot.price} <div className="support-text">night</div>
        </div>

        <div className="review-details">
          <div className="review-rating">
            <i className="fa fa-star" aria-hidden="true"></i>
            {starRating}
          </div>
          <div className="subtitle-sep">·</div>
          <div className="review-count">
            {/* <a href="#all-reviews"> */}
            {numReviews}{" "}
            {numReviews > 1 || numReviews < 1 ? "reviews" : "review"}
            {/* </a> */}
          </div>
        </div>
      </div>
      <div className="booking-data">
        <SpotBookingForm
          bookingData={bookingData}
          onBookingData={setBookingData}
        />
      </div>
      <div className="reserve-btn">
        <button
          disabled={bookingData.isValid ? false : true}
          onClick={createBookingHandler}
        >
          Reserve
        </button>
      </div>
      <div className="stay-cost-calc">
        <SpotPricing spot={spot} bookingData={bookingData} />
      </div>
    </div>
  );
};

export default SpotReserveAction;
