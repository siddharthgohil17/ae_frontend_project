import React from 'react';
import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../images/ae-logo-white-vector (1).webp"

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
  const handleLogoClick=()=>{
    
    navigate("/")
  }

  return (
    <div className='header'>
  <div style={{ marginLeft: '10px', maxHeight: '40px', maxWidth: '120px',cursor: 'pointer' }} onClick={handleLogoClick}>
      <img src={logo} alt="Logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
    </div>


      <div className='header-btn'>
      <div>
  {isAuthenticated ? (
    <div className='profile'>
    <div className='profile-details'>
        {/* <h2 className='profile-name'>{user.name}</h2> */}
        <h1 onClick={handleCreate} className="create-event-button">+Create Event</h1>
      </div>
      <div className='profile-picture'>
        <img className='profile-image' src={user.picture} alt={user.name} />
      </div>
    
    </div>
  ) : (
    <h1 onClick={() => loginWithRedirect()} className="create-event-button">+Create Event</h1>
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
