import { getSession, signOut } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    await signOut({ callbackUrl: '/login' });

    res.status(200).json({ message: 'Logout successful' });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
}

