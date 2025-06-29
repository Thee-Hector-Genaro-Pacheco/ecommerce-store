import { useAuth } from '../context/AuthContext';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading...</p>;
  }

  const {
    username,
    email,
    phone,
    country,
    gender,
    age,
    profilePicture,
    address,
  } = user;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img className="profile-avatar" src={profilePicture} alt="Profile" />
        <h2>{username}</h2>
        <div className="profile-info">
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone || 'N/A'}</p>
          <p><strong>Country:</strong> {country || 'N/A'}</p>
          <p><strong>Gender:</strong> {gender || 'N/A'}</p>
          <p><strong>Age:</strong> {age ?? 'N/A'}</p>
          <p><strong>Address:</strong><br />
            {address?.street || ''}<br />
            {address?.city || ''}, {address?.state || ''} {address?.zipCode || ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;