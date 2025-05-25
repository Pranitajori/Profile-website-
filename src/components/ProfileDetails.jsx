import React from 'react';
import '../styles/ProfileDetails.css';

const ProfileDetails = ({ profile }) => {
  if (!profile) return <div className="details">Select a profile to view details.</div>;

  return (
    
    <div className="details">
      <h2>{profile.name}</h2>
      <p><strong>Location:</strong> {profile.location}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Bio:</strong> {profile.bio}</p>
      <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
    </div>
  );
};


export default ProfileDetails;