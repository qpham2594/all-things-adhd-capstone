/*import { v4 as uuidv4 } from 'uuid'; // Import UUID to get unique identifiers

// Function to generate a unique token based on username
export function generateUniqueToken(username) {
  // Get username and a generated UUID to create a unique token
  const token = `${username}-${uuidv4()}`;

  return token;
}
*/

export default {
  cookieName: "mongo_auth_cookie",
  password: process.env.IRON_PASS,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
}