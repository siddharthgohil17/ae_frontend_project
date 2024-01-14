// Body.js

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import eventService from '../services/eventData'; // Import the eventService
import '../styles/Body.css';

const Body = ({ eventList, setFilteredEvents, setSearchQuery, onCityChange, onCategoryChange }) => {
  const [uniqueCities, setUniqueCities] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Fetch unique cities and categories when the component mounts
    fetchUniqueCities();
    fetchUniqueCategories();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [selectedCity, selectedCategory, selectedDate, eventList]);

  const fetchUniqueCities = async () => {
    try {
      const response = await eventService.getAllCity();
      // Assuming response.data is an array of objects with a 'city' property
      const cities = response.data.map(cityObject => cityObject.city);
      setUniqueCities(cities);
    } catch (error) {
      console.error('Error fetching unique cities:', error);
    }
  };

  const fetchUniqueCategories = async () => {
    try {
      const response = await eventService.getAllCategory();
      setUniqueCategories(response.data);
    } catch (error) {
      console.error('Error fetching unique categories:', error);
    }
  };

  const filterEvents = () => {
    const filtered = eventList.filter((event) => {
      const cityMatch = !selectedCity || event.city === selectedCity;
      const categoryMatch = !selectedCategory || event.category === selectedCategory;

      // Check if the selected date falls within the event's start time
      const eventStartDate = event.start_time && new Date(event.start_time.split('/').reverse().join('-'));
      const dateMatch =
        !selectedDate ||
        (eventStartDate && eventStartDate.toDateString() === selectedDate.toDateString());

      return cityMatch && categoryMatch && dateMatch;
    });

    setFilteredEvents(filtered);
  };

  const clearFilters = () => {
    setSelectedCity('');
    setSelectedCategory('');
    setSelectedDate(null);
  };

  return (
    <div className="homesection">
      <div className="content">
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            placeholder="Search events"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="search-options">
          <div className='filter-section'>
            <label htmlFor="city">
              <select
                id="city"
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  onCityChange(e.target.value);
                }}
              >
                <option value="">All City</option>
                {uniqueCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="category">
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  onCategoryChange(e.target.value);
                }}
              >
                <option value="">All events</option>
                {uniqueCategories.map((category, index) => (
                  <option key={index} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className='cal'>
            <label htmlFor="date">
              <DatePicker
                id="date"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select a date"
              />
            </label>
            <label>
              <button className="clear-filters-button" onClick={clearFilters}>
                Clear
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
