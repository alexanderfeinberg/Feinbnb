import { useReviewContext } from "../../context/reviewCountStarContext";
import "./SpotReserveAction.css";
const SpotReserveAction = ({ spot }) => {
  const { numReviews, setNumReviews, starRating, setStarRating } =
    useReviewContext();
  return (
    <div class="reserve-container">
      <div className="top-container-info">
        <div className="price">${spot.price} night</div>
        <div className="review-rating">
          <i className="fa fa-star" aria-hidden="true"></i>
          {starRating}
        </div>
        <div className="review-count">{numReviews}</div>
      </div>
      <div className="check-in-check-out"></div>
      <div className="guest-number"></div>
      <div className="reserve-btn">
        <button>Reserve</button>
      </div>
      <div className="warning">You wont be charged yet</div>
      <div className="stay-cost-calc"></div>
      <div className="final-cost"></div>
    </div>
  );
};

export default SpotReserveAction;
