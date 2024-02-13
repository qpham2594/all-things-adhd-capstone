export default {
    cookieName: "cookie_monster",
    password: process.env.COOKIE_MONSTER_INC,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }

