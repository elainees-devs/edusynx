// src/controllers/invoice.controller.ts
import { InvoiceRepository } from "../repositories/invoice.repository";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";

const invoiceRepo = new InvoiceRepository();

export const createInvoice = handleAsync(async (req, res) => {
  const newInvoice = await invoiceRepo.createInvoice(req.body);
  res.status(201).json(newInvoice);
});

export const getInvoiceById = handleAsync<{ id: string }>(async (req, res) => {
  const invoice = await invoiceRepo.getInvoiceById(req.params.id);
  if (!invoice) throw new AppError("Invoice not found", 404);
  res.json(invoice);
});

export const updateInvoice = handleAsync(async (req: any, res: any) => {
  const updated = await invoiceRepo.updateInvoice(req.params.id, req.body);
  if (!updated) throw new AppError("Invoice not found", 404);
  res.json(updated);
});


export const deleteInvoice = handleAsync<{ id: string }>(async (req, res) => {
  const deleted = await invoiceRepo.deleteInvoice(req.params.id);
  if (!deleted) throw new AppError("Invoice not found", 404);
  res.status(204).send();
});

export const getAllInvoices = handleAsync(async (req, res) => {
  const invoices = await invoiceRepo.getAllInvoices(req.query);
  res.json(invoices);
});

export const deleteAllInvoices = handleAsync(async (_req, res) => {
  await invoiceRepo.deleteAllInvoices();
  res.status(204).send();
});
