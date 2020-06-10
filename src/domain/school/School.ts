export interface School {
  id: string;
  name: string;
  locality: string;
  municipalityId: string;
  stateId: string;
  studentAbsenceRate: number;
  teacherAbsenceRate: number;
  adminAbsenceRate: number;
  numberOfStudents: number;
  level: string;
  givesClasses: string;
  studentAbsenceMainReason: string;
  waterSupply: string;
  waterServiceContinuity: string;
  hasWaterForHandWashing: string;
  sinkSufficiency: string;
  soapSufficiency: string;
  towelSufficiency: string;
  sanitizerSufficiency: string;
  binSufficiency: string;
  hasSepticSystem: string;
  hasAbilityToReorganizeSpace: string;
}
