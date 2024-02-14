import { signOut, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Header from '@/components/header';

const LogoutOption = ({ session }) => {
  const router = useRouter();

  const LogoutHandle = async () => {
    try {
      await signOut();
      router.replace('/'); 
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <Header/>
      {session ? (
        <button onClick={LogoutHandle}>Logout</button>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export async function getServerSideProps(logout) {
  const session = await getSession(logout);
  return {
    props: { session },
  };
}

export default LogoutOption;
