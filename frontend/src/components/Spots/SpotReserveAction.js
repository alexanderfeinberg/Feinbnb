import { useReviewContext } from "../../context/reviewCountStarContext";
import "./SpotReserveAction.css";
import SpotBookingForm from "./SpotBookingForm";
const SpotReserveAction = ({ spot }) => {
  const { numReviews, setNumReviews, starRating, setStarRating } =
    useReviewContext();
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
            {numReviews} {numReviews > 1 ? "reviews" : "review"}
          </div>
        </div>
      </div>
      <div className="booking-data">
        <SpotBookingForm />
      </div>
      <div className="reserve-btn">
        <button disabled={true}>Reserve</button>
      </div>
      <div className="warning">You wont be charged yet</div>
      <div className="stay-cost-calc"></div>
      <div className="final-cost"></div>
    </div>
  );
};

export default SpotReserveAction;
