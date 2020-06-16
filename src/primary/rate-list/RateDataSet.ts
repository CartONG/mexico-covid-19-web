import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { StateSummary } from '@/domain/state/StateSummary';
import { RateTypes } from '@/primary/RateTypes';

export interface RateDataSet {
  id: string;
  name: string;
  percentage: string;
  color: string;
}

const toColor = (rate: number) => (rate >= 0 && rate <= 0.25 ? 'success' : rate > 0.25 && rate < 0.75 ? 'warning' : 'danger');
const toPercentage = (rate: number): string => `${(Math.round(rate * 100 * 10) / 10).toString()} %`;
const validNumber = (toValid: number) => !isNaN(toValid);
const validRate = (rate: number) => validNumber(rate) && rate >= 0 && rate <= 1;

const toRate = (entity: StateSummary | MunicipalitySummary | SchoolSummary, rateType: RateTypes) => {
  switch (rateType) {
    case RateTypes.STUDENT_ABSENCE:
      return entity.studentAbsenceRate;
    case RateTypes.TEACHER_ABSENCE:
      return entity.teacherAbsenceRate;
    case RateTypes.PERSONAL_ABSENCE:
      return entity.adminAbsenceRate;
  }
};

export const toRateDataSet = (entity: StateSummary | MunicipalitySummary | SchoolSummary, rateType: RateTypes): RateDataSet => ({
  id: `${entity.id}${rateType}`,
  name: entity.name,
  percentage: validRate(toRate(entity, rateType)) ? toPercentage(toRate(entity, rateType)) : '-',
  color: validRate(toRate(entity, rateType)) ? toColor(toRate(entity, rateType)) : 'unknown',
});
