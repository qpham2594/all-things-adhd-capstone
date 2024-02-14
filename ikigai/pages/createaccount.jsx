import { useState } from 'react';
import {useRouter} from 'next/router';
import Header from '@/components/header';

const createAccountForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError('Please fill out both username and password fields.');
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
        router.replace('/login'); 
        console.log('Login JSX: User registration successful');
        setError(''); 
      } else {
        const errorData = await res.json();
        setError(`Create Account JSX: User registration unsuccessful - ${errorData.message}`);
      }

      

    } catch (error) {
      console.log('Error when registering:', error);
      setError('Error occurred during registration. Please try again.');
    }

    console.log('Create Account JSX Submitted:', { username, password });

    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <Header/>
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
        <button type="submit">Create an Account</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default createAccountForm;

