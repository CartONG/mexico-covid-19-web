import { Country } from '@/domain/country/Country';
import { Municipality } from '@/domain/municipality/Municipality';
import { School } from '@/domain/school/School';
import { State } from '@/domain/state/State';

export interface AbsenceReasonsDetailsDataSet {
  noFacility: number;
  father: number;
  sick: number;
  unknown: number;
}

const validNumber = (toValid: number) => !isNaN(toValid);
const validRate = (rate: number) => validNumber(rate) && rate >= 0 && rate <= 1;

export const mergedReportToAbsenceReasonsDetailsDataSet = (
  entity: Country | State | Municipality | undefined
): AbsenceReasonsDetailsDataSet | undefined => {
  if (entity === undefined) {
    return undefined;
  }

  const reasons = entity.report.studentAbsenceMainReasonPercentages;

  return {
    noFacility: validRate(reasons['1']) ? reasons['1'] : 0,
    father: validRate(reasons['2']) ? reasons['2'] : 0,
    sick: validRate(reasons['3']) ? reasons['3'] : 0,
    unknown: validRate(reasons['4']) ? reasons['4'] : 0,
  };
};

export const toAbsenceReasonsDetailsDataSet = (school: School | undefined): AbsenceReasonsDetailsDataSet | undefined => {
  if (school === undefined || school.studentAbsenceMainReason <= 0 || school.studentAbsenceMainReason > 4) {
    return undefined;
  }

  return {
    noFacility: school.studentAbsenceMainReason === 1 ? 1 : 0,
    father: school.studentAbsenceMainReason === 2 ? 1 : 0,
    sick: school.studentAbsenceMainReason === 3 ? 1 : 0,
    unknown: school.studentAbsenceMainReason === 4 ? 1 : 0,
  };
};
