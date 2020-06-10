export interface Country {
  studentAbsenceRate: number;
  teacherAbsenceRate: number;
  adminAbsenceRate: number;
  totalSchools: number;
  totalStudent: number;
  schoolGivingClassesPercentages: { [key: string]: number };
  studentAbsenceMainReasonPercentages: { [key: string]: number };
  schoolWaterSupplyPercentages: { [key: string]: number };
  schoolWaterServiceContinuityPercentages: { [key: string]: number };
  schoolWithWaterForHandWashingPercentages: { [key: string]: number };
  schoolSinkSufficiencyPercentages: { [key: string]: number };
  schoolSoapSufficiencyPercentages: { [key: string]: number };
  schoolTowelSufficiencyPercentages: { [key: string]: number };
  schoolSanitizerSufficiencyPercentages: { [key: string]: number };
  schoolBinSufficiencyPercentages: { [key: string]: number };
  schoolWithSepticSystemPercentages: { [key: string]: number };
  schoolWithAbilityToReorganizeSpacePercentages: { [key: string]: number };
}
