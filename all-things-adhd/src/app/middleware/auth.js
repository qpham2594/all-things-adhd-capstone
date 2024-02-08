import { getSession } from 'next-auth/react';

async function authenticated(req, res, next) {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.redirect('/login'); 
    }
    req.session = session;
    next(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default authenticated;
