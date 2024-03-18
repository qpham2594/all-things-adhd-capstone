/*import { getSession } from 'next-auth/react';
import connectMongoDB from '@/lib/mongodb';
import User from '@/database/models/user';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    await connectMongoDB();
    req.session.destroy();

    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

*/

