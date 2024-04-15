import Header from "@/components/header";
import styles from '@/styles/page.module.css';
import Head from 'next/head';


export default function Home() {
  return (
    <main className={styles.body}>
      <Header />
      <Head>
        <title>Ikigai Homepage</title>
        <meta name="description" content="Welcome to Ikigai, an app that can help you with your to-do list in the simplest way." />
        <html lang="en" />
      </Head>
      <div className={styles.pageWrapper}>
        <div className={styles.heroImage}>
          <div className={styles.overlay}>
            <h1>Welcome to Ikigai</h1>
            <p>Sign up or log in to start!</p>
            <div className={styles.buttons}>
            <a href="/createaccount">
                <button>Create Account</button>
              </a>
              <a href="/login">
                <button>Log In</button>
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  );
}
