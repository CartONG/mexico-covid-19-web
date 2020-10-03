import { AttendanceDataSet, toAttendanceDataset } from '@/primary/common/AttendanceDataSet';
import { toPercentageDataSet } from '@/primary/common/PercentageDataSet';
import { RateTypes } from '@/primary/RateTypes';

describe('AttendanceDataSet', () => {
  it('should set attendance data set', () => {
    expect(toAttendanceDataset(-1, RateTypes.STUDENT)).toEqual<AttendanceDataSet>({
      label: 'alumnos',
      precededByLabel: 'de',
      imagePath: '/student.svg',
      percentage: toPercentageDataSet(-1),
    });
    expect(toAttendanceDataset(-1, RateTypes.PERSONAL)).toEqual<AttendanceDataSet>({
      label: 'personal',
      precededByLabel: 'del',
      imagePath: '/manager.svg',
      percentage: toPercentageDataSet(-1),
    });
    expect(toAttendanceDataset(-1, RateTypes.TEACHER)).toEqual<AttendanceDataSet>({
      label: 'docentes',
      precededByLabel: 'de',
      imagePath: '/teacher.svg',
      percentage: toPercentageDataSet(-1),
    });
  });
});
