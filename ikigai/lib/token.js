import jwt from 'jsonwebtoken';

export function createToken(user) {
  const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '30d', // expiration time set here
  });

  return token;
}