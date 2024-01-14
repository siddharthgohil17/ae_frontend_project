import React, { useState, useEffect } from 'react';
import '../styles/Card.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Card = ({ event }) => {
  const [imageError, setImageError] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const fallbackImage =
    'https://img.lovepik.com/photo/48002/9166.jpg_wh860.jpg';

  const image_url = imageError ? fallbackImage : event.banner_image || fallbackImage;

  const handleImageError = () => {
    setImageError(true);
  };

  const handleEditButtonClick = () => {
    if (!isAuthenticated) {
     
      const confirmSignIn = window.confirm("Please sign in to buy tickets. Click OK to sign in.");

      if (confirmSignIn) {
   
        loginWithRedirect();
        return; 
      }
    }


    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleBuyTicket = () => {
  
    setLoading(true);

   
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      
      setTimeout(() => {
        setSuccess(false);
        setShowEditModal(false);
      }, 2000);
    }, 2000);
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short' };
    const date = new Date(dateString);
    const day = date.toLocaleDateString('en-US', { day: 'numeric' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });

    return (
      <div>
        <div className="month-text">{month}</div>
        <div className="day-text">{day}</div>
      </div>
    );
  };

  return (
    <div className='card'>
      <div className="event-card" onClick={handleEditButtonClick}>
        <div className="event-image">
          <img src={image_url} alt={event.event_name} onError={handleImageError} />
        </div>
        <div className="event-details">
          <div className='info-section'>
            <div className='date-info'>
              {formatDate(event.start_time)}
            </div>
            <div className='name-info'>
              <div style={{ fontSize: '18px', fontWeight: '500' }}>{event.event_name}</div>
              <div style={{ fontSize: '10px', color: 'gray', float: 'left', marginLeft: '2px' }}>{event.city}</div>
            </div>
          </div>
        </div>
      </div>
      {showEditModal && (
        <div className="card-modal scroll">
          <div className="card-modal-content">
            <span className="card-close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{event.event_name}</h2>
            <div className='card-modal-row'>
              <p>{event.description}</p>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : success ? (
              <p>Ticket purchased successfully!</p>
            ) : (
              <button className="btn" onClick={handleBuyTicket}>
                Buy ticket
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
