// client/src/types/school/AcademicYearTypes.ts
export interface ITermPeriod {
  name: string;
  startDate: string;
  endDate: string;
}

export interface IAcademicYear {
  _id: string;
  school: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  terms: ITermPeriod[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateAcademicYearPayload {
  school: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive?: boolean;
  terms?: ITermPeriod[];
}

export interface UpdateAcademicYearPayload {
  name?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  terms?: ITermPeriod[];
}
