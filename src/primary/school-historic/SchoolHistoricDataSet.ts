import { SchoolDailyReport } from '@/domain/school-daily-report/SchoolDailyReport';
import { HistoricType } from '@/primary/HistoricType';

export interface SchoolHistoricDataSet {
  chartData: any[];
  chartStackedColumns: string[];
  chartName: string;
}

const toPercentage = (value: number) => (isNaN(value) || value < 0 || value > 1 ? 0 : Math.round(value * 100));

export const toChartData = (schoolDailyReport: SchoolDailyReport) => ({
  date: schoolDailyReport.date,
  teacherAttendance: toPercentage(schoolDailyReport.teacherAttendance),
  maleStudentAbsence: toPercentage(schoolDailyReport.maleStudentAbsence),
  femaleStudentAbsence: toPercentage(schoolDailyReport.femaleStudentAbsence),
});

export const toSchoolHistoricDataSet = (schoolDailyReports: SchoolDailyReport[], historicType: HistoricType): SchoolHistoricDataSet => {
  switch (historicType) {
    case HistoricType.GIVES_CLASSES:
      return {
        chartData: [],
        chartStackedColumns: [],
        chartName: '',
      };
    case HistoricType.STUDENT_ABSENCE:
      return {
        chartData: schoolDailyReports.map(toChartData),
        chartStackedColumns: ['femaleStudentAbsence', 'maleStudentAbsence'],
        chartName: 'test',
      };
    case HistoricType.TEACHER_ATTENDANCE:
      return {
        chartData: schoolDailyReports.map(toChartData),
        chartStackedColumns: ['teacherAttendance'],
        chartName: 'test',
      };
  }
};
