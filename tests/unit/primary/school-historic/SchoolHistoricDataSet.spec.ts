import { makeSchoolDailyReport } from '../SchoolDailyReport.fixture';

import { HistoricType } from '@/primary/HistoricType';
import { SchoolHistoricDataSet, toSchoolHistoricDataSet } from '@/primary/school-historic/SchoolHistoricDataSet';

describe('SchoolHistoricDataSet', () => {
  it('should be a school historic data set', () => {
    const reports = [makeSchoolDailyReport({ teacherAttendance: NaN, maleStudentAbsence: 0.5, femaleStudentAbsence: 0.9 })];
    expect(toSchoolHistoricDataSet(reports, HistoricType.STUDENT_ABSENCE)).toEqual<SchoolHistoricDataSet>({
      chartData: [
        {
          date: '2020-06-16',
          teacherAttendance: 0,
          maleStudentAbsence: 50,
          femaleStudentAbsence: 90,
        },
      ],
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
