import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';

export interface RestAdministrativeDivisionSummary {
  id: string;
  entidadId: string;
  nombre: string;
  indiceAsistenciaAlumnado: number;
  indiceAsistenciaDocentes: number;
  indiceAsistenciaAdmin: number;
}

export const toAdministrativeDivisionSummary = (
  restAdministrativeDivisionSummary: RestAdministrativeDivisionSummary
): AdministrativeDivisionSummary => ({
  id: `${restAdministrativeDivisionSummary.entidadId || ''}${restAdministrativeDivisionSummary.id}`,
  name: restAdministrativeDivisionSummary.nombre,
  stateId: restAdministrativeDivisionSummary.entidadId || '',
  studentAttendance: restAdministrativeDivisionSummary.indiceAsistenciaAlumnado,
  teacherAttendance: restAdministrativeDivisionSummary.indiceAsistenciaDocentes,
  adminAttendance: restAdministrativeDivisionSummary.indiceAsistenciaAdmin,
});
