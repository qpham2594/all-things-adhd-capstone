import connectMongoDB from "../../database/libs/mongodb";
import { User } from "../../database/models/user";

export default async function handler(req, res) {
  try {

    await connectMongoDB();

    switch (req.method) {
      case "POST":
        const { username, password } = await req.json();

        const existingUser = await User.findOne({ username });
        if (existingUser) {
          res.status(400).json({ error: "Username already exists" });
          return;
        }

      default:
        res.status(403).json({ error: "Invalid method" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



