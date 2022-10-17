import "./ReviewCard.css";
import { useSelector } from "react-redux";

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

const ReviewCard = ({ review }) => {
  const user = useSelector((state) => state.session.user);
  if (!review.id) return null;
  const { year, month } = formatDate(review["createdAt"]);

  return (
    <div className="review-card">
      <div className="top-half">
        <div className="review-title">
          <div className="review-name">{review["User"]["firstName"]}</div>
          <div className="review-delete">
            <button>Delete</button>
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
