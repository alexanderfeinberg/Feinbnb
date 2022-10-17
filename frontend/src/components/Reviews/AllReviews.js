import ReviewCard from "../Reviews/ReviewCard";

const AllReviews = ({ props: { reviews, spot, numberOfReviews } }) => {
  const handleReview = () => {};

  return (
    <>
      <div className="review-header">
        <div className="star-rating">
          <i className="fa fa-star" aria-hidden="true"></i>
          {spot ? spot.avgRating : null} ·
        </div>
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
