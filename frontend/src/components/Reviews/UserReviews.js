import { useEffect, useState } from "react";

import "./UserReviews.css";

const UserReviews = ({ reviews }) => {
  return (
    <div className="review-container">
      <div className="review-header">
        {Object.values(reviews).length} reviews
      </div>
    </div>
  );
};

export default UserReviews;
