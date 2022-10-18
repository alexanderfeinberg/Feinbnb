import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk, deleteSpotThunk } from "../../store/spots/spotThunks";
import { getSpotReviewsThunk } from "../../store/reviews/reviewThunk";
import "./SingleSpot.css";
import { MenuContext } from "../../context/MenuModal";
import CreateSpotFormModal from "../Spots/CreateSpotFormModal";
import AllReviews from "../Reviews/AllReviews";
import { useReviewContext } from "../../context/reviewCountStarContext";
import SingleSpotInfo from "./SingleSpotInfo";

const SingleSpot = () => {
  console.log("SINGLE SPOT RENDER");
  const { showModal, setShowModal, defaultValue, setDefaultValue } =
    useContext(MenuContext);

  const { numReviews, setNumReviews, starRating, setStarRating } =
    useReviewContext();

  const { spotId } = useParams();

  let dispatch = useDispatch();
  let history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);
  console.log("IS LOADED ", isLoaded);
  const spot = useSelector((state) => {
    console.log("SELECTING SPOT....", state);
    setStarRating(state.spots[spotId] ? state.spots[spotId].avgRating : null);
    return state.spots[spotId] && state.spots[spotId].Owner
      ? state.spots[spotId]
      : null;
  });
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => {
    console.log("SELECTING REVIEWS....");
    setNumReviews(
      state.reviews[spotId] ? Object.values(state.reviews[spotId]).length : 0
    );
    return state.reviews[spotId] ? state.reviews[spotId] : null;
  });
  console.log("REVIEWS ", reviews);

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
    console.log("SINGLE SPOT USE EFFECT");

    dispatch(getSpotThunk(spotId)).then((res) => {});
    dispatch(getSpotReviewsThunk(spotId)).then((res) => {
      setIsLoaded(true);
    });

    return () => setIsLoaded(false);
  }, [dispatch]);

  if (spot && reviews && isLoaded) {
    return (
      <div className="spot-details">
        <div className="top-details">
          <div className="top-line-single">
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
                {starRating}
              </div>
              <div className="subtitle-sep">·</div>
              <div className="ratingsCount">{numReviews} reviews</div>
              <div className="subtitle-sep">·</div>
              <div className="host">Host: {spot.Owner.firstName}</div>
              <div className="subtitle-sep">·</div>
              <div className="location">
                {spot.city}, {spot.state}, {spot.country}
              </div>
            </div>
          </div>
        </div>
        <div className="single-spot-image">
          <div className="main-image">
            <img
              src={
                spot.SpotImages.filter((image) => image.preview === true)[0].url
              }
            ></img>
          </div>
          <div className="supporting-images">
            {spot.SpotImages.length > 1 &&
              spot.SpotImages.map((img, idx) => {
                console.log("SPOT IMAGES", spot.SpotImages, idx);
                if (idx === 0 || idx > 5) return null;
                return <img key={`img-${idx}`} src={img.url}></img>;
              })}
          </div>
        </div>
        <div className="bottom-details">
          <SingleSpotInfo spot={spot} />

          <div className="review-section">
            <AllReviews props={{ user, reviews, spot }} />
          </div>
        </div>
      </div>
    );
  }
  return <h2>Loading...</h2>;
};

export default SingleSpot;
