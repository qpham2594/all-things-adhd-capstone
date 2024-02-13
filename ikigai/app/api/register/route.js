import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    console.log("Username:", username);
    console.log("Password:", password);
    return NextResponse.json({ message: "Account is created" }, { status: 201 });
  } catch (error) {
    console.error("Unable to register:", error);
    return NextResponse.json({ message: "Unable to register" }, { status: 500 });
  }
}
