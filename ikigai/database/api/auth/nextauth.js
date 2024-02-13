// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      // The name to display on the sign-in form
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        // Implement your custom authentication logic here
        const user = { id: 1, name: 'Example User', email: 'example@example.com' };

        // Check if the provided credentials are valid
        if (user && user.password === credentials.password) {
          // Return the user object if authentication is successful
          return Promise.resolve(user);
        }

        // Return null if authentication fails
        return Promise.resolve(null);
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      // Add additional claims to the token if needed
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, user) {
      // Add the user ID to the session
      session.user.id = user.id;
      return session;
    },
  },
});
