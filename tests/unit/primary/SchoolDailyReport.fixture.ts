import { SchoolDailyReport } from '@/domain/school-daily-report/SchoolDailyReport';

const defaultSchoolDailyReport: SchoolDailyReport = {
  date: '2020-06-16',
  teacherAttendance: 1,
  maleStudentAbsence: 0,
  femaleStudentAbsence: 0,
};

export const makeSchoolDailyReport = (override: Partial<SchoolDailyReport> = {}) => ({
  ...defaultSchoolDailyReport,
  ...override,
});
