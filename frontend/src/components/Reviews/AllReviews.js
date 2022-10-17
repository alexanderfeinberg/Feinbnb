import { useContext } from "react";
import ReviewCard from "../Reviews/ReviewCard";
import CreateSpotFormModal from "./CreateReviewFormModal";
import { MenuContext } from "../../context/MenuModal";

const AllReviews = ({ props: { reviews, spot, numberOfReviews } }) => {
  const { showModal, setShowModal, defaultValue, setDefaultValue } =
    useContext(MenuContext);

  const handleReview = () => {
    setDefaultValue(false);
    setShowModal("createReview");
  };
  console.log("ALL REVIEWS ", reviews);

  return (
    <>
      <div className="review-header">
        <div className="star-rating">
          <i className="fa fa-star" aria-hidden="true"></i>
          {spot ? spot.avgRating : null} ·
        </div>
        <CreateSpotFormModal spot={spot} />
        <div className="rating-count">{numberOfReviews} reviews</div>
        <div className="add-comment">
          <button onClick={handleReview}>Leave a review</button>
        </div>
      </div>
      <div className="review-content">
        {Object.values(reviews).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </>
  );
};

export default AllReviews;
