import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { School } from '@/domain/school/School';

export interface AbsenceReasonsDetailsDataSet {
  noFacility: number;
  father: number;
  sick: number;
  unknown: number;
}

const validNumber = (toValid: number) => !isNaN(toValid);
const validRate = (rate: number) => validNumber(rate) && rate >= 0 && rate <= 1;

export const mergedReportToAbsenceReasonsDetailsDataSet = (
  entity: AdministrativeDivision | undefined
): AbsenceReasonsDetailsDataSet | undefined => {
  if (entity === undefined) {
    return undefined;
  }

  const reasons = entity.studentAbsenceMainReasons;

  return {
    noFacility: validRate(reasons['1']) ? reasons['1'] : 0,
    father: validRate(reasons['2']) ? reasons['2'] : 0,
    sick: validRate(reasons['3']) ? reasons['3'] : 0,
    unknown: validRate(reasons['4']) ? reasons['4'] : 0,
  };
};

export const toAbsenceReasonsDetailsDataSet = (school: School | undefined): AbsenceReasonsDetailsDataSet | undefined => {
  if (school === undefined) {
    return undefined;
  }

  const reasons = school.studentAbsenceMainReasons;

  return {
    noFacility: validRate(reasons['1']) ? reasons['1'] : 0,
    father: validRate(reasons['2']) ? reasons['2'] : 0,
    sick: validRate(reasons['3']) ? reasons['3'] : 0,
    unknown: validRate(reasons['4']) ? reasons['4'] : 0,
  };
};
