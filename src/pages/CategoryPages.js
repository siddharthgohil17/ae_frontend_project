import React, { useEffect, useState } from 'react'
import EventGrid from '../components/EventGrid'
import eventService from '../services/eventData';

const CategoryPages = () => {

  const urlParams = new URLSearchParams(window.location.search);

  const category = urlParams.get('category');
 
  const [eventList, setEventList] = useState([]);
  const headerText = "Top " + category + " events for you";

  useEffect(() => {
  

    const fetchData = async () => {
      try {
     
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await eventService.getEventByCategory(category);
        setEventList(response.data);
        // setTotalEvents(response.data.length);
      } catch (error) {
        console.error(error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div>
      {/* <h1>Header section pending for category pages</h1> */}
      <EventGrid eventList={eventList} headerText={headerText} />
    </div>
  )
}

export default CategoryPages
