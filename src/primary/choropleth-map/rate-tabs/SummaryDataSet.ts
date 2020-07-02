import { Summary } from '@/domain/Summary';

interface PercentageDataSet {
  text: string;
  color: string;
  value: number;
}

export interface SummaryDataSet {
  id: string;
  name: string;
  studentAbsenceRate: PercentageDataSet;
  teacherAbsenceRate: PercentageDataSet;
  adminAbsenceRate: PercentageDataSet;
}

const toPercentage = (rate: number): string => `${(Math.round(rate * 100 * 10) / 10).toString()} %`;
const validNumber = (toValid: number) => !isNaN(toValid);
const validRate = (rate: number) => validNumber(rate) && rate >= 0 && rate <= 1;

const toPercentageColor = (rate: number) => {
  if (rate >= 0 && rate <= 0.25) {
    return 'danger';
  }

  if (rate > 0.25 && rate < 0.75) {
    return 'warning';
  }

  if (rate >= 0.75 && rate <= 1) {
    return 'success';
  }

  return 'unknown';
};

export const toSummaryDataSet = (summary: Summary | undefined): SummaryDataSet =>
  summary
    ? {
        id: summary.id,
        name: summary.name,
        studentAbsenceRate: {
          text: validRate(summary.maleStudentAttendance) ? toPercentage(summary.maleStudentAttendance) : '-',
          color: toPercentageColor(summary.maleStudentAttendance),
          value: summary.maleStudentAttendance,
        },
        teacherAbsenceRate: {
          text: validRate(summary.teacherAttendance) ? toPercentage(summary.teacherAttendance) : '-',
          color: toPercentageColor(summary.teacherAttendance),
          value: summary.teacherAttendance,
        },
        adminAbsenceRate: {
          text: validRate(summary.adminAttendance) ? toPercentage(summary.adminAttendance) : '-',
          color: toPercentageColor(summary.adminAttendance),
          value: summary.adminAttendance,
        },
      }
    : {
        id: '-',
        name: '-',
        studentAbsenceRate: { text: '-', color: 'unknown', value: -1 },
        teacherAbsenceRate: { text: '-', color: 'unknown', value: -1 },
        adminAbsenceRate: { text: '-', color: 'unknown', value: -1 },
      };
