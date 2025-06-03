// src/controllers/invoiceItem.controller.ts
import { Request, Response, NextFunction } from "express";
import { InvoiceItemRepository } from "../repositories/invoiceItem.repository";
import { AppError } from "../utils/AppError";

const invoiceItemRepo = new InvoiceItemRepository();

export const createInvoiceItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newItem = await invoiceItemRepo.createInvoiceItem(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

export const getInvoiceItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await invoiceItemRepo.findInvoiceItemById(req.params.id);
    if (!item) throw new AppError("Invoice item not found", 404);
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getAllInvoiceItems = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await invoiceItemRepo.findAllInvoiceItems();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const updateInvoiceItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await invoiceItemRepo.updateInvoiceItemById(req.params.id, req.body);
    if (!updated) throw new AppError("Invoice item not found", 404);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteInvoiceItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await invoiceItemRepo.deleteInvoiceItemById(req.params.id);
    if (!deleted) throw new AppError("Invoice item not found", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const deleteAllInvoiceItems = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await invoiceItemRepo.deleteAllInvoiceItems();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
