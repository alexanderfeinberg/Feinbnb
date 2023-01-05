import "./SpotCard.css";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { render } from "react-dom";

const SpotCard = ({ type, data }) => {
  const [renderData, setRenderData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

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

  if (!isLoaded) return null;

  return (
    <div
      className="spot-card-container"
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
  );
};

export default SpotCard;
