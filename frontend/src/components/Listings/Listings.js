import SpotCard from "../SpotCard/SpotCard";

const Listings = ({ user, spots }) => {
  return (
    <div className="listings-container">
      <h4>{user.firstName}'s Listings</h4>
      {Object.values(spots).map((spot) => (
        <div key={spot.id} className="listings-item">
          <SpotCard type={"SPOT"} data={spot} />
        </div>
      ))}
    </div>
  );
};

export default Listings;
