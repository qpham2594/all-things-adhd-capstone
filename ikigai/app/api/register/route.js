import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/database/models/user";

export const config = {
  api: {
    bodyParser: true,
  },
};

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    await connectMongoDB();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ message: "Username already exists." }, { status: 400 });
    }

    const newUser = new User({
      username,
      password
    });
    await newUser.save();

    console.log("Username:", username);
    console.log("Password:", password);

    return NextResponse.json({ message: "Account is created" }, { status: 201 });
  } catch (error) {
    console.error("Unable to register:", error);
    return NextResponse.json({ message: "Unable to register" }, { status: 500 });
  }
}


