// server/src/dto/finance.dto.ts
import { IFee, IFeePaymentSummary, IFinancialReport, IInvoice } from "../types";

// Fee DTO
export type CreateFeeDTO = Omit<IFee, "id" | "_id" | "createdAt" | "updatedAt">;

// Fee Payment DTO
export type CreateFeePaymentDTO = Omit<IFeePaymentSummary, "id" | "_id" | "createdAt" | "updatedAt">;

// Financial Report DTO
export type CreateFinancialReportDTO = Omit<IFinancialReport, "id" | "_id" | "createdAt" | "updatedAt">;

// Invoice DTO
export type CreateInvoiceDTO = Omit<IInvoice, "id" | "_id" | "createdAt" | "updatedAt">;

// Invoice Item DTO
export type CreateInvoiceItemDTO = Omit<IInvoice, "id" | "_id" | "createdAt" | "updatedAt">;
