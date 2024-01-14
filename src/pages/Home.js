import React, { useEffect, useState } from 'react';
import Header from '../components/Header.js';
import Body from '../components/Body.js';
import Grid from '../components/EventRow.js';
import eventService from '../services/eventData.js';
import '../styles/Home.css';

const Home = () => {
  const [eventList, setEventList] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingNewEvents, setLoadingNewEvents] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        // Simulate a delay of 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await eventService.getEventList(pageNum);
        setEventList(response.data);
        setTotalEvents(response.data.length);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageNum]);

  useEffect(() => {
    setLoadingNewEvents(true);

    const fetchNewEvents = async () => {
      try {
        // Simulate a delay of 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Implement logic to fetch new events (if needed)
        // For now, let's assume you have a function like eventService.getNewEvents()
        const response = await eventService.getNewEvents();
        // Add logic to update eventList with new events

      } catch (error) {
        console.error(error);
      } finally {
        setLoadingNewEvents(false);
      }
    };

    fetchNewEvents();
  }, [pageNum]); // You may need to update this dependency list based on when you want to fetch new events

  useEffect(() => {
    filterEvents();
  }, [searchQuery, eventList, pageNum]);

  const filterEvents = () => {
    const paginatedEvents = eventList;

    const filtered =
      searchQuery.trim() !== ''
        ? paginatedEvents.filter((event) =>
            event.event_name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : paginatedEvents;

    setFilteredEvents(filtered);
  };

  const handleNext = () => {
    setPageNum(pageNum + 1);
  };

  const handlePrevious = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  return (
    <div>
      <Header />
      <Body
        eventList={eventList}
        setFilteredEvents={setFilteredEvents}
        setSearchQuery={setSearchQuery}
      />
      {loading ? (
        <p style={{ textAlign: 'center', margin: '20px' }}>Loading...</p>
      ) : (
        <>
          {filteredEvents.length > 0 ? (
            <Grid eventList={filteredEvents} />
          ) : (
            <p style={{ textAlign: 'center', margin: '20px' }}>
              No events to display.
            </p>
          )}
        </>
      )}
      <div className='page_handle'>
        <button className='previous' onClick={handlePrevious} disabled={pageNum === 1 || loading}>
          Previous
        </button>
        <div className='showPageNumber'>{pageNum}</div>
        <button
          className='next'
          onClick={handleNext}
          disabled={ 12 > totalEvents || loading}
        >
          Next
        </button>
      </div>
      {loadingNewEvents && (
        <p style={{ textAlign: 'center', margin: '20px' }}>Loading new events...</p>
      )}
    </div>
  );
};

export default Home;
