// server/src/controllers/stream.controller.ts
import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { AppError } from "../../utils/AppError";
import { PaginationOptions } from "../../shared/pagination";
import { StreamRepository } from "../../repositories";

const streamRepo = new StreamRepository();

export class StreamController {
  /**
   * Create a new stream
   * POST /streams
   */
  createStream = handleAsync(async (req: Request, res: Response) => {
    const newStream = await streamRepo.createStream(req.body);
    res.status(201).json(newStream);
  });

  /**
   * Get stream by ID
   * GET /streams/:id
   */
  getStreamById = handleAsync<{ id: string }>(async (req, res) => {
    const stream = await streamRepo.getStreamById(req.params.id);
    if (!stream) throw new AppError("Stream not found", 404);
    res.json(stream);
  });

  /**
   * Get paginated streams
   * GET /streams?page=1&limit=10&school=123&streamName=Science
   */
  getStreams = handleAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};
    if (req.query.school) filter.school = String(req.query.school);
    if (req.query.streamName) filter.streamName = String(req.query.streamName);

    const [streams, total] = await Promise.all([
      streamRepo.getStreams(filter, { skip, limit } as PaginationOptions),
      streamRepo.countStreams(filter),
    ]);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: streams,
    });
  });

  /**
   * Get all streams without pagination
   * GET /streams/all
   */
  getAllStreams = handleAsync(async (_req: Request, res: Response) => {
    const streams = await streamRepo.getAllStreams();
    res.json(streams);
  });

  /**
   * Update stream by ID
   * PUT /streams/:id
   */
  updateStream = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
    const updatedStream = await streamRepo.updateStreamById(req.params.id, req.body);
    if (!updatedStream) throw new AppError("Stream not found", 404);
    res.json(updatedStream);
  });

  /**
   * Delete stream by ID
   * DELETE /streams/:id
   */
  deleteStream = handleAsync<{ id: string }>(async (req, res) => {
    const deletedStream = await streamRepo.deleteStreamById(req.params.id);
    if (!deletedStream) throw new AppError("Stream not found", 404);
    res.status(204).send();
  });

  /**
   * Delete all streams
   * DELETE /streams
   */
  deleteAllStreams = handleAsync(async (_req: Request, res: Response) => {
    await streamRepo.deleteAllStreams();
    res.status(204).send();
  });

  
}
