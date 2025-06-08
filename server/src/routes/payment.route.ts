// src/routes/payment.route.ts
import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";

const router = Router();
const paymentController = new PaymentController();

router.post("/", paymentController.createPayment);
router.get("/", paymentController.getAllPayments);
router.get("/:id", paymentController.getPaymentById);
router.put("/:id", paymentController.updatePayment);
router.delete("/:id", paymentController.deletePayment);
router.get("/student/:studentId", paymentController.getPaymentsByStudent);
router.get("/invoice/:invoiceId", paymentController.getPaymentsByInvoice);

export default router;
