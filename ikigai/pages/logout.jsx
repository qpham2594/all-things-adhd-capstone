import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const LogoutPage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
    alert('You have been logged out.');
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutPage;


