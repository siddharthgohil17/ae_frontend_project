import React from 'react';
import Card from './Card';
import '../styles/EventGrid.css'; 

const EventGrid = ({ eventList, headerText }) => {

  return (
    <>
      <div className='grid-header'>
        <h1>{headerText}</h1>
      </div>
      <div className="grid-container">
        {eventList &&
          eventList?.map((event, key) => (
            <Card key={key} event={event} />
          ))}
      </div>
    </>
  );
};

export default EventGrid;
