//import  {login}  from '@/app/database/auth';
import { createUser } from '@/app/database/user';
import { withIronSession } from 'next-iron-session';
import connectMongoDB from '@/app/database/libs/mongodbconnect';
import { signIn, signOut, useSession } from 'next-auth/react';
import sessionInfo from '@/app/config/sessioninfo';

export default withIronSession(
  async (req, res) => {
    await connectMongoDB();

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Not able to POST' });
    }

    switch (req.query.action) {
      case 'createUser':
        try {
          const { username, password } = req.body;
          const newUser = await createUser(username, password);
          res.status(200).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
          res.status(500).json({ error: 'Failed to create user' });
          break;
        }

      case 'login':
        try {
          const { username, password } = req.body;
          const authenticatedUser = await login(username, password);
          const nextAuthSession = await signIn('credentials', { username, password });
          res.status(200).json({ message: 'Login successful', user: authenticatedUser, nextAuthSession });
        } catch (error) {
          res.status(401).json({ error: "Failed to login" });
          break;
        }

      case 'logout':
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
          break;
        }

      default:
        res.status(404).json({ error: 'Unable to access any methods.' });
    }
  },
  sessionInfo
);




