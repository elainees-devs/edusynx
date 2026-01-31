// server/src/repositories/stream.repository.ts
import { Types } from "mongoose";
import { StreamModel } from "../../models";
import { IStream } from "../../types";
import { AppError, normalizeId } from "../../utils";
import { CreateStreamDTO } from "../../dto";
import { PaginationOptions } from "../../shared/pagination";

type StreamFilter = Partial<Pick<IStream, "school" | "streamName">>;

export class StreamRepository {
  /**
   * Helper to create a base query with school populated
   */
  private baseQuery(filter: StreamFilter = {}) {
    return StreamModel.find(filter).populate("school", "name");
  }

  /**
   * Create a new stream
   */
  async createStream(streamData: CreateStreamDTO): Promise<IStream> {
    try {
      const processedData = {
        ...streamData,
        school: normalizeId(streamData.school),
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

  /**
   * Get stream by ID
   */
  async getStreamById(streamId: string): Promise<IStream | null> {
    try {
      return await StreamModel.findById(new Types.ObjectId(streamId)).populate(
        "school",
        "name"
      );
    } catch (error) {
      throw new AppError(
        `Failed to get stream with id ${streamId}: ${(error as Error).message}`,
        500
      );
    }
  }

  /**
   * Get streams with optional filter and pagination
   */
  async getStreams(
    filter: StreamFilter = {},
    options?: PaginationOptions
  ): Promise<IStream[]> {
    const { skip = 0, limit = 10 } = options || {};
    let query = this.baseQuery(filter).skip(skip);
    if (limit > 0) query = query.limit(limit);
    return await query.exec();
  }

  /**
   * Get all streams without pagination
   */
  async getAllStreams(): Promise<IStream[]> {
    return await this.baseQuery().exec();
  }

  /**
   * Count total number of streams (optionally by filter)
   */
  async countStreams(filter: StreamFilter = {}): Promise<number> {
    return await StreamModel.countDocuments(filter).exec();
  }

  /**
   * Update stream by ID
   */
  async updateStreamById(
    streamId: string,
    updates: Partial<CreateStreamDTO>
  ): Promise<IStream | null> {
    try {
      if (updates.school) {
        updates.school = normalizeId(updates.school);
      }
      return await StreamModel.findByIdAndUpdate(
        new Types.ObjectId(streamId),
        updates,
        { new: true }
      )
        .populate("school", "name")
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to update stream ${streamId}: ${(error as Error).message}`,
        500
      );
    }
  }

  /**
   * Delete stream by ID
   */
  async deleteStreamById(streamId: string): Promise<IStream | null> {
    try {
      return await StreamModel.findByIdAndDelete(
        new Types.ObjectId(streamId)
      )
        .populate("school", "name")
        .exec();
    } catch (error) {
      throw new AppError(
        `Failed to delete stream ${streamId}: ${(error as Error).message}`,
        500
      );
    }
  }

  /**
   * Delete all streams
   */
  async deleteAllStreams(): Promise<{ deletedCount?: number }> {
    try {
      return await StreamModel.deleteMany({}).exec();
    } catch (error) {
      throw new AppError(
        `Failed to delete all streams: ${(error as Error).message}`,
        500
      );
    }
  }
}
