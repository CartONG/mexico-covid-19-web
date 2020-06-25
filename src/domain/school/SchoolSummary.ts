import { ReportSummary } from '@/domain/ReportSummary';

export interface SchoolSummary {
  id: string;
  name: string;
  level: string;
  studentAbsenceRate: number;
  teacherAbsenceRate: number;
  adminAbsenceRate: number;
  coordinates: [number, number];
}
