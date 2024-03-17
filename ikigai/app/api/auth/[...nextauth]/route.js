import connectMongoDB from '@/lib/mongodb';
import User from '@/database/models/user';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { createToken } from '@/app/utils/authToken';

connectMongoDB();

export const authenticationStep = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const { username, password } = credentials;

        try {
          console.log('Attempting authentication for username:', username);
          await connectMongoDB();
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
         
          const token = createToken(findUser);

          return {
            id: findUser.id,
            token,
            username: findUser.username,
          }
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id; // Set the user's id in the token
      }
      console.log('JWT Token:', token);
      return token;
    },
    async session(session, token) {
      if (token && token.id) {
        session.user = { id: token.id }; // Set the user's id in the session
      }
      console.log('Session:', session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_KEY,
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