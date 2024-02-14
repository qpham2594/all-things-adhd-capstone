import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import User from '@/database/models/user';
import { compare } from 'bcrypt';
import { signIn } from 'next-auth/react';

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

    if (!existingUser) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    const passwordMatch = await compare(password, existingUser.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    await signIn('credentials', {
      username: existingUser.username,
      password: existingUser.password, 
      redirect: false, 
    });

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error('Unable to log in:', error);
    return NextResponse.json({ message: 'Unable to log in' }, { status: 500 });
  }
}
