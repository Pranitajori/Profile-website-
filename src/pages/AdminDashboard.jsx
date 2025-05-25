import React, { useState } from 'react';
import '../styles/AdminDashboard.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AdminDashboard = ({ profiles, setProfiles }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [editingProfileId, setEditingProfileId] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoURL(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setName('');
    setLocation('');
    setEmail('');
    setBio('');
    setSkills('');
    setPhoto(null);
    setPhotoURL('');
    setLatitude(null);
    setLongitude(null);
    setEditingProfileId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProfile = {
      id: editingProfileId || Date.now(),
      name,
      location,
      email,
      bio,
      skills: skills.split(',').map(skill => skill.trim()),
      photo: photoURL,
      latitude,
      longitude,
    };

    if (editingProfileId) {
      setProfiles(prev =>
        prev.map(profile => profile.id === editingProfileId ? newProfile : profile)
      );
    } else {
      setProfiles(prev => [...prev, newProfile]);
    }

    resetForm();
  };

  const handleDelete = (id) => {
    setProfiles(prev => prev.filter(profile => profile.id !== id));
    resetForm();
  };

  const handleEdit = (profile) => {
    setName(profile.name);
    setLocation(profile.location);
    setEmail(profile.email);
    setBio(profile.bio);
    setSkills(profile.skills.join(', '));
    setPhotoURL(profile.photo);
    setLatitude(profile.latitude);
    setLongitude(profile.longitude);
    setEditingProfileId(profile.id);
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
      },
    });

    return latitude && longitude ? <Marker position={[latitude, longitude]} /> : null;
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} required />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />

          <label>Skills (comma-separated)</label>
          <input value={skills} onChange={(e) => setSkills(e.target.value)} />

          <label>Photo</label>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />

          {photoURL && <img src={photoURL} alt="Preview" className="photo-preview" />}
        </div>

        <div className="map-section">
          <label>Select Location on Map</label>
          <MapContainer center={[20, 78]} zoom={5} style={{ height: '300px' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>
        </div>

        <button type="submit">{editingProfileId ? 'Update Profile' : 'Add Profile'}</button>
      </form>

      <div className="profile-list">
        {profiles.map(profile => (
          <div key={profile.id} className="profile-card">
            {profile.photo && <img src={profile.photo} alt={profile.name} width="80" />}
            <h3>{profile.name}</h3>
            <p>{profile.email}</p>
            <button onClick={() => handleEdit(profile)}>Edit</button>
            <button onClick={() => handleDelete(profile.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
