import React, { useEffect, useState } from 'react';
import '../styles/Eventform.css';
import eventService from '../services/eventData';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";


const Eventform = () => {
  const [data, setData] = useState({
    event_name: '',
    start_time: '',
    end_time: '',
    description: '',
    category: '',
    city: '',
    state: '',
    country: '',
    organizer_id: '',
    event_banner: '',
    thumb_picture: '',
  });

  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await eventService.getAllCategory();
        setAvailableCategories(response.data);
        console.log("response.data", response.data)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...data,
      start_time: new Date(data.start_time).toLocaleDateString('en-GB'),
      end_time: new Date(data.end_time).toLocaleDateString('en-GB'),
    };

    eventService.saveEvent(formattedData)
      .then(() => {
        toast.success("Successfully created event"+`${data.event_name}`)
        navigate("/");
      })
      .catch((error) => {
        toast.success("Error:Please try after some time")
        console.error("Error creating event:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
<div className="event-form">
  <div className="form-container">
    <h1>Fill up event details</h1>
    <form onSubmit={handleSubmit} method="POST">
      <div className="form-group">
    
        <input
          type="text"
          id="event_name"
          name="event_name"
          placeholder="Event Name"
          value={data.event_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="start_time">Start Time:</label>
        <input
          type="date"
          id="start_time"
          name="start_time"
          value={data.start_time}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="end_time">End Time:</label>
        <input
          type="date"
          id="end_time"
          name="end_time"
          value={data.end_time}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <div className="flex-container">
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={data.city}
            onChange={handleChange}
            required
            className="input-45"
          />
          <input
            type="text"
            id="state"
            name="state"
            placeholder="State"
            value={data.state}
            onChange={handleChange}
            className="input-25"
          />
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Country"
            value={data.country}
            onChange={handleChange}
            className="input-25"
          />
        </div>
      </div>

      <div className="form-group">
        <select
          id="category"
          name="category"
          value={data.category}
          onChange={handleChange}
          required
          className="select-47"
        >
          <option value="" disabled>Select a category</option>
          {availableCategories.map((categoryObj) => (
            <option key={categoryObj.category} value={categoryObj.category}>
              {categoryObj.category}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          value={data.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="organizer_id">Organizer ID:</label>
        <input
          type="text"
          id="organizer_id"
          name="organizer_id"
          placeholder="Organizer ID (ex: sid_event_name)"
          value={data.organizer_id}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="event_banner">Event Banner Link:</label>
        <input
          type="text"
          id="event_banner"
          name="event_banner"
          placeholder="Event Banner Link"
          value={data.event_banner}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="thumb_picture">Thumb Picture Link:</label>
        <input
          type="text"
          id="thumb_picture"
          name="thumb_picture"
          placeholder="Thumb Picture Link"
          value={data.thumb_picture}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Create Event</button>
    </form>
  </div>
</div>

  );
};

export default Eventform;
