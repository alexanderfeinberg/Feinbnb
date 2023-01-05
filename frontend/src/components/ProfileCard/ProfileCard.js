import "./ProfileCard.css";

const ProfileCard = ({ user, reviews }) => {
  return (
    <div className="profile-card">
      <h3>{user.firstName}</h3>
      <div className="profile-card-data">
        <div className="profile-card-item">
          {Object.values(reviews).length} reviews
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
