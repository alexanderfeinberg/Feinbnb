import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import {
  getAllSpotsThunk,
  getUserSpotsThunk,
} from "../../store/spots/spotThunks";
import { useEffect } from "react";
import "./AllSpots.css";

const AllSpots = ({ isCurrent }) => {
  let dispatch = useDispatch();
  let history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);
  console.log("IS LOADED", isLoaded);

  const spots = useSelector((state) =>
    isCurrent ? state.spots["userSpots"] : state.spots
  );
  const user = useSelector((state) => state.session.user);

  console.log("USER SPOTS ", spots, isLoaded);

  useEffect(() => {
    console.log("USEFFECT");
    if (!isCurrent) dispatch(getAllSpotsThunk()).then(() => setIsLoaded(true));
    if (isCurrent && !user) return;
    if (isCurrent)
      dispatch(getUserSpotsThunk(user)).then(() => setIsLoaded(true));

    return () => setIsLoaded(false);
  }, [dispatch, isCurrent, user]);

  const handleClick = (e) => {
    console.log(e);
    history.push(`/spots/${e}`);
  };

  if (spots) {
    return (
      <>
        <h2>Trips</h2>
        <div className="all-spots">
          {Object.values(spots).map((spot) => {
            return (
              <div key={spot.id} value={spot.id} className="individual-spot">
                <div className="spot-image">
                  <img
                    value={spot.id}
                    onClick={(e) => handleClick(e.target.getAttribute("value"))}
                    src={spot.previewImage}
                  />
                </div>

                <div className="all-bottom-details" key={`details-${spot.id}`}>
                  <div className="top-line">
                    <div className="location">
                      {spot.city}, {spot.state}
                    </div>
                    <div className="rating">
                      <i className="fa fa-star" aria-hidden="true"></i>
                      {spot.avgRating ? spot.avgRating : 0}
                    </div>
                  </div>
                  <div className="address">{spot.address}</div>
                  <div className="price">
                    <div className="price-amt-text">${spot.price}</div> night
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    if (isCurrent && !user) {
      return <h2>Please login to view your spots!</h2>;
    }
    return null;
  }
};

export default AllSpots;
