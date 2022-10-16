import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllSpotsThunk } from "../../store/spots/spotThunks";
import { useEffect } from "react";
import "./AllSpots.css";

const AllSpots = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  const spots = useSelector((state) => {
    console.log("STATE ", state);
    return state.spots;
  });

  console.log("OBJECT VALS", Object.values(spots));

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  const handleClick = (e) => {
    console.log(e);
    history.push(`/spots/${e}`);
  };

  return (
    <>
      <h2>Spots</h2>
      <div className="all-spots">
        {Object.values(spots).map((spot) => {
          return (
            <div key={spot.id} value={spot.id} className="individual-spot">
              <div
                className="spot-image"
                value={spot.id}
                onClick={(e) => handleClick(e.target.getAttribute("value"))}
              >
                {/* <img src={`${spot.previewImage}`} /> */}
                Image
              </div>

              <div className="bottom-details" key={`details-${spot.id}`}>
                <div className="top-line">
                  <div className="location">
                    {spot.city}, {spot.state}
                  </div>
                  <div className="rating">
                    <i className="fa fa-star" aria-hidden="true"></i>
                    {spot.avgRating}
                  </div>
                </div>
                <div className="address">{spot.address}</div>
                <div className="price">${spot.price} night</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllSpots;
