import SpotHeadline from "./SpotHeadline";
import SpotFeatures from "./SpotFeatures";
import SpotReserveAction from "./SpotReserveAction";
import SpotDescription from "./SpotDescription";
import "./SingleSpotInfo.css";

const SingleSpotInfo = ({ spot }) => {
  return (
    <div className="bottom-spot-info">
      <div className="bottom-spot-info-left">
        <SpotHeadline spot={spot} />
        <SpotFeatures spot={spot} />
        <SpotDescription spot={spot} />
      </div>
      <div className="bottom-spot-info-right">
        <SpotReserveAction spot={spot} />
      </div>
    </div>
  );
};

export default SingleSpotInfo;
