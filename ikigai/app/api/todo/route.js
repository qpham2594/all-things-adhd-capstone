import connectMongoDB from "@/lib/mongodb";
import monthlyList from "@/database/models/monthlyList";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { date, task } = await req.json();
    console.log('Received data:', { date, task });
    await connectMongoDB();
    await monthlyList.create({ date, task });

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
      const { id, task } = await req.json(); 
      await connectMongoDB();
  
      const updatedTask = await monthlyList.findByIdAndUpdate(
        id,
        { task },
        { new: true }
      );
  
      if (!updatedTask) {
        return NextResponse.status(404).json({ error: "Task not found" });
      }
  
      return NextResponse.json({ message: "Task updated successfully", updatedTask });
    } catch (error) {
      console.error("Error updating task:", error);
      return NextResponse.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  
  export async function DELETE(req) {
    try {
      const { id } = await req.json();
      await connectMongoDB();
  
      const deletedTask = await monthlyList.findByIdAndDelete(id);
  
      if (!deletedTask) {
        return NextResponse.status(404).json({ error: "Task not found" });
      }
  
      return NextResponse.json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      return NextResponse.status(500).json({ error: "Internal Server Error" });
    }
  }
  