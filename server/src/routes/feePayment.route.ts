// src/routes/feePayment.route.ts
import { Router } from "express";
import { FeePaymentController } from "../controllers/feePayment.controller";

const feePaymentRouter = Router();
const feePaymentController = new FeePaymentController();

// Create a new fee payment summary
feePaymentRouter.post("/", feePaymentController.createFeePaymentSummary);

// Get all fee payment summaries
feePaymentRouter.get("/", feePaymentController.getAllFeePaymentSummaries);

// Get a fee payment summary by ID
feePaymentRouter.get("/:id", feePaymentController.getFeePaymentSummaryById);

// Get all fee payment summaries for a student
feePaymentRouter.get("/student/:studentId", feePaymentController.getFeePaymentSummariesByStudent);

// Update a fee payment summary
feePaymentRouter.put("/:id", feePaymentController.updateFeePaymentSummary);

// Delete a fee payment summary
feePaymentRouter.delete("/:id", feePaymentController.deleteFeePaymentSummary);

// Calculate total fees paid by a specific student
feePaymentRouter.get("/totals/student/:studentId", feePaymentController.calculateTotalFeesPaidByStudent);

// Calculate total fees paid by all students
feePaymentRouter.get("/totals", feePaymentController.calculateTotalFeesPaidByAllStudents);

// Add a payment to an existing summary
feePaymentRouter.post("/add-payment", feePaymentController.addPaymentToSummary);

export default feePaymentRouter;
