import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import styles from '@/styles/page.module.css';
import Head from 'next/head';

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
    <div className={styles.formContainer}>
      <Head>
        <title>Log in with Ikigai</title>
        <meta name="description" content="Make sure you sign in with Ikigai so you can work on your to-do list. If not, feel free to use the search recipes feature!" />
      </Head>
      <form onSubmit={handleSubmit} className={styles.formBox}>
        <div className={styles.textWrapper}>
          <label htmlFor="username" className={styles.formText}>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className={styles.inputBox}
          />
        </div>
        <div className={styles.textWrapper}>
          <label htmlFor="password" className={styles.formText}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.inputBox}
          />
        </div>
        <button type="submit" className={styles.loginButton}>Log In</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginForm;

