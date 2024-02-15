import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const LogoutOption = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const LogoutHandle = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      {session ? (
        <button onClick={LogoutHandle}>Logout</button>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default LogoutOption;

