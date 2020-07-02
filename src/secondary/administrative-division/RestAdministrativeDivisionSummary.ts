import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';

export interface RestAdministrativeDivisionSummary {
  id: string;
  entidadId: string;
  nombre: string;
  alumnas: number;
  alumnos: number;
  docentes: number;
  admin: number;
}

export const toAdministrativeDivisionSummary = (
  restAdministrativeDivisionSummary: RestAdministrativeDivisionSummary
): AdministrativeDivisionSummary => ({
  id: `${restAdministrativeDivisionSummary.entidadId || ''}${restAdministrativeDivisionSummary.id}`,
  name: restAdministrativeDivisionSummary.nombre,
  stateId: restAdministrativeDivisionSummary.entidadId || '',
  maleStudentAttendance: restAdministrativeDivisionSummary.alumnos,
  femaleStudentAttendance: restAdministrativeDivisionSummary.alumnas,
  teacherAttendance: restAdministrativeDivisionSummary.docentes,
  adminAttendance: restAdministrativeDivisionSummary.admin,
});
