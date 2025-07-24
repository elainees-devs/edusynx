// server/src/repositories/stream.repository.ts
import mongoose, { Types } from "mongoose";
import { CreateStreamDTO } from "../dto/school-structure.dto";
import { StreamModel } from "../models";
import { IStream } from "../types";
import { AppError, normalizeSchoolId } from "../utils";

class StreamRepository {
  // Add new stream
  async createStream(streamData: CreateStreamDTO): Promise<IStream> {
    try {
      const processedData = {
        ...streamData,
        school: normalizeSchoolId(streamData.school),
      };

      const streamInstance = new StreamModel(processedData);
      return await streamInstance.save();
    } catch (error) {
      throw new AppError(
        `Failed to create stream: ${(error as Error).message}`,
        500
      );
    }
  }

  // Update stream by ID
  async updateStreamById(
    id: string,
    updates: Partial<IStream>
  ): Promise<IStream | null> {
    try {
      if (updates.school) {
        updates.school = normalizeSchoolId(updates.school);
      }

      return await StreamModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        updates,
        { new: true }
      )
        .populate("school", "stream")
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to update stream with id ${id}: ${(error as Error).message}`,
        500
      );
    }
  }

  // Find stream by Id
  async findStreamById(id: string): Promise<IStream | null> {
    try {
      return await StreamModel.findById(new Types.ObjectId(id))
        .populate("school", "stream")
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to find user with id ${id}: ${(error as Error).message}`,
        500
      );
    }
  }

  // Delete stream by ID
  async deleteStreamById(id: string):Promise<IStream | null> {
    try{
      return await StreamModel.findByIdAndDelete(new Types.ObjectId(id)).exec()
    }catch (error) {
      throw new AppError(
        `Failed to delete user with id ${id}: ${(error as Error).message}`,
        500
      );
    }
  }
  
  // Find all streams
  async getAllStreams(): Promise<IStream[]> {
    try {
      return await StreamModel.find().populate("school", "stream").exec();
    } catch (error) {
      throw new AppError(
        `Failed to find all users: ${(error as Error).message}`,
        500
      );
    }
  }

// Delete all streams
async deleteAllStreams(): Promise<void> {
  try{
    await StreamModel.deleteMany({}).exec()
  }catch(error){
     throw new AppError(
        `Failed to delete all users: ${(error as Error).message}`,
        500
      );
    }
  }
}

export default StreamRepository;
