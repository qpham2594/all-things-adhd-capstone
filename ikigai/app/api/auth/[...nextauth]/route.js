import connectMongoDB from '@/lib/mongodb';
import User from '@/database/models/user';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

connectMongoDB();

const authenticationStep = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        console.log('Received credentials:', credentials); // Log the received credentials object
        const { username, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ username });
          console.log('User Found', user)
          

          if (!user) {
            console.log('User not found');
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            console.log('Incorrect password');
            return null;
          }

          console.log('User authenticated:', user);
          return {
            name: user._id, // Add a name property and attached the user id or username to the session, since the session requires name
          };
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: false, // Disable JWT session tokens
    // Configure cookie options
    cookie: {
      httpOnly: true,
      name: 'next-auth.session',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // One week
      secure: process.env.COOKIE_MONSTER_INC === 'production', // Set based on environment variable
    },
  },
  callbacks: {
    async session(session, user) {
      console.log('User object:', user); // Log the user object
      if (user) {
        console.log('Attaching user to session:', user);
         session.user = { id: user.name };
      }
      console.log('Updated session:', session);
      return session;
    },
  },
  secret: process.env.SECRET_KEY,
  pages: {
    signIn: '/login',
    signOut: '/login',
    monthlyList: '/login',
  },
};

const handler = NextAuth(authenticationStep);

export { handler as GET, handler as POST };



/*
Previously, token was mentioned but there was no function to create a token. With this modification, there is a token creation function,
and then is being implemented into the authentication process here, which then gets implemented in the login route via back end. 
*/