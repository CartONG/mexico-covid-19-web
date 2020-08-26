import { LocalDate } from '@/domain/date/LocalDate';

export interface School {
  id: string;
  locality: string;
  municipalityId: string;
  stateId: string;
  name: string;
  lastUpdateDate: LocalDate;
  studentAttendance: number;
  maleStudentAbsencePercentageOverStudentAbsence: number;
  femaleStudentAbsencePercentageOverStudentAbsence: number;
  teacherAttendance: number;
  adminAttendance: number;
  level: string;
  workCenterKey: string;
  turn: string;
  givesClasses: number;
  modality: string;
  municipality: string;
  localityId: string;
  address: string;
  buildingId: string;
  support: string;
  femaleStudent: number;
  maleStudent: number;
  maleStudentPercentage: number;
  femaleStudentPercentage: number;
  students: number;
  teachers: number;
  assistants: number;
  directors: number;
  subDirectors: number;
  technicalPedagogicalAdvisers: number;
  physicalEducationTeachers: number;
  admins: number;
  quartermasters: number;
  others: number;
  waterSupply: number;
  waterServiceContinuity: number;
  waterForHandWashing: number;
  sinkSufficiency: number;
  soapSufficiency: number;
  towelSufficiency: number;
  sanitizerSufficiency: number;
  binSufficiency: number;
  hasSepticSystem: number;
  hasAbilityToReorganizeSpace: number;
  hasHygieneCommittee: number;
  alternatesAttendance: number;
  absentFemaleStudents: number;
  absentMaleStudents: number;
  studentAbsenceMainReasons: { [key: string]: number };
  studentAbsenceMainReasonsPercentages: { [key: string]: number };
  studentAbsenceOtherReason: string;
  absentTeachers: number;
  teacherAbsenceMainReasons: { [key: string]: number };
  teacherAbsenceMainReasonsPercentages: { [key: string]: number };
  teacherAbsenceOtherReason: string;
  absentAdmins: number;
  adminAbsenceMainReasons: { [key: string]: number };
  adminAbsenceMainReasonsPercentages: { [key: string]: number };
  adminAbsenceOtherReason: string;
  comments: string;
  maleStudentAbsenceProportion: number;
  femaleStudentAbsenceProportion: number;
  expectedStudents: number;
  takenActions: { visits: boolean; calls: boolean; scholarship: boolean; none: boolean };
  drinkers: number;
  maleStudentToilets: number;
  femaleStudentToilets: number;
  foodSupport: boolean;
  foodSupportType: { dif: boolean; fullTimeProgram: boolean; state: boolean; others: boolean };
  foodSupportComment: string;
  theSchoolIsOurs: number;
}
