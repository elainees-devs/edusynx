// server/src/roytes/stream.route.ts
import { Router } from "express";
import { createStreamSchema, updateStreamSchema } from "../validation/stream.schema";
import { validate } from "../middlewares/validate";
import { StreamController } from "../controllers";

const streamRouter = Router();
const streamController = new StreamController();

/**
 * @openapi
 * /api/streams:
 *   post:
 *     summary: Create a new stream
 *     tags:
 *       - Streams
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStream'
 *     responses:
 *       201:
 *         description: Stream created successfully
 *       400:
 *         description: Validation error
 */
streamRouter.post('/', validate(createStreamSchema), streamController.createStream);

/**
 * @openapi
 * /api/streams/{id}:
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
streamRouter.get('/:id', streamController.findStreamById);

/**
 * @openapi
 * /api/streams:
 *   get:
 *     summary: Get all streams
 *     tags:
 *       - Streams
 *     responses:
 *       200:
 *         description: List of streams
 */
streamRouter.get('/', streamController.getAllStreams);

/**
 * @openapi
 * /api/streams/{id}:
 *   put:
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
streamRouter.put('/:id', validate(updateStreamSchema), streamController.updateStreamById);

/**
 * @openapi
 * /api/streams/{id}:
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
 *       200:
 *         description: Stream deleted successfully
 *       404:
 *         description: Stream not found
 */
streamRouter.delete('/:id', streamController.deleteStreamById);

/**
 * @openapi
 * /api/streams:
 *   delete:
 *     summary: Delete all streams
 *     tags:
 *       - Streams
 *     responses:
 *       200:
 *         description: All streams deleted successfully
 */
streamRouter.delete('/', streamController.deleteAllStreams);

export { streamRouter };
