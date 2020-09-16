import { AdministrativeDivisionDailyReport } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReport';

const defaultAdministrativeDivisionDailyReport: AdministrativeDivisionDailyReport = {
  date: '2020-06-16',
  giveClasses: 0.47,
  teacherAttendance: 0.88,
  maleStudentAbsence: 0.23,
  femaleStudentAbsence: 0.23,
};

export const makeAdministrativeDivisionDailyReport = (override: Partial<AdministrativeDivisionDailyReport> = {}) => ({
  ...defaultAdministrativeDivisionDailyReport,
  ...override,
});
