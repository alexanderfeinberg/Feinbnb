import { useContext } from "react";
import ReviewCard from "../Reviews/ReviewCard";
import CreateSpotFormModal from "./CreateReviewFormModal";
import { MenuContext } from "../../context/MenuModal";
import { useReviewContext } from "../../context/reviewCountStarContext";

import "./AllReviews.css";

const AllReviews = ({ props: { user, reviews, spot, numberOfReviews } }) => {
  const { showModal, setShowModal, defaultValue, setDefaultValue } =
    useContext(MenuContext);

  const { numReviews, setNumReviews, starRating, setStarRating } =
    useReviewContext();

  const handleReview = () => {
    setDefaultValue(false);
    setShowModal("createReview");
  };
  console.log("ALL REVIEWS ", reviews);

  return (
    <>
      <div id="all-reviews" className="review-header">
        <div className="review-header-review-data">
          <div className="star-rating">
            <i className="fa fa-star" aria-hidden="true"></i>
            {spot ? starRating : null}
          </div>
          <div className="subtitle-sep">·</div>
          <CreateSpotFormModal spot={spot} />
          <div className="rating-count">
            {numReviews}{" "}
            {numReviews > 1 || numReviews < 1 ? "reviews" : "review"}
          </div>
        </div>
        {user && spot && spot.ownerId !== user.id && (
          <>
            <div className="subtitle-sep">·</div>
            <div className="add-comment">
              <a onClick={handleReview}>Leave a review</a>
            </div>
          </>
        )}
      </div>
      <div className="review-content">
        {Object.values(reviews).map((review) => (
          <ReviewCard key={review.id} review={review} user={user} spot={spot} />
        ))}
      </div>
    </>
  );
};

export default AllReviews;
