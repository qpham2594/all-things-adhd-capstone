import connectMongoDB from "../libs/mongodb";
import { NextResponse } from "next/server";
import authenticated from "../middleware/auth"
import {User} from "../pages/models/user"

export default async function POST(req) {
  try {
    await authenticated(req,res);
    
    if (req.method === "POST") {
      await connectMongoDB();

      const { username, password } = await req.json();

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return NextResponse.badRequest("Username already exists");
      }

      await User.create({ username, password });

      return NextResponse.json({ message: "User created successfully" });
    } else {
      return NextResponse.forbidden("Invalid method");
    }
  } catch (error) {
    console.error(error);
    return NextResponse.internalServerError("Internal Server Error");
  }
}


