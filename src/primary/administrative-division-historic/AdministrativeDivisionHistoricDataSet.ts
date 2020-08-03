import { AdministrativeDivisionDailyReport } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReport';
import { HistoricType } from '@/primary/HistoricType';

export interface AdministrativeDivisionHistoricDataSet {
  chartData: any[];
  chartStackedColumns: string[];
  chartName: string;
}

const toPercentage = (value: number) => (isNaN(value) || value < 0 || value > 1 ? 0 : Math.round(value * 100));

export const toChartData = (administrativeDivisionDailyReports: AdministrativeDivisionDailyReport) => ({
  date: administrativeDivisionDailyReports.date,
  giveClasses: toPercentage(administrativeDivisionDailyReports.giveClasses),
  teacherAttendance: toPercentage(administrativeDivisionDailyReports.teacherAttendance),
  maleStudentAbsence: toPercentage(administrativeDivisionDailyReports.maleStudentAbsence),
  femaleStudentAbsence: toPercentage(administrativeDivisionDailyReports.femaleStudentAbsence),
});

export const toAdministrativeDivisionHistoricDataSet = (
  administrativeDivisionDailyReports: AdministrativeDivisionDailyReport[],
  historicType: HistoricType
) => {
  switch (historicType) {
    case HistoricType.GIVES_CLASSES:
      return {
        chartData: administrativeDivisionDailyReports.map(toChartData),
        chartStackedColumns: ['giveClasses'],
        chartName: 'test',
      };
    case HistoricType.STUDENT_ABSENCE:
      return {
        chartData: administrativeDivisionDailyReports.map(toChartData),
        chartStackedColumns: ['femaleStudentAbsence', 'maleStudentAbsence'],
        chartName: 'test',
      };
    case HistoricType.TEACHER_ATTENDANCE:
      return {
        chartData: administrativeDivisionDailyReports.map(toChartData),
        chartStackedColumns: ['teacherAttendance'],
        chartName: 'test',
      };
  }
};
