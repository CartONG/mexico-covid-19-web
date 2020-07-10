import { PercentageDataSet, toPercentageDataSet } from '@/primary/common/PercentageDataSet';
import { RateTypes } from '@/primary/RateTypes';

export interface AttendanceDataSet {
  label: string;
  precededByLabel: string;
  imagePath: string;
  percentage: PercentageDataSet;
}

const labels = {
  [RateTypes.STUDENT]: 'alumnos',
  [RateTypes.TEACHER]: 'docentes',
  [RateTypes.PERSONAL]: 'personal',
};

const precededByLabels = {
  [RateTypes.STUDENT]: 'de',
  [RateTypes.TEACHER]: 'de',
  [RateTypes.PERSONAL]: 'del',
};

const imagePaths = {
  [RateTypes.STUDENT]: '/student.svg',
  [RateTypes.TEACHER]: '/teacher.svg',
  [RateTypes.PERSONAL]: '/manager.svg',
};

export const toAttendanceDataset = (rate: number, type: RateTypes): AttendanceDataSet => ({
  label: labels[type],
  precededByLabel: precededByLabels[type],
  imagePath: imagePaths[type],
  percentage: toPercentageDataSet(rate),
});
