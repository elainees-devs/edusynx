// server/src/controllers/stream.controller.ts
import { handleAsync } from "../utils/handleAsync";
import { AppError } from "../utils/AppError";
import StreamRepository from "../repositories/stream.repository";
import { normalizeSchoolId } from "../utils";
// import redisClient from "../redisClient"; // Uncomment if using Redis for caching

/**
 * Controller class for managing Stream resources.
 * Handles HTTP requests and delegates business logic to the StreamRepository.
 */
export class StreamController {
  private streamRepo: StreamRepository;

  constructor() {
    this.streamRepo = new StreamRepository();
  }

  /**
   * Create a new stream
   * 
   */
 createStream = handleAsync<{}, any, any>(async (req, res) => {
  const { school, streamName, academicYear } = req.body;

  const newStream = await this.streamRepo.createStream({
    streamName,
    academicYear,
    school: normalizeSchoolId(school),
  });

  res.status(201).json(newStream);
});

  /**
   * Get all streams belonging to a specific school
   * 
   */
  getStreamsBySchool = handleAsync<{ schoolId: string }>(async (req, res) => {
    const { schoolId } = req.params;
    const streams = await this.streamRepo.findBySchool(schoolId);

    if (!streams || streams.length === 0) {
      throw new AppError("No streams found for this school", 404);
    }

    res.status(200).json({ success: true, streams });
  });

  /**
   * Get all streams
   * 
   */
  getAllStreams = handleAsync(async (_req, res) => {
    const streams = await this.streamRepo.getAllStreams();
    res.json(streams);
  });

  /**
   * Get a stream by its ID
   * 
   */
  findStreamById = handleAsync<{ id: string }>(async (req, res) => {
    const stream = await this.streamRepo.findStreamById(req.params.id);

    if (!stream) {
      throw new AppError("Stream not found", 404);
    }

    res.status(200).json(stream);
  });

  /**
   * Update a stream by its ID
   * 
   */
  updateStreamById = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
    const updatedStream = await this.streamRepo.updateStreamById(req.params.id, req.body);

    if (!updatedStream) {
      throw new AppError("Stream not found", 404);
    }

    // Optionally delete Redis cache if enabled
    // await redisClient.del(`stream:${req.params.id}`);

    res.json(updatedStream);
  });

  /**
   * Delete a stream by its ID
   * 
   */
  deleteStreamById = handleAsync<{ id: string }>(async (req, res) => {
    const deletedStream = await this.streamRepo.deleteStreamById(req.params.id);

    if (!deletedStream) {
      throw new AppError("Stream not found", 404);
    }

    // Optionally delete Redis cache if enabled
    // await redisClient.del(`stream:${req.params.id}`);

    res.status(204).send();
  });

  /**
   * Delete all streams from the database
   * 
   */
  deleteAllStreams = handleAsync(async (_req, res) => {
    await this.streamRepo.deleteAllStreams();
    res.status(204).send();
  });
}
