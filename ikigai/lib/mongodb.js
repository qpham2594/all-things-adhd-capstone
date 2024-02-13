import mongoose from "mongoose";

export default async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connecting to MongoDB");
    } catch(error) {
        console.error("Unable to connect to MongoDB:", error.message);
    }
}
