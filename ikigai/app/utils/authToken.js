import jwt from 'jsonwebtoken';


const secretKey = process.env.JWT_SECRET;

export function createToken(user) {
  // Generate a JWT token with user information
  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
    },
    secretKey,
    {
      expiresIn: '1h', // Token expiration time (e.g., 1 hour)
    }
  );

  return token;
}
