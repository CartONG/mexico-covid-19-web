import { makeAdministrativeDivisionDailyReport } from '../AdministrativeDivisionDailyReport.fixture';

import {
  AdministrativeDivisionHistoricDataSet,
  toAdministrativeDivisionHistoricDataSet,
  toChartData,
} from '@/primary/administrative-division-historic/AdministrativeDivisionHistoricDataSet';
import { HistoricType } from '@/primary/HistoricType';

describe('AdministrativeDivisionHistoricDataSet', () => {
  it('should set administrative division historic data sets', () => {
    expect(
      toAdministrativeDivisionHistoricDataSet(
        [makeAdministrativeDivisionDailyReport({ teacherAttendance: NaN, maleStudentAbsence: -1, femaleStudentAbsence: 10 })],
        HistoricType.GIVES_CLASSES,
        250
      )
    ).toEqual<AdministrativeDivisionHistoricDataSet>({
      chartData: [
        {
          date: '2020-06-16',
          giveClasses: 47,
          teacherAttendance: 0,
          maleStudentAbsence: 0,
          femaleStudentAbsence: 0,
        },
      ],
      chartOptions: {
        stackedKeys: ['giveClasses'],
        colors: ['#285c4d'],
        name: 'Porcentaje de escuelas',
        legend: [],
        animationDuration: 250,
      },
    });
    expect(toAdministrativeDivisionHistoricDataSet([makeAdministrativeDivisionDailyReport({})], HistoricType.TEACHER_ATTENDANCE)).toEqual<
      AdministrativeDivisionHistoricDataSet
    >({
      chartData: [
        {
          date: '2020-06-16',
          giveClasses: 47,
          teacherAttendance: 88,
          maleStudentAbsence: 23,
          femaleStudentAbsence: 23,
        },
      ],
      chartOptions: {
        stackedKeys: ['teacherAttendance'],
        colors: ['#9d2449'],
        name: 'Tasa de asistencia de docentes',
        legend: [],
        animationDuration: 0,
      },
    });
    expect(toAdministrativeDivisionHistoricDataSet([], HistoricType.STUDENT_ABSENCE)).toEqual<AdministrativeDivisionHistoricDataSet>({
      chartData: [],
      chartOptions: {
        stackedKeys: ['femaleStudentAbsence', 'maleStudentAbsence'],
        colors: ['#9d2449', '#285c4d'],
        name: 'Índice de inasistencia de alumnos',
        legend: [
          { text: 'Niñas', color: '#9d2449' },
          { text: 'Niños', color: '#285c4d' },
        ],
        animationDuration: 0,
      },
    });
  });
});
