"use client"

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Header from '@/components/header';

const LogoutOption = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
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
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default LogoutOption;