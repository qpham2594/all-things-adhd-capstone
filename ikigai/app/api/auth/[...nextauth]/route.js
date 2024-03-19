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
        const { username, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ username });

          if (!user) {
            return null; // User not found
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null; // Incorrect password
          }

          return user; // Return user data for successful authentication
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
      if (user) {
        session.user = { id: user.id }; // Set user ID in session
      }
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