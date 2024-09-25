
import React, { useState } from 'react';
import './Newsletter.css';
import axios from 'axios';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // For demo purposes, assume "isAdmin" determines if the user is an admin
  // Set to false for regular users

  const handleSubscribe = async () => {
    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('https://panache-backend.onrender.com/api/subscribe', { email });
      setMessage(response.data.message);
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error.response ? error.response.data : error.message);
      setMessage('Failed to subscribe. Please try again later.');
    }
  };

 

  return (
    <div className='newsletter'>
      <h1>Subscribe and never miss a thing</h1>
      <p>From sales to newsletters and latest happenings in our HQ</p>
      <div className='input-container'>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
      {message && <p>{message}</p>}

    </div>
  );
};
