import "./SpotFeatures.css";

const SpotFeatures = ({ spot }) => {
  console.log("SPOT ", spot);
  return (
    <div className="spot-feature-list">
      <div className="spot-feature">
        <div className="icon">
          <i className="fa fa-desktop fa-2x" aria-hidden="true"></i>
        </div>
        <div className="spot-feature-info">
          <div className="spot-feature-title">Dedicated workspace</div>
          <div className="spot-feature-content">
            A common area with wifi that’s well-suited for working.
          </div>
        </div>
      </div>
      <div className="spot-feature">
        <div className="icon">
          <i className="fa fa-trophy fa-2x" aria-hidden="true"></i>
        </div>
        <div className="spot-feature-info">
          <div className="spot-feature-title">
            {spot.Owner.firstName} is a Superhost
          </div>
          <div className="spot-feature-content">
            Superhosts are experienced, highly rated hosts who are committed to
            providing great stays for guests.
          </div>
        </div>
      </div>
      <div className="spot-feature">
        <div className="icon">
          <i className="fa fa-map-marker fa-2x" aria-hidden="true"></i>
        </div>
        <div className="spot-feature-info">
          <div className="spot-feature-title">Great location</div>
          <div className="spot-feature-content">
            Centered in one of the most desirables areas.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotFeatures;
