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
          console.log('Attempting authentication for username:', username);
          const findUser = await User.findOne({ username });

          if (!findUser) {
            console.log('User not found for username:', username);
            return null;
          }

          const comparePassword = await bcrypt.compare(password, findUser.password);

          if (!comparePassword) {
            console.log('Password does not match for username:', username);
            return null;
          }

          console.log('Authentication successful for username:', username);

          return findUser;
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: false,
  },
  callbacks: {
    async session(session, user) {
      session.user = user;
      return session;
    },
  },
  secret: process.env.COOKIE_MONSTER_INC_KEY,
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