import React from 'react';
import Card from './Card';
import '../styles/EventRow.css'; 

const Grid = ({ eventList }) => {

  return (
    <div className="grid-container">
      {
        eventList && console.log(eventList)
      }
      
      {eventList &&
        eventList?.map((event, key) => (
          <Card key={key} event={event} />
        ))}
    </div>
  );
};

export default Grid;
