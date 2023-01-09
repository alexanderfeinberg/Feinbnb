import "./SpotCard.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import EditBookingModal from "../EditBookingModal/EditBookingModal";
import { ModalContext } from "../../context/Modal";
import { deleteBookingThunk } from "../../store/bookings/bookingThunk";
import { deleteSpotThunk } from "../../store/spots/spotThunks";
import CreateSpotForm from "../Spots/CreateSpotFrom";

export const convertStrToDate = (date) => {
  const dateObj = new Date(date);
  return `${
    dateObj.getMonth() + 1
  }-${dateObj.getDate()}-${dateObj.getFullYear()}`;
};

const SpotCard = ({ type, data, onErrors }) => {
  console.log("SPOT CARD ", data);
  const [renderData, setRenderData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const dispatch = useDispatch();
  const { setShowModal } = useContext(ModalContext);

  useEffect(() => {
    switch (type) {
      case "SPOT":
        setRenderData({
          id: data.id,
          previewImage: data.previewImage,
          title: data.name,
          info1: data.description,
          info2: "3 beds",
          info3: `$${data.price} night`,
        });
        break;

      case "BOOKING":
        setRenderData({
          id: data.id,
          previewImage: data.Spot.previewImage,
          title: data.Spot.name,
          info1: `${convertStrToDate(data.startDate)} - ${convertStrToDate(
            data.endDate
          )}`,
          subInfo1: `${data.totalDays} ${
            data.totalDays > 1 ? "nights" : "night"
          }`,
          info2: `${data.totalGuests} ${
            data.totalGuests > 1 ? "guests" : "guest"
          }`,
          subInfo2: `$${data.totalPrice}`,
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
    } else if (type === "SPOT") {
      dispatch(deleteSpotThunk());
    }
  };

  const buttons = (
    <div className="booking-action-btns">
      <button
        onClick={() => {
          setShowEditModal(true);
          setShowModal(type === "BOOKING" ? "editBooking" : "editSpot");
        }}
      >
        Edit
      </button>
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
      {type === "BOOKING" && showEditModal && (
        <EditBookingModal
          spot={data.Spot}
          booking={data}
          onCloseModal={setShowEditModal}
        />
      )}
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
      <div className="spot-card-right">
        {type === "BOOKING" && showButtons && buttons}
      </div>
    </div>
  );
};

export default SpotCard;
