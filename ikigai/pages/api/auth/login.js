import connection from '@/database/controllers/utils/connection';
import { createUser } from '../../../.next/database/controllers/user';
import { withIronSession } from 'next-iron-session';
import { signIn, signOut, useSession } from 'next-auth/react';
import sessionInfo from '@/config/session';

export default withIronSession(
  async function handler(req, res) {
    try {
      await connection(); 

      if (req.method !== 'POST') {
        return res.status(404).end();
      }

      switch (req.query.action) {
        case 'createUser':
          return createUserAction(req, res);
        case 'login':
          return loginAction(req, res);
        case 'logout':
          return logoutAction(req, res);
        default:
          return res.status(404).end();
      }
    } catch (error) {
      console.error('Error establishing MongoDB connection:', error);
      return res.status(500).json({ error: 'Failed to connect to MongoDB' });
    }
  },
  sessionInfo
);

async function createUserAction(req, res) {
  try {
    const { username, password } = req.body;
    const newUser = await createUser(username, password);
    res.status(200).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
}

async function loginAction(req, res) {
  const { username, password } = req.body;
  try {
    const nextAuthSession = await signIn('credentials', { username, password });
    res.status(200).json({ message: 'Login successful', nextAuthSession });
  } catch (error) {
    res.status(401).json({ error: 'Failed to login' });
  }
}

async function logoutAction(req, res) {
  try {
    const nextAuthSession = await useSession();
    if (nextAuthSession) {
      await signOut();
      res.status(200).json({ message: 'Logout successful' });
    } else {
      res.status(401).json({ error: 'User not logged in' });
    }
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Failed to logout' });
  }
}
