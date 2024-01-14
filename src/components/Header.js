import React from 'react';
import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { logout, loginWithRedirect, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!isAuthenticated) {
      alert("Please Sign in to create a new event");
      return;
    } else {
      navigate("/addevent");
    }
  };

  return (
    <div className='header'>
      <div style={{ marginLeft: '10px' }}>
        <h1>Allevent</h1>
      </div>
      <div className='header-btn'>
      <div>
  {isAuthenticated ? (
    <div className='profile'>
      <div className='profile-picture'>
        <img className='profile-image' src={user.picture} alt={user.name} />
      </div>
      <div className='profile-details'>
        {/* <h2 className='profile-name'>{user.name}</h2> */}
        <button onClick={handleCreate} className="create-event-button">Create Event</button>
      </div>
    </div>
  ) : (
    <p className='helper-text'>Please Sign in to create event.</p>
  )}
</div>

        <div>
          {isAuthenticated ? (
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="signin-button ">
              Sign Out
            </button>
          ) : (
              <button onClick={() => loginWithRedirect()} className="signin-button">Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
