import { AdministrativeDivisionReport } from '@/domain/AdministrativeDivisionReport';

export interface Country {
  studentAbsenceRate: number;
  teacherAbsenceRate: number;
  adminAbsenceRate: number;
  totalStudent: number;
  report: AdministrativeDivisionReport;
}
