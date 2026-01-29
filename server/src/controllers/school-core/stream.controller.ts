// server/src/controllers/school-core/stream.controller.ts
import { handleAsync } from "../../utils/handleAsync";
import { AppError } from "../../utils/AppError";
import { normalizeId } from "../../utils";
import { StreamRepository } from "../../repositories";

// import redisClient from "../redisClient"; // Uncomment if using Redis for caching

const streamRepo = new StreamRepository();
export class StreamController {
  // 1. Create new stream
  createStream = handleAsync<{}, any, any>(async (req, res) => {
    const { school, streamName, academicYear } = req.body;

    const newStream = await streamRepo.createStream({
      streamName,
      academicYear,
      school: normalizeId(school),
    });

    res.status(201).json(newStream);
  });

  // 2. Get all streams
  getAllStreams = handleAsync(async (req, res) => {
    // Get page, limit, and search from query
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";

    // Fetch all streams from repo
    let allStreams = await streamRepo.getAllStreams();

    // Filter by search if provided
    if (search) {
      const lowerSearch = search.toLowerCase();
      allStreams = allStreams.filter((stream) =>
        stream.streamName.toLowerCase().includes(lowerSearch),
      );
    }

    const total = allStreams.length;
    const totalPages = Math.ceil(total / limit);

    // Paginate students
    const start = (page - 1) * limit;
    const paginatedStreams = allStreams.slice(start, start + limit);

    // Return paginated response
    res.json({ data: paginatedStreams, search, page, totalPages, total });
  });

  // 3. Get all streams belonging to a specific school
  getStreamsBySchool = handleAsync<{ schoolId: string }>(async (req, res) => {
    const { schoolId } = req.params;
    const streams = await streamRepo.findBySchool(schoolId);

    if (!streams || streams.length === 0) {
      throw new AppError("No streams found for this school", 404);
    }

    res.status(200).json({ success: true, streams });
  });

  // 4. Get a specific stream using ID
  findStreamById = handleAsync<{ id: string }>(async (req, res) => {
    const stream = await streamRepo.findStreamById(req.params.id);

    if (!stream) {
      throw new AppError("Stream not found", 404);
    }

    res.status(200).json(stream);
  });

  // 5. Update a stream by its ID
  updateStreamById = handleAsync<{ id: string }, any, Partial<any>>(
    async (req, res) => {
      const updatedStream = await streamRepo.updateStreamById(
        req.params.id,
        req.body,
      );

      if (!updatedStream) {
        throw new AppError("Stream not found", 404);
      }

      // Optionally delete Redis cache if enabled
      // await redisClient.del(`stream:${req.params.id}`);

      res.json(updatedStream);
    },
  );

  // 6. Delete a stream by its ID
  deleteStreamById = handleAsync<{ id: string }>(async (req, res) => {
    const deletedStream = await streamRepo.deleteStreamById(req.params.id);

    if (!deletedStream) {
      throw new AppError("Stream not found", 404);
    }

    // Optionally delete Redis cache if enabled
    // await redisClient.del(`stream:${req.params.id}`);

    res.status(204).send();
  });

  // 7. Delete all streams from the database
  deleteAllStreams = handleAsync(async (_req, res) => {
    await streamRepo.deleteAllStreams();
    res.status(204).send();
  });
}
