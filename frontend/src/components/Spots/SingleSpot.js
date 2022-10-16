import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk, deleteSpotThunk } from "../../store/spots/spotThunks";
import "./SingleSpot.css";
import { MenuContext } from "../../context/MenuModal";
import CreateSpotFormModal from "../Spots/CreateSpotFormModal";

const SingleSpot = () => {
  const { showModal, setShowModal, defaultValue, setDefaultValue } =
    useContext(MenuContext);
  const { spotId } = useParams();
  let dispatch = useDispatch();
  let history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const spot = useSelector((state) => state.spots[spotId]);
  const user = useSelector((state) => {
    console.log("USE SELECTOR STATE ", state);
    return state.session.user;
  });

  console.log("SINGLE SPOT ", spot);

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
    dispatch(getSpotThunk(spotId)).then((res) => setIsLoaded(true));
  }, [dispatch]);

  if (isLoaded) {
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
