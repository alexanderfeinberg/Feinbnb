import "./SpotHeadline.css";

const SpotHeadline = ({ spot }) => {
  return (
    <div className="spot-info-headline">
      <div className="spot-info-headline-title">
        <h3>Entire house hosted by {spot.Owner.firstName}</h3>
      </div>
      <div className="spot-info-headline-subtitle">
        <div className="guest-amount">3 guests</div>
        <div className="subtitle-sep">·</div>
        <div className="bedroom-amount">4 bedrooms</div>
        <div className="subtitle-sep">·</div>
        <div className="bed-amount">3 beds</div>
        <div className="subtitle-sep">·</div>
        <div className="bath-amount">2 baths</div>
      </div>
    </div>
  );
};

export default SpotHeadline;
