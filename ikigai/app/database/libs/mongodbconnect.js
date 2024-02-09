import connection from "./connection"

const connectMongoDB = async () => {
  try {
    await connection();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('MongoDB connection failed');
  }
};

export default connectMongoDB;