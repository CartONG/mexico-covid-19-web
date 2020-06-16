import { AdministrativeDivisionReport } from '@/domain/AdministrativeDivisionReport';

export interface Municipality {
  id: string;
  name: string;
  stateId: string;
  studentAbsenceRate: number;
  teacherAbsenceRate: number;
  adminAbsenceRate: number;
  report: AdministrativeDivisionReport;
}
