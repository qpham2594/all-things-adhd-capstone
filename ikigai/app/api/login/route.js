import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import User from '@/database/models/user';
import { compare } from 'bcrypt';
import { createToken } from '@/app/utils/authToken';


export const config = {
  api: {
    bodyParser: true,
  },
};

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    await connectMongoDB();

    const existingUser = await User.findOne({ username });
    console.log('Existing user:', existingUser);

    if (!existingUser) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    const passwordMatch = await compare(password, existingUser.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    const token = createToken(existingUser);

    return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
  } catch (error) {
    console.error('Unable to log in:', error);
    return NextResponse.json({ message: 'Unable to log in' }, { status: 500 });
  }
}

/*
Previously, sign-in from next/auth was used which only handles the client side. That's why when logging in on the
front-end, it logs the session, but the username comes back as {}. With this modification, a function to create a token
was created in lib/token, so that it can look for the existing username and password, create a token with it. This allows
a successful login on the backend with a token. 
*/