// src/controllers/invoiceItem.controller.ts
import { InvoiceItemRepository } from "../repositories/invoiceItem.repository";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";

const invoiceItemRepo = new InvoiceItemRepository();

export class InvoiceItemController {
  createInvoiceItem = handleAsync(async (req, res) => {
    const newItem = await invoiceItemRepo.createInvoiceItem(req.body);
    res.status(201).json(newItem);
  });

  getInvoiceItemById = handleAsync(async (req, res) => {
    const item = await invoiceItemRepo.findInvoiceItemById(req.params.id);
    if (!item) throw new AppError("Invoice item not found", 404);
    res.json(item);
  });

  getAllInvoiceItems = handleAsync(async (_req, res) => {
    const items = await invoiceItemRepo.findAllInvoiceItems();
    res.json(items);
  });

  updateInvoiceItem = handleAsync(async (req, res) => {
    const updated = await invoiceItemRepo.updateInvoiceItemById(req.params.id, req.body);
    if (!updated) throw new AppError("Invoice item not found", 404);
    res.json(updated);
  });

  deleteInvoiceItem = handleAsync(async (req, res) => {
    const deleted = await invoiceItemRepo.deleteInvoiceItemById(req.params.id);
    if (!deleted) throw new AppError("Invoice item not found", 404);
    res.status(204).send();
  });

  deleteAllInvoiceItems = handleAsync(async (_req, res) => {
    await invoiceItemRepo.deleteAllInvoiceItems();
    res.status(204).send();
  });
}
