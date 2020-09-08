import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { LocalDate } from '@/domain/date/LocalDate';

export interface AdministrativeDivision {
  id: string;
  name: string;
  lastUpdateDate: LocalDate;
  type: AdministrativeDivisionTypes;
  stateId: string;
  support: { private: number; public: number };
  studentAttendance: number;
  teacherAttendance: number;
  adminAttendance: number;
  maleStudentAbsencePercentageOverStudentAbsence: number;
  femaleStudentAbsencePercentageOverStudentAbsence: number;
  schools: number;
  students: number;
  femaleStudents: number;
  maleStudents: number;
  maleStudentPercentage: number;
  femaleStudentPercentage: number;
  teachers: number;
  assistants: number;
  directors: number;
  subDirectors: number;
  technicalPedagogicalAdvisers: number;
  physicalEducationTeachers: number;
  admins: number;
  quartermasters: number;
  others: number;
  schoolGivingClasses: { [key: string]: number };
  schoolGivingClassesPercentages: { [key: string]: number };
  schoolWaterSupply: { [key: string]: number };
  schoolWaterSupplyPercentages: { [key: string]: number };
  schoolWaterServiceContinuity: { [key: string]: number };
  schoolWaterServiceContinuityPercentages: { [key: string]: number };
  schoolWithWaterForHandWashing: { [key: string]: number };
  schoolWithWaterForHandWashingPercentages: { [key: string]: number };
  schoolSinkSufficiency: { [key: string]: number };
  schoolSinkSufficiencyPercentages: { [key: string]: number };
  schoolSoapSufficiency: { [key: string]: number };
  schoolSoapSufficiencyPercentages: { [key: string]: number };
  schoolTowelSufficiency: { [key: string]: number };
  schoolTowelSufficiencyPercentages: { [key: string]: number };
  schoolSanitizerSufficiency: { [key: string]: number };
  schoolSanitizerSufficiencyPercentages: { [key: string]: number };
  schoolBinSufficiency: { [key: string]: number };
  schoolBinSufficiencyPercentages: { [key: string]: number };
  schoolWithSepticSystem: { [key: string]: number };
  schoolWithSepticSystemPercentages: { [key: string]: number };
  schoolWithAbilityToReorganizeSpace: { [key: string]: number };
  schoolWithAbilityToReorganizeSpacePercentages: { [key: string]: number };
  hygieneCommittee: { [key: string]: number };
  hygieneCommitteePercentages: { [key: string]: number };
  alternatesAttendance: { [key: string]: number };
  alternatesAttendancePercentages: { [key: string]: number };
  absentFemaleStudents: number;
  absentMaleStudents: number;
  studentAbsenceMainReasons: { [key: string]: number };
  studentAbsenceMainReasonsPercentages: { [key: string]: number };
  absentTeachers: number;
  teacherAbsenceMainReasons: { [key: string]: number };
  teacherAbsenceMainReasonsPercentages: { [key: string]: number };
  absentAdmins: number;
  adminAbsenceMainReasons: { [key: string]: number };
  adminAbsenceMainReasonsPercentages: { [key: string]: number };
  takenActions: { visits: number; calls: number; scholarship: number; none: number };
  takenActionsPercentages: { visits: number; calls: number; scholarship: number; none: number };
  drinkers: number;
  maleStudentToilets: number;
  femaleStudentToilets: number;
  foodSupportPercentages: { [key: string]: number };
  foodSupportTypePercentages: { dif: number; fullTimeProgram: number; state: number; others: number };
  theSchoolIsOursPercentages: { [key: string]: number };
}
