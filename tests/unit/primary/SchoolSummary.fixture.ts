import { SchoolSummary } from '@/domain/school/SchoolSummary';

const defaultSchoolSummary: SchoolSummary = {
  id: '03DDI0003E4',
  name: 'CENTRO DE ATENCIÓN INFANTIL 3 CARMEN VERDUGO PEDRIN',
  turn: 'Discontinuo',
  locality: 'SAN JOSÉ DEL CABO',
  studentAttendance: 0.62,
  teacherAttendance: 1,
  adminAttendance: 1,
  maleStudentAbsence: 0.14,
  femaleStudentAbsence: 0.24,
  coordinates: [-109.696335, 23.054972],
};

export const makeSchoolSummary = (override: Partial<SchoolSummary> = {}) => ({
  ...defaultSchoolSummary,
  ...override,
});
