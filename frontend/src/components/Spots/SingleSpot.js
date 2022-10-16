import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk } from "../../store/spots/spotThunks";
import "./SingleSpot.css";

const SingleSpot = () => {
  const { spotId } = useParams();
  let dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const spot = useSelector((state) => state.spots[spotId]);

  useEffect(() => {
    dispatch(getSpotThunk(spotId)).then((res) => setIsLoaded(true));
  }, [dispatch]);

  if (isLoaded) {
    return (
      <div className="spot-details">
        <div className="top-details">
          <div className="top-line">
            <div className="top-title">
              <h2>{spot.name}</h2>
            </div>
            <div className="top-subtitle">
              <div className="stars">
                <i className="fa fa-star" aria-hidden="true"></i>
                {spot.avgRating}
              </div>
              <div className="ratingsCount">86 reviews</div>
              <div className="host">Host: {spot.ownerId}</div>
              <div className="location">
                {spot.city}, {spot.state}, {spot.country}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default SingleSpot;
