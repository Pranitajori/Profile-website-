import React from 'react';
import '../styles/ProfileCard.css';

const ProfileCard = ({ profile, onClick }) => {
  return (
    <div className="profile-card" onClick={() => onClick(profile)}>
      {profile.photo && <img src={profile.photo} alt={profile.name} />}
      <h3>{profile.name}</h3>
      <p>{profile.location}</p>
    </div>
  );
};

export default ProfileCard;
