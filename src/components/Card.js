import React, { useState } from 'react';
import '../styles/Card.css';

const Card = ({ event }) => {
  const [imageError, setImageError] = useState(false);

  const fallbackImage =
    'https://img.lovepik.com/photo/48002/9166.jpg_wh860.jpg';

  const image_url = imageError ? fallbackImage : event.banner_image || fallbackImage;

  const handleImageError = () => {
    setImageError(true);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditButtonClick = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
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
            {/* <p>{event.category}</p> */}
          </div>
          <div className='name-info'>
            <div style={{ fontSize: '18px', fontWeight: '500' }}>{event.event_name}</div>
            <div style={{ fontSize: '10px', color: 'gray', float: 'left', marginLeft:
            '2px' }}>{event.city}</div>
          </div>
        </div>

        {/* <div className='description-info'>
          <button onClick={handleEditButtonClick}>View details</button>
        </div> */}
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
                <button className="btn">
                  Buy ticket
                </button>
              </div>
            </div>
          )}
    </div>
  );
};

export default Card;
