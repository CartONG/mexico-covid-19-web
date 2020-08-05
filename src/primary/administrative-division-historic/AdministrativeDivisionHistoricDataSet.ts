import { AdministrativeDivisionDailyReport } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReport';
import { HistoricChartOptions } from '@/primary/HistoricChart';
import { HistoricType } from '@/primary/HistoricType';

export interface AdministrativeDivisionHistoricDataSet {
  chartData: any[];
  chartOptions: HistoricChartOptions;
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
  historicType: HistoricType,
  animationDuration = 0
): AdministrativeDivisionHistoricDataSet => {
  switch (historicType) {
    case HistoricType.GIVES_CLASSES:
      return {
        chartData: administrativeDivisionDailyReports.map(toChartData),
        chartOptions: {
          stackedKeys: ['giveClasses'],
          colors: ['#285c4d'],
          name: 'Porcentaje de escuelas',
          legend: [],
          animationDuration: animationDuration,
        },
      };
    case HistoricType.STUDENT_ABSENCE:
      return {
        chartData: administrativeDivisionDailyReports.map(toChartData),
        chartOptions: {
          stackedKeys: ['femaleStudentAbsence', 'maleStudentAbsence'],
          colors: ['#9d2449', '#285c4d'],
          name: 'Índice de inasistencia de alumnos',
          legend: [
            { text: 'Niñas', color: '#9d2449' },
            { text: 'Niños', color: '#285c4d' },
          ],
          animationDuration: animationDuration,
        },
      };
    case HistoricType.TEACHER_ATTENDANCE:
      return {
        chartData: administrativeDivisionDailyReports.map(toChartData),
        chartOptions: {
          stackedKeys: ['teacherAttendance'],
          colors: ['#9d2449'],
          name: 'Tasa de asistencia de docentes',
          legend: [],
          animationDuration: animationDuration,
        },
      };
  }
};
