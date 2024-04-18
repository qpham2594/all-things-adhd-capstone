"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '@/styles/header.module.css';
import Head from 'next/head';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const closeMenuOnClickOutside = (event) => {
      if (menuOpen && !event.target.closest(`.${styles.header}`)) {
        setMenuOpen(false);
      }
    };

    document.body.addEventListener('click', closeMenuOnClickOutside);

    return () => {
      document.body.removeEventListener('click', closeMenuOnClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <img src='/favicontransparent.png' alt="Logo" />
        </Link>
      </div>
      <nav className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        <Link href="/createaccount">Create An Account</Link>
        <Link href="/login">Login</Link>
        <Link href="/monthlylist">Create Your List</Link>
        <Link href="/recipes">Search for Recipes</Link>
        <Link href="/logout">Logout</Link>
      </nav>
      <div className={`${styles.hamburgermenu} ${menuOpen ? styles.open : ''}`} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </header>
  );
}

