//src/config/db.ts
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit process with failure
  }
}
export default connectDB;