// src/controllers/invoice.controller.ts
import { Request, Response } from "express";
import { InvoiceRepository } from "../repositories/invoice.repository";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";

const invoiceRepo = new InvoiceRepository();

export class InvoiceController {
  createInvoice = handleAsync(async (req: Request, res: Response) => {
    const newInvoice = await invoiceRepo.createInvoice(req.body);
    res.status(201).json(newInvoice);
  });

  getInvoiceById = handleAsync<{ id: string }>(async (req: Request, res: Response) => {
    const invoice = await invoiceRepo.getInvoiceById(req.params.id);
    if (!invoice) throw new AppError("Invoice not found", 404);
    res.json(invoice);
  });

  updateInvoice = handleAsync(async (req: Request, res: Response) => {
    const updated = await invoiceRepo.updateInvoice(req.params.id, req.body);
    if (!updated) throw new AppError("Invoice not found", 404);
    res.json(updated);
  });

  deleteInvoice = handleAsync<{ id: string }>(async (req: Request, res: Response) => {
    const deleted = await invoiceRepo.deleteInvoice(req.params.id);
    if (!deleted) throw new AppError("Invoice not found", 404);
    res.status(204).send();
  });

  getAllInvoices = handleAsync(async (req: Request, res: Response) => {
    const invoices = await invoiceRepo.getAllInvoices(req.query);
    res.json(invoices);
  });

  deleteAllInvoices = handleAsync(async (_req: Request, res: Response) => {
    await invoiceRepo.deleteAllInvoices();
    res.status(204).send();
  });
}
