import connectMongoDB from "@/lib/mongodb";
import monthlyList from "@/database/models/monthlyList";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user, date, task } = await req.json();
    console.log('Received data:', { user, date, task });
    await connectMongoDB();
    await monthlyList.create({ user, date, task });

    return NextResponse.json({ message: "Task is added" }, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

  
  export async function GET() {
    try {
      await connectMongoDB();
      const tasks = await monthlyList.find();
      return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  
  export async function PUT(req) {
    try {
      const { _id, task } = await req.json();
      await connectMongoDB();
      
      const updatedTask = await monthlyList.findByIdAndUpdate(
        _id,
        { task },
        { new: true }
      );
  
      return NextResponse.json(updatedTask, {message: "Task is updated"}, { status: 200 });
    } catch (error) {
      console.error("Error updating task:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  
  export async function DELETE(req) {
    try {
      const { _id } = await req.json();
      await connectMongoDB();
  
      await monthlyList.findByIdAndDelete(_id);
  
      return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting task:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }