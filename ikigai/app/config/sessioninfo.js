export default {
    cookieName: 'cookie_monster',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
    password: process.env.COOKIE_MONSTER_INC
  }