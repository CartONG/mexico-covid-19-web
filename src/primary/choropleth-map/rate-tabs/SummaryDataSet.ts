import { Summary } from '@/domain/Summary';

interface RateDataSet {
  percentage: string;
  percentageColor: string;
}

export interface SummaryDataSet {
  id: string;
  name: string;
  studentAbsenceRate: RateDataSet;
  teacherAbsenceRate: RateDataSet;
  adminAbsenceRate: RateDataSet;
}

const toPercentage = (rate: number): string => `${(Math.round(rate * 100 * 10) / 10).toString()} %`;
const validNumber = (toValid: number) => !isNaN(toValid);
const validRate = (rate: number) => validNumber(rate) && rate >= 0 && rate <= 1;

const toPercentageColor = (rate: number) => {
  if (rate >= 0 && rate <= 0.25) {
    return 'success';
  }

  if (rate > 0.25 && rate < 0.75) {
    return 'warning';
  }

  if (rate >= 0.75 && rate <= 1) {
    return 'danger';
  }

  return 'unknown';
};

export const toSummaryDataSet = (summary: Summary | undefined): SummaryDataSet =>
  summary
    ? {
        id: summary.id,
        name: summary.name,
        studentAbsenceRate: {
          percentage: validRate(summary.studentAbsenceRate) ? toPercentage(summary.studentAbsenceRate) : '-',
          percentageColor: toPercentageColor(summary.studentAbsenceRate),
        },
        teacherAbsenceRate: {
          percentage: validRate(summary.teacherAbsenceRate) ? toPercentage(summary.teacherAbsenceRate) : '-',
          percentageColor: toPercentageColor(summary.teacherAbsenceRate),
        },
        adminAbsenceRate: {
          percentage: validRate(summary.adminAbsenceRate) ? toPercentage(summary.adminAbsenceRate) : '-',
          percentageColor: toPercentageColor(summary.adminAbsenceRate),
        },
      }
    : {
        id: '-',
        name: '-',
        studentAbsenceRate: { percentage: '-', percentageColor: 'unknown' },
        teacherAbsenceRate: { percentage: '-', percentageColor: 'unknown' },
        adminAbsenceRate: { percentage: '-', percentageColor: 'unknown' },
      };
