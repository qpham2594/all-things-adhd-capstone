import { connectMongoDB } from "@/lib/mongodb";
import User from "@/database/models/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await connectMongoDB();
    const { username, password } = await req.json();

    // Find the user by username
    const user = await User.findOne({ username });

    // If user not found, return error
    if (!user) {
      return NextResponse.status(401).json({ error: "Invalid username or password" });
    }

    // Compare password with hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match, return error
    if (!passwordMatch) {
      return NextResponse.status(401).json({ error: "Invalid username or password" });
    }

    // Set a cookie for the authenticated user
const cookie = `user_id=${user._id}; Path=/; HttpOnly`;
return NextResponse.json({ message: "Login successful", name: user.name }).setHeader('Set-Cookie', cookie);

  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.status(500).json({ error: "Internal Server Error" });
  }
}