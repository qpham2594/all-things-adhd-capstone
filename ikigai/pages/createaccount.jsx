import { useState } from 'react';
import {useRouter} from 'next/router';
import styles from '@/styles/page.module.css';

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
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.formBox}>
        <div>
          <label htmlFor="username" className={styles.formText}>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className={styles.inputBox}
          />
        </div>
        <div>
          <label htmlFor="password" className={styles.formText}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.inputBox}
          />
        </div>
        <button type="submit" className={styles.createAccountButton}>Create an Account</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default createAccountForm;

