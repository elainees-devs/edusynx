//src/types/finance/counter.types.ts
import { Types } from "mongoose";
import { BaseDocument } from "../common/base.types";
import { ISchool } from "../school/school-core.types";


export interface IInvoiceCounter extends BaseDocument {
  school: Types.ObjectId | ISchool;
  seq: number;
}
