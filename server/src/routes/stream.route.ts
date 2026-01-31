// server/src/routes/stream.route.ts
import { Router } from "express";
import { createStreamSchema, updateStreamSchema } from "../validation/stream.schema";
import { validate } from "../middlewares/validate";
import { StreamController } from "../controllers";

const streamRouter = Router();
const streamController = new StreamController();

/**
 * @swagger
 * /api/v1/streams:
 *   post:
 *     summary: Create a new stream
 *     tags:
 *       - Streams
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StreamCreate'
 *     responses:
 *       201:
 *         description: Stream created successfully
 *       400:
 *         description: Validation error
 */
streamRouter.post('/', validate(createStreamSchema), streamController.createStream);
/**
 * @swagger
 * /api/v1/streams:
 *   get:
 *     summary: Get paginated list of streams
 *     tags: [Streams]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of streams per page
 *     responses:
 *       200:
 *         description: Paginated list of classes
 */
streamRouter.get("/", streamController.getStreams);

/**
 * @swagger
 * /api/v1/streams/all:
 *   get:
 *     summary: Get all streams without pagination
 *     tags: [Streams]
 *     responses:
 *       200:
 *         description: List of all streams
 */
streamRouter.get("/all", streamController.getAllStreams);
/**
 * @swagger
 * /api/v1/streams/{id}:
 *   get:
 *     summary: Get a stream by ID
 *     tags:
 *       - Streams
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stream found
 *       404:
 *         description: Stream not found
 */

streamRouter.get('/:id', streamController.getStreamById);

/**
 * @swagger
 * /api/v1/streams:
 *   get:
 *     summary: Get all streams
 *     tags:
 *       - Streams
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of streams per page
 *       - in: query
 *         name: school
 *         schema:
 *           type: string
 *         description: Filter by school ID
 *       - in: query
 *         name: streamName
 *         schema:
 *           type: string
 *         description: Filter by stream name
 *     responses:
 *       200:
 *         description: List of streams
 */
streamRouter.get('/', streamController.getStreams);

/**
 * @swagger
 * /api/v1/streams/{id}:
 *   patch:
 *     summary: Update a stream by ID
 *     tags:
 *       - Streams
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStream'
 *     responses:
 *       200:
 *         description: Stream updated successfully
 *       404:
 *         description: Stream not found
 */
streamRouter.patch('/:id', validate(updateStreamSchema), streamController.updateStream);

/**
 * @swagger
 * /api/v1/streams/{id}:
 *   delete:
 *     summary: Delete a stream by ID
 *     tags:
 *       - Streams
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Stream deleted successfully
 *       404:
 *         description: Stream not found
 */
streamRouter.delete('/:id', streamController.deleteStream);

/**
 * @swagger
 * /api/v1/streams:
 *   delete:
 *     summary: Delete all streams
 *     tags:
 *       - Streams
 *     responses:
 *       204:
 *         description: All streams deleted successfully
 */
streamRouter.delete('/', streamController.deleteAllStreams);

export { streamRouter };
