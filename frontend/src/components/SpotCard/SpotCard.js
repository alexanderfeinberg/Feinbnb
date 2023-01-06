import "./SpotCard.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { deleteBookingThunk } from "../../store/bookings/bookingThunk";

const SpotCard = ({ type, data, onErrors }) => {
  const [renderData, setRenderData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    switch (type) {
      case "SPOT":
        setRenderData({
          id: data.id,
          previewImage: data.previewImage,
          title: data.name,
          info1: data.description,
          info2: "3 breds",
          info3: `$${data.price} night`,
        });
        break;

      case "BOOKING":
        setRenderData({
          id: data.id,
          previewImage: data.Spot.previewImage,
          title: data.Spot.name,
          info1: "Dates here",
          subInfo1: "total time here",
          info2: "guests here",
          subInfo2: "total price",
          info3: "in progress",
        });
        break;
    }
    setIsLoaded(true);
  }, [type, data]);
  const history = useHistory();

  const deleteHandler = async () => {
    if (type === "BOOKING") {
      dispatch(deleteBookingThunk(data.id))
        .catch((e) => e.json())
        .then((e) => {
          console.log("ERRORS ", e);
          onErrors([e.message]);
        });
    }
  };

  const buttons = (
    <div className="booking-action-btns">
      <button>Edit</button>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );

  if (!isLoaded) return null;

  return (
    <div
      className="spot-card-container"
      onMouseOver={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      <div
        className="spot-card-left"
        onClick={() => history.push(`/spots/${renderData.id}`)}
      >
        <div className="spot-card-side">
          <img src={renderData.previewImage} />
        </div>
        <div className="spot-card-content">
          <div className="spot-card-header">{renderData.title}</div>
          <div className="spot-card-info">
            {renderData.info1}
            {renderData.subInfo1 && (
              <div className="spot-card-sub-info">{renderData.subInfo1}</div>
            )}
          </div>
          <div className="spot-card-info">
            {renderData.info2}
            {renderData.subInfo2 && (
              <div className="spot-card-sub-info">{renderData.subInfo2}</div>
            )}
          </div>
          <div className="spot-card-info">{renderData.info3}</div>
        </div>
      </div>
      <div className="spot-card-right">{showButtons && buttons}</div>
    </div>
  );
};

export default SpotCard;
