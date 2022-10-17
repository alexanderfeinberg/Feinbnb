import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk, deleteSpotThunk } from "../../store/spots/spotThunks";
import { getSpotReviewsThunk } from "../../store/reviews/reviewThunk";
import "./SingleSpot.css";
import { MenuContext } from "../../context/MenuModal";
import CreateSpotFormModal from "../Spots/CreateSpotFormModal";
import AllReviews from "../Reviews/AllReviews";

const SingleSpot = () => {
  const { showModal, setShowModal, defaultValue, setDefaultValue } =
    useContext(MenuContext);
  const { spotId } = useParams();

  let dispatch = useDispatch();
  let history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);
  console.log("IS LOADED ", isLoaded);
  const [numberOfReviews, setNumberOfReviews] = useState(0);
  const spot = useSelector((state) => state.spots[spotId]);
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => {
    console.log("REIVEW STATEEE ", state);
    return state.reviews[spotId] ? state.reviews[spotId] : null;
  });
  console.log("REVIEWS", reviews);

  // console.log("USER ID ", user.id, spot.ownerId);

  const handleDelete = (e) => {
    dispatch(deleteSpotThunk(spot));
    history.push("/spots/current");
  };

  const handleEdit = (e) => {
    setShowModal("createSpot");
    setDefaultValue(spot);
  };

  useEffect(() => {
    console.log("USE EFFECT");
    dispatch(getSpotThunk(spotId)).then((res) => {});
    dispatch(getSpotReviewsThunk(spotId)).then((res) => {
      setNumberOfReviews(res["Reviews"].length);
      setIsLoaded(true);
    });

    return () => setIsLoaded(false);
  }, [dispatch]);

  if (spot && reviews) {
    return (
      <div className="spot-details">
        <div className="top-details">
          <div className="top-line">
            <div className="top-title">
              <h2>{spot.name}</h2>

              <CreateSpotFormModal />
              {user && spot.ownerId === user.id && (
                <div className="action-buttons">
                  <button onClick={handleEdit}>Edit Spot</button>
                  <button onClick={handleDelete}>Delete Spot</button>
                </div>
              )}
            </div>
            <div className="top-subtitle">
              <div className="stars">
                <i className="fa fa-star" aria-hidden="true"></i>
                {spot.avgRating}
              </div>
              <div className="ratingsCount">{numberOfReviews} reviews</div>
              <div className="host">Host: {spot.ownerId}</div>
              <div className="location">
                {spot.city}, {spot.state}, {spot.country}
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-details">
          <div className="review-section">
            <AllReviews
              props={{ reviews, spot, numberOfReviews: numberOfReviews }}
            />
          </div>
        </div>
      </div>
    );
  }
  return <h2>Loading...</h2>;
};

export default SingleSpot;
