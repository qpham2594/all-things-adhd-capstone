import { NextResponse } from 'next/server';
import {connectMongoDB} from '@/lib/mongodb'
import {User} from '@/database/models/user'
import { compare } from 'bcrypt';

export const config = {
  api: {
    bodyParser: true,
  },
};

export async function GET(req) {
  try {
    const { username, password } = await req.json();
    await connectMongoDB()

    

    // Validate username and password (you might use a database query here)

    // If login is successful, you can return some response
    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error('Unable to log in:', error);
    return NextResponse.json({ message: 'Unable to log in' }, { status: 500 });
  }
}
