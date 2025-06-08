// src/routes/payment.route.ts
import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";

const paymentRouter = Router();
const paymentController = new PaymentController();

paymentRouter.post("/", paymentController.createPayment);
paymentRouter.get("/", paymentController.getAllPayments);
paymentRouter.get("/:id", paymentController.getPaymentById);
paymentRouter.put("/:id", paymentController.updatePayment);
paymentRouter.delete("/:id", paymentController.deletePayment);
paymentRouter.get("/student/:studentId", paymentController.getPaymentsByStudent);
paymentRouter.get("/invoice/:invoiceId", paymentController.getPaymentsByInvoice);

export {paymentRouter};
