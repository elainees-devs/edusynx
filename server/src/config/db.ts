// src/config/db.ts
import mongoose from 'mongoose';
import logger from '../utils/logger';
import { seedSubscriptionPlans } from '../seed/seedSubscriptionPlans';

const connectDB = async (): Promise<void> => {
  const connectWithRetry = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI as string, {
        serverSelectionTimeoutMS: 15000, // wait up to 15s for MongoDB
        connectTimeoutMS: 20000,         // TCP connection timeout
        family: 4                        // force IPv4
      });
      logger.info('✅ Connected to the database successfully');

      // Seed subscription plans after DB connection
      await seedSubscriptionPlans();
      logger.info('✅ Subscription plans seeded successfully');

    } catch (error) {
      logger.error(
        `❌ Database connection error: ${(error as Error).message}. Retrying in 5s...`
      );
      setTimeout(connectWithRetry, 5000); // retry after 5 seconds
    }
  };

  await connectWithRetry();
};

export default connectDB;
