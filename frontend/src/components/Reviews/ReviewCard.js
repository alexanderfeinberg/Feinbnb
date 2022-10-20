import "./ReviewCard.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteReviewThunk,
  getSpotReviewsThunk,
} from "../../store/reviews/reviewThunk";

import { useHistory } from "react-router-dom";

const months = {
  "01": "January",
  "02": "Febuary",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  10: "October",
  11: "November",
  12: "December",
};

const formatDate = (date) => {
  const splitDate = date.split("-");
  const year = splitDate[0];
  const month = months[splitDate[1]];
  console.log(splitDate);
  return { year, month };
};

const ReviewCard = ({ review, user, spot }) => {
  console.log("REVIEW CARD RERENDER");
  let dispatch = useDispatch();
  let history = useHistory();

  if (!review.id) return null;
  const { year, month } = formatDate(review["createdAt"]);

  const handleDelete = (e) => {
    const id = e.target.getAttribute("data-remove");
    dispatch(deleteReviewThunk(id)).then(() =>
      dispatch(getSpotReviewsThunk(spot.id))
    );
    // history.push("/reviews/current");
  };

  return (
    <div className="review-card">
      <div className="top-half">
        <div className="review-title">
          <div className="review-name">
            {/* {review["User"] ? review["User"]["firstName"] : user.firstName} */}
            {review["User"] && review["User"]["firstName"]}
          </div>
          <div className="review-delete">
            {user && (!review.User || user.id === review.User.id) && (
              <button onClick={handleDelete} data-remove={review.id}>
                Delete
              </button>
            )}
          </div>
        </div>
        <div className="review-date">
          {month} {year}
        </div>
      </div>
      <div className="bottom-half">
        <div className="review-content">{review.review}</div>
      </div>
    </div>
  );
};

export default ReviewCard;
