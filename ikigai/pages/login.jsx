
import { useRouter } from 'next/router'
 
import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!username || !password) {
      alert('Please fill out both username and password fields.');
      return;
    }
  
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (res.ok) {
        const form = event.target;
        form.reset();
        console.log('User registration successful');
      } else {
        console.log('User registration unsuccessful');
      }
    } catch (error) {
      console.log('Error when registering:', error);
    }
    console.log('Submitted:', { username, password });
  
    // Reset the form fields
    setUsername('');
    setPassword('');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
