import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import "./UserReviews.css";

const UserReviews = ({ reviews }) => {
  return (
    <div className="review-container">
      <div className="review-header">
        <div className="star-icon">
          <i className="fa fa-star fa-sm" aria-hidden="true"></i>
        </div>
        <div className="review-count-profile">
          {Object.values(reviews).length} reviews
        </div>
      </div>
      <div className="review-list">
        {Object.values(reviews).map((review) => (
          <ReviewCard review={review} />
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
