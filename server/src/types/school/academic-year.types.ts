import { Types } from "mongoose";
import { BaseDocument } from "../common/base.types";
import { ISchool } from "./school-core.types";

export interface ITermPeriod {
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface IAcademicYear extends BaseDocument {
  school: Types.ObjectId | ISchool;
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  terms: ITermPeriod[];
}
