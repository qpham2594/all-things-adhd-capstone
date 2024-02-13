import connectMongoDB from "@/lib/mongodb";
import { User } from "../../../database/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authenticationStep = {
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {},
  
        async authorize(credentials) {
          const { username, password } = credentials;
  
          try {
            await connectMongoDB();
            const user = await User.findOne({ username });
  
            if (!user) {
              return null;
            }
  
            const comparePassword = await bcrypt.compare(password, user.password);
  
            if (!comparePassword) {
              return null;
            }
  
            return user;
          } catch (error) {
            console.log("Error: ", error);
          }
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/",
    },
  };
  
  const handler = NextAuth(authenticationStep);
  
  export { handler as GET, handler as POST };