//src/types/finance/counter.types.ts
import { Types } from "mongoose";
import { BaseDocument } from "../common/base.types";

export interface IInvoiceCounter extends BaseDocument {
  schoolId: Types.ObjectId;
  seq: number;
}
