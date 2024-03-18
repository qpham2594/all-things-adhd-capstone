import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

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
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false, // Prevents auto-redirect after sign in
      });

      if (res.error) {
        setError('Invalid login info');
        return;
      }

      // Redirect to the desired page after successful login
      router.replace('/');
    } catch (error) {
      console.error('Error when logging in:', error);
      setError('Error occurred during log in. Please try again.');
    }

    // Clear input fields after submission
    setUsername('');
    setPassword('');
  };

  return (
    <div>
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
        <button type="submit">Log In</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginForm;

