import { Router } from "express";
import { StaffController } from "../controllers";
import { authenticateUser } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { UserRole } from "../types/enum/enum";
import {
  createStaffSchema,
  updateStaffSchema,
  assignDepartmentSchema,
  assignPositionSchema,
} from "../validation/staff.schema";

const staffRouter = Router();
const staffController = new StaffController();

/**
 * @swagger
 * tags:
 *   name: Staff
 *   description: Staff management
 */

/**
 * @swagger
 * /api/v1/staff:
 *   post:
 *     summary: Create a new staff member
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStaffDTO'
 *     responses:
 *       201:
 *         description: Staff created successfully
 *       400:
 *         description: Validation error
 */
staffRouter.post(
  "/",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL, UserRole.DEPUTY_PRINCIPAL]),
  validate(createStaffSchema),
  staffController.createStaff
);

/**
 * @swagger
 * /api/v1/staff:
 *   get:
 *     summary: Get all staff members (filtered by school)
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paginated staff list
 */
staffRouter.get(
  "/",
  authenticateUser(),
  staffController.getAllStaff
);

/**
 * @swagger
 * /api/v1/staff/count:
 *   get:
 *     summary: Count staff members in a school
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff count
 */
staffRouter.get(
  "/count",
  authenticateUser(),
  staffController.countStaff
);

/**
 * @swagger
 * /api/v1/staff/{id}:
 *   get:
 *     summary: Get a staff member by ID
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff found
 *       404:
 *         description: Staff not found
 */
staffRouter.get(
  "/:id",
  authenticateUser(),
  staffController.getStaffById
);

/**
 * @swagger
 * /api/v1/staff/{id}:
 *   put:
 *     summary: Update a staff member
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/UpdateStaffDTO'
 *     responses:
 *       200:
 *         description: Staff updated
 *       404:
 *         description: Staff not found
 */
staffRouter.put(
  "/:id",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL, UserRole.DEPUTY_PRINCIPAL]),
  validate(updateStaffSchema),
  staffController.updateStaff
);

/**
 * @swagger
 * /api/v1/staff/{id}:
 *   delete:
 *     summary: Delete a staff member
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Staff deleted
 *       404:
 *         description: Staff not found
 */
staffRouter.delete(
  "/:id",
  authenticateUser([UserRole.SCHOOL_ADMIN]),
  staffController.deleteStaff
);

/**
 * @swagger
 * /api/v1/staff/{id}/toggle-active:
 *   patch:
 *     summary: Toggle staff active status
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Status toggled
 */
staffRouter.patch(
  "/:id/toggle-active",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL, UserRole.DEPUTY_PRINCIPAL]),
  staffController.toggleActive
);

/**
 * @swagger
 * /api/v1/staff/{id}/department:
 *   patch:
 *     summary: Assign staff to a department
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/AssignDepartmentDTO'
 *     responses:
 *       200:
 *         description: Department assigned
 */
staffRouter.patch(
  "/:id/department",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL, UserRole.DEPUTY_PRINCIPAL]),
  validate(assignDepartmentSchema),
  staffController.assignDepartment
);

/**
 * @swagger
 * /api/v1/staff/{id}/position:
 *   patch:
 *     summary: Assign position to a staff member
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/AssignPositionDTO'
 *     responses:
 *       200:
 *         description: Position assigned
 */
staffRouter.patch(
  "/:id/position",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL, UserRole.DEPUTY_PRINCIPAL]),
  validate(assignPositionSchema),
  staffController.assignPosition
);

export { staffRouter };
