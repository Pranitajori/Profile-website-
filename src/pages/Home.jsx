import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import ProfileDetails from '../components/ProfileDetails';
import MapComponent from '../components/MapComponent';
import '../styles/Home.css';

const Home = ({ profiles }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <div className="home">
      <h1>Profile Explorer</h1>
      <div className="profile-list">
        {profiles.map(profile => (
          <ProfileCard key={profile.id} profile={profile} onClick={setSelectedProfile} />
        ))}
      </div>

      <div className="details-map-container">
        <ProfileDetails profile={selectedProfile} />
        <MapComponent profile={selectedProfile} />
      </div>
    </div>
  );
};

export default Home;
