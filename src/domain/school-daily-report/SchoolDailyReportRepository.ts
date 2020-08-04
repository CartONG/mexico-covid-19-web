import { SchoolDailyReport } from '@/domain/school-daily-report/SchoolDailyReport';

export interface SchoolDailyReportRepository {
  listForSchool: (schoolId: string) => Promise<SchoolDailyReport[]>;
}
