import { accountLogin } from '@/app/database/auth';
import { createUser } from '@/app/database/user';
import { withIronSession } from 'next-iron-session';
import { signIn, signOut, useSession } from 'next-auth/react'; // Import next-auth functions
import connectMongoDB from '@/app/database/libs/mongodbconnect';;
import sessioninfo from '@/app/config/sessioninfo';

export default withIronSession(
  async (req, res) => {
    await connectMongoDB();

    if (req.method === 'POST') {
      const { username, password } = req.body;
      try {
        const newUser = await createUser(username, password);
        res.status(201).json({ message: 'User created successfully', user: newUser });
      } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
      }
    } else if (req.method === 'GET') {
      const { username, password } = req.query;
      try {
        const user = await accountLogin(username, password);
        const session = await signIn('credentials', { username, password }); 
        res.status(200).json({ message: 'Login successful', user, session });
      } catch (error) {
        res.status(401).json({ error: "Can't login"});
      }
    } else if (req.method === 'DELETE') {
      try {
        const session = await useSession();
        if (session) {
          await signOut(); 
          res.status(200).json({ message: 'Logout successful' });
        } else {
          res.status(401).json({ error: 'User not logged in' });
        }
      } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Failed to logout' });
      }
    } else {
      res.status(405).json({ error: 'Delete Method not working' });
    }
  },
  sessioninfo
);

