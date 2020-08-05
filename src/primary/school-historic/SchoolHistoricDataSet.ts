import { SchoolDailyReport } from '@/domain/school-daily-report/SchoolDailyReport';
import { HistoricChartOptions } from '@/primary/HistoricChart';
import { HistoricType } from '@/primary/HistoricType';

export interface SchoolHistoricDataSet {
  chartData: any[];
  chartOptions: HistoricChartOptions;
}

const toPercentage = (value: number) => (isNaN(value) || value < 0 || value > 1 ? 0 : Math.round(value * 100));

export const toChartData = (schoolDailyReport: SchoolDailyReport) => ({
  date: schoolDailyReport.date,
  teacherAttendance: toPercentage(schoolDailyReport.teacherAttendance),
  maleStudentAbsence: toPercentage(schoolDailyReport.maleStudentAbsence),
  femaleStudentAbsence: toPercentage(schoolDailyReport.femaleStudentAbsence),
});

export const toSchoolHistoricDataSet = (
  schoolDailyReports: SchoolDailyReport[],
  historicType: HistoricType,
  animationDuration = 0
): SchoolHistoricDataSet => {
  switch (historicType) {
    case HistoricType.GIVES_CLASSES:
      return {
        chartData: [],
        chartOptions: {
          stackedKeys: [],
          colors: [],
          name: '',
          legend: [],
          animationDuration: animationDuration,
        },
      };
    case HistoricType.STUDENT_ABSENCE:
      return {
        chartData: schoolDailyReports.map(toChartData),
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
        chartData: schoolDailyReports.map(toChartData),
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
