import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '@/styles/page.module.css';

const LogoutPage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
    alert('You have been logged out.');
  };

  return (
    <div className={styles.logoutContainer}>
      <h1 className={styles.h1}>Logout</h1>
      <p className={styles.logoutText}> Make you sure log out! Once you log out, it will notify you that you have logged out. <br></br>
      I hope you were productive today!</p>
      <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
    </div>
  );
};

export default LogoutPage;


