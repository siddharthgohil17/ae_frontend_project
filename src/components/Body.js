import React, { useEffect, useState } from 'react';
import '../styles/Body.css';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Body = ({ eventList, setFilteredEvents, setSearchQuery }) => {
  const uniqueCities = [...new Set(eventList.map((event) => event.city))];
  const uniqueCategories = [...new Set(eventList.map((event) => event.category))];

  const cityList = uniqueCities.map((city, index) => ({
    id: index + 1,
    name: city,
  }));

  const categoryList = uniqueCategories.map((category, index) => ({
    id: index + 1,
    name: category,
  }));

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    filterEvents();
  }, [selectedCity, selectedCategory, selectedDate, eventList]);

  const filterEvents = () => {
    const filtered = eventList.filter((event) => {
      const cityMatch = !selectedCity || event.city === selectedCity;
      const categoryMatch = !selectedCategory || event.category === selectedCategory;

      const eventDate =
        event.start_time && new Date(event.start_time.split('/').reverse().join('-'));

      const dateMatch =
        !selectedDate || (!eventDate && false) || (eventDate && eventDate >= selectedDate);

      return cityMatch && categoryMatch && dateMatch;
    });

    setFilteredEvents(filtered);
  };

  const clearFilters = () => {
    setSelectedCity('');
    setSelectedCategory('');
    setSelectedDate(null);
  };

  const navigate = useNavigate();

  const handleCityChange = (e) => {
  
    const selectedValue = e.target.value;
    setSelectedCity(selectedValue);
    navigate(`/location?city=${selectedValue}`);
  };

  const handleCategoryChange = (e) => {
   
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    navigate(`/event?category=${selectedValue}`);
  };

  return (
    <div className="homesection">
      <div className="content">
        <h1 className="title" style={{ marginBottom: '0px' }}>
          <span style={{ color: '#21c0e8' }}>Live.</span> Don't Just Exist.
        </h1>
        <p className="sub-title">Discover the Most happening events around you</p>
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            placeholder="Search events"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="search-options">
          <div className="filter-section">
            <label htmlFor="city">
              <select
                id="city"
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value="">All City</option>
                {cityList.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="category">
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All events</option>
                {categoryList.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="cal">
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
