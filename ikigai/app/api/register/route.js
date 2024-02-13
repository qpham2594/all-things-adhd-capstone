import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import user from "@/database/models/user";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    await connectMongoDB()
    const existingUser = await user.findOne({username})
    if (existingUser) {
      return NextResponse.json({message:"Username already exists."}, {status:400})
    }

    const newUser = new User ({
      username,
      password
    })
    await newUser.save() 

    console.log("Username:", username);
    console.log("Password:", password);

   // return NextResponse.json({ message: "Account is created" }, { status: 201 });
  } catch (error) {
    console.error("Unable to register:", error);
    return NextResponse.json({ message: "Unable to register" }, { status: 500 });
  }
}
