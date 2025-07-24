// server/src/controllers/stream.controller.ts
import mongoose from "mongoose";
import { handleAsync } from "../utils/handleAsync";
import { AppError } from "../utils/AppError";
import StreamRepository from "../repositories/stream.repository";
// import redisClient from "../redisClient"; // Uncomment if using Redis

export class StreamController {
  private streamRepo: StreamRepository;

  constructor() {
    this.streamRepo = new StreamRepository();
  }

  createStream = handleAsync<{}, any, any>(async (req, res) => {
    const { school, streamName } = req.body;

    const newStream = await this.streamRepo.createStream({
      streamName,
      school: typeof school === "string" ? new mongoose.Types.ObjectId(school) : school,
    });

    res.status(201).json(newStream);
  });

  getAllStreams = handleAsync(async (_req, res) => {
    const streams = await this.streamRepo.getAllStreams();
    res.json(streams);
  });

  findStreamById = handleAsync<{ id: string }>(async (req, res) => {
    const stream = await this.streamRepo.findStreamById(req.params.id);

    if (!stream) {
      throw new AppError("Stream not found", 404);
    }

    res.status(200).json(stream);
  });

  updateStreamById = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
    const updatedStream = await this.streamRepo.updateStreamById(req.params.id, req.body);

    if (!updatedStream) {
      throw new AppError("Stream not found", 404);
    }

    // await redisClient.del(`stream:${req.params.id}`);
    res.json(updatedStream);
  });

  deleteStreamById = handleAsync<{ id: string }>(async (req, res) => {
    const deletedStream = await this.streamRepo.deleteStreamById(req.params.id);

    if (!deletedStream) {
      throw new AppError("Stream not found", 404);
    }

    // await redisClient.del(`stream:${req.params.id}`);
    res.status(204).send();
  });

  deleteAllStreams = handleAsync(async (_req, res) => {
    await this.streamRepo.deleteAllStreams();
    res.status(204).send();
  });
}
