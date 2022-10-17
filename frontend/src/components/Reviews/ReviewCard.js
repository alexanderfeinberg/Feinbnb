import "./ReviewCard.css";

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
  if (!review.id) return null;
  const { year, month } = formatDate(review["createdAt"]);

  return (
    <div className="review-card">
      <div className="top-half">
        <div className="review-name">{review["User"]["firstName"]}</div>
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
