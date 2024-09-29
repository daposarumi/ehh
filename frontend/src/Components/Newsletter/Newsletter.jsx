import React, { useState, useEffect } from 'react';
import './Newsletter.css';
import axios from 'axios';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    console.log(`Email validation for "${email}" result:`, isValid);  // Debugging output
    return isValid;
  };

  const handleSubscribe = async () => {
    // Check if the email is empty
    if (!email) {
      setMessage('Please enter an email address.');
      setShowMessage(true);
      clearMessageAfterDelay();
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.');
      setShowMessage(true);
      clearMessageAfterDelay();
      return;
    }

    try {
      const response = await axios.post('https://panache-backend.onrender.com/api/subscribe', { email });
      setMessage(response.data.message);
      setEmail(''); // Clear the input field
      setShowMessage(true);  // Show success message
    } catch (error) {
      console.error('Subscription error:', error.response ? error.response.data : error.message);
      setMessage('Failed to subscribe. Please try again later.');
      setShowMessage(true);  // Show error message
    }

    clearMessageAfterDelay(); // Clear the message after a few seconds
  };

  // Function to clear the message after a delay
  const clearMessageAfterDelay = () => {
    setTimeout(() => {
      setShowMessage(false);  // Hide the message
    }, 4000); // 4 seconds delay
  };

  // Cleanup timeout if component unmounts during timeout
  useEffect(() => {
    return () => {
      clearTimeout(clearMessageAfterDelay);
    };
  }, []);

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
      {showMessage && <p>{message}</p>}
    </div>
  );
};
