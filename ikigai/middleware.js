
import { NextResponse } from 'next/server';
import { IronSession } from 'next-iron-session';
import sessioninfo from './config/session';

export async function middleware(req) {
  const res = NextResponse.next();
  const session = await IronSession(req, res, sessioninfo);

  const { User } = session;

  if (!User) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

//applies to all routes instead

export const config = {};