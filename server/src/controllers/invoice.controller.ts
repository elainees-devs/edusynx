// src/controllers/invoice.controller.ts
import { Request, Response, NextFunction } from "express";
import { InvoiceRepository } from "../repositories/invoice.repository";
import { AppError } from "../utils/AppError";

const invoiceRepo = new InvoiceRepository();

export const createInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newInvoice = await invoiceRepo.createInvoice(req.body);
    res.status(201).json(newInvoice);
  } catch (error) {
    next(error);
  }
};

export const getInvoiceById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoice = await invoiceRepo.getInvoiceById(req.params.id);
    if (!invoice) throw new AppError("Invoice not found", 404);
    res.json(invoice);
  } catch (error) {
    next(error);
  }
};

export const updateInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await invoiceRepo.updateInvoice(req.params.id, req.body);
    if (!updated) throw new AppError("Invoice not found", 404);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await invoiceRepo.deleteInvoice(req.params.id);
    if (!deleted) throw new AppError("Invoice not found", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getAllInvoices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoices = await invoiceRepo.getAllInvoices(req.query);
    res.json(invoices);
  } catch (error) {
    next(error);
  }
};

export const deleteAllInvoices = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await invoiceRepo.deleteAllInvoices();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
