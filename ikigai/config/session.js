export default {
    cookieName: "cookie_monster",
    password: process.env.COOKIE_MONSTER_INC,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }



/*
import { withIronSession } from 'next-iron-session';

export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.COOKIE_MONSTER_INC,
    cookieName: 'cookiemonster',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
} */
