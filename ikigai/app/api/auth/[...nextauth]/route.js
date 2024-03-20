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
            _id: user._id,
            username: user.username,
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
      if (user) {
        console.log('Attaching user to session:', user);
        session.user = user;
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