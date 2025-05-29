//src/config/db.ts
import mongoose from 'mongoose';
import logger from '../utils/logger'; 

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    logger.info('Connected to the database successfully');
  } catch (error) {
    logger.error(`Database connection error: ${(error as Error).message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
