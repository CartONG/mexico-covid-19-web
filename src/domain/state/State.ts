import { AdministrativeDivisionReport } from '@/domain/AdministrativeDivisionReport';

export interface State {
  id: string;
  name: string;
  studentAbsenceRate: number;
  teacherAbsenceRate: number;
  adminAbsenceRate: number;
  report: AdministrativeDivisionReport;
}
