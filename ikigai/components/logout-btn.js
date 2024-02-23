// the component is giving error for use hooks here, not certain if this is on right track

import { signOut, useSession } from 'next-auth/react';

const LogoutButton = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    if (session) {
      try {
        await signOut();
        router.push('/');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    } else {
      console.error('Not authenticated');
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;

