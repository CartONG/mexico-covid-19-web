export interface School {
  id: string;
  locality: string;
  municipalityId: string;
  stateId: string;
  name: string;
  femaleStudentAttendance: number;
  maleStudentAttendance: number;
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
  students: number;
  teachers: number;
  assistants: number;
  director: number;
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
  studentAbsenceOtherReason: string;
  absentTeachers: number;
  teacherAbsenceMainReasons: { [key: string]: number };
  teacherAbsenceOtherReason: string;
  absentAdmins: number;
  adminAbsenceMainReasons: { [key: string]: number };
  adminAbsenceOtherReason: string;
  comments: string;
}
