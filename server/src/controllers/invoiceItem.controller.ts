//src/controllers/invoiceItem.controller.ts
import { InvoiceItemRepository } from "../repositories/invoiceItem.repository";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";

const invoiceItemRepo = new InvoiceItemRepository();

export const createInvoiceItem = handleAsync(async (req, res) => {
  const newItem = await invoiceItemRepo.createInvoiceItem(req.body);
  res.status(201).json(newItem);
});

export const getInvoiceItemById = handleAsync(async (req, res) => {
  const item = await invoiceItemRepo.findInvoiceItemById(req.params.id);
  if (!item) throw new AppError("Invoice item not found", 404);
  res.json(item);
});

export const getAllInvoiceItems = handleAsync(async (_req, res) => {
  const items = await invoiceItemRepo.findAllInvoiceItems();
  res.json(items);
});

export const updateInvoiceItem = handleAsync(async (req, res) => {
  const updated = await invoiceItemRepo.updateInvoiceItemById(req.params.id, req.body);
  if (!updated) throw new AppError("Invoice item not found", 404);
  res.json(updated);
});

export const deleteInvoiceItem = handleAsync(async (req, res) => {
  const deleted = await invoiceItemRepo.deleteInvoiceItemById(req.params.id);
  if (!deleted) throw new AppError("Invoice item not found", 404);
  res.status(204).send();
});

export const deleteAllInvoiceItems = handleAsync(async (_req, res) => {
  await invoiceItemRepo.deleteAllInvoiceItems();
  res.status(204).send();
});
