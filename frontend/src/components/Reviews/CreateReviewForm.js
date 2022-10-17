import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addReviewThunk } from "../../store/reviews/reviewThunk";
import { MenuContext } from "../../context/MenuModal";
import { getSpotThunk } from "../../store/spots/spotThunks";

const CreateSpotForm = ({ spot }) => {
  console.log("FORM SPOT", spot);
  let dispatch = useDispatch();
  let history = useHistory();
  const { showModal, setShowModal, defaultValue, setDefaultValue } =
    useContext(MenuContext);

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      review,
      stars,
    };

    dispatch(addReviewThunk(spot.id, newReview))
      .then((res) => {
        setShowModal(false);
      })
      .then(() => dispatch(getSpotThunk(spot.id)).then((res) => {}))
      .catch(async (res) => {
        const data = await res.json();
        if (data) setErrors([data]);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((err, idx) => {
          return <li key={idx}>{err}</li>;
        })}
      </ul>
      <label>
        Review:
        <input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
      </label>
      <label>
        Rating
        <input
          type="number"
          min="0"
          max="5"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default CreateSpotForm;
