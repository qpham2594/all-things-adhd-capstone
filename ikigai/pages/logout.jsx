import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Logout = () => {
  const router = useRouter();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = async () => {
    const session = await getSession();

    if (session) {
      try {
        const response = await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        
        if (response.ok) {
          await router.push('/');
          setIsLoggedOut(true);
          console.log('Logout successful');
        } else {
          console.error('Logout failed:', await response.json());
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    } else {
      console.error('Not authenticated');
    }
  };

  return (
    <div>
      {isLoggedOut ? (
        <p>You are logged out.</p>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};

export default Logout;

