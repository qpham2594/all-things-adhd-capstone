import connectMongoDB from "../libs/mongodb";
import {User} from "../pages/models";
import { NextResponse } from "next/server";

export default async function postHandler(req) {
  try {
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


