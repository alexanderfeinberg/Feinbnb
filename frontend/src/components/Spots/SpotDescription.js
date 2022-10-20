import "./SpotDescription.css";

const SpotDescription = ({ spot }) => {
  console.log("SPOT DETAILS ".spot);
  return (
    <div className="spot-description">
      <div className="spot-desc-content">{spot.description}</div>
    </div>
  );
};

export default SpotDescription;
