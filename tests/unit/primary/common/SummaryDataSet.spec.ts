import { makeSchoolSummary } from '../SchoolSummary.fixture';

import { toAttendanceDataset } from '@/primary/common/AttendanceDataSet';
import { SummaryDataSet, toSummaryDataSet } from '@/primary/common/SummaryDataSet';
import { RateTypes } from '@/primary/RateTypes';

describe('SummaryDataSet', () => {
  it('should set summary data set', () => {
    const summary = makeSchoolSummary();
    expect(toSummaryDataSet(summary)).toEqual<SummaryDataSet>({
      id: '03DDI0003E4',
      name: 'CENTRO DE ATENCIÓN INFANTIL 3 CARMEN VERDUGO PEDRIN',
      studentAttendance: toAttendanceDataset(0.62, RateTypes.STUDENT),
      teacherAttendance: toAttendanceDataset(1, RateTypes.TEACHER),
      adminAttendance: toAttendanceDataset(1, RateTypes.PERSONAL),
    });
  });

  it('should set default summary data set', () => {
    expect(toSummaryDataSet(undefined)).toEqual<SummaryDataSet>({
      id: '-',
      name: '-',
      studentAttendance: toAttendanceDataset(-1, RateTypes.STUDENT),
      teacherAttendance: toAttendanceDataset(-1, RateTypes.TEACHER),
      adminAttendance: toAttendanceDataset(-1, RateTypes.PERSONAL),
    });
  });
});
